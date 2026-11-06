import os
import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

from flask import Flask, request, jsonify, render_template, redirect, url_for, session, send_from_directory
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__, static_folder='.', static_url_path='')
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'jbg-secret-key-2026')

ROOT_DIR = Path(__file__).resolve().parent
DATA_DIR = ROOT_DIR / 'data'
DB_PATH = DATA_DIR / 'jbg.db'
DEFAULT_ADMIN_EMAIL = 'abdoulwaha08@gmail.com'
DEFAULT_ADMIN_PASSWORD = os.environ.get('JBG_ADMIN_PASSWORD', 'Admin@2026!')

DATA_DIR.mkdir(exist_ok=True)


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.executescript('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'customer',
            created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            subject TEXT,
            message TEXT NOT NULL,
            created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            user_id INTEGER,
            customer_name TEXT NOT NULL,
            customer_email TEXT NOT NULL,
            customer_phone TEXT NOT NULL,
            customer_address TEXT NOT NULL,
            customer_city TEXT NOT NULL,
            customer_note TEXT,
            payment_method TEXT NOT NULL,
            items_json TEXT NOT NULL,
            subtotal REAL NOT NULL,
            delivery REAL NOT NULL,
            total REAL NOT NULL,
            created_at TEXT NOT NULL
        );
    ''')
    conn.commit()
    conn.close()

    conn = get_db()
    admin = conn.execute('SELECT id FROM users WHERE email = ?', (DEFAULT_ADMIN_EMAIL,)).fetchone()
    if not admin:
        conn.execute(
            'INSERT INTO users (name, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?)',
            ('Admin', DEFAULT_ADMIN_EMAIL, generate_password_hash(DEFAULT_ADMIN_PASSWORD), 'admin', now_iso())
        )
        conn.commit()
    conn.close()


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def row_to_dict(row):
    return dict(row) if row else None


def require_login():
    if 'user_id' not in session:
        return None
    conn = get_db()
    user = conn.execute('SELECT * FROM users WHERE id = ?', (session['user_id'],)).fetchone()
    conn.close()
    return user


init_db()


@app.before_request
def redirect_www_to_apex():
    hostname = request.host.partition(':')[0].lower()
    if hostname == 'www.japonaisbusinessgroup.com' or (hostname == 'japonaisbusinessgroup.com' and request.path == '/index.html'):
        path = '/' if request.path == '/index.html' else request.full_path.rstrip('?')
        return redirect(f'https://japonaisbusinessgroup.com{path}', code=301)


@app.get('/')
def home():
    return send_from_directory(ROOT_DIR, 'index.html')


@app.get('/api/health')
def health():
    return jsonify({"ok": True, "service": "jbg-site-backend", "database": str(DB_PATH)})


@app.get('/login')
def login_page():
    return render_template('login.html', message=request.args.get('message', ''))


@app.post('/login')
def login_post():
    email = (request.form.get('email') or '').strip().lower()
    password = request.form.get('password') or ''
    conn = get_db()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()

    if user and check_password_hash(user['password_hash'], password):
        session['user_id'] = user['id']
        session['user_role'] = user['role']
        if user['role'] == 'admin':
            return redirect(url_for('admin_page'))
        return redirect(url_for('account_page'))

    return render_template('login.html', message='Invalid email or password')


@app.get('/register')
def register_page():
    return render_template('register.html', message='')


@app.post('/register')
def register_post():
    name = (request.form.get('name') or '').strip()
    email = (request.form.get('email') or '').strip().lower()
    password = request.form.get('password') or ''

    if not name or not email or not password:
        return render_template('register.html', message='Please fill in all fields')

    conn = get_db()
    existing = conn.execute('SELECT id FROM users WHERE email = ?', (email,)).fetchone()
    if existing:
        conn.close()
        return render_template('register.html', message='An account with that email already exists')

    conn.execute(
        'INSERT INTO users (name, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?)',
        (name, email, generate_password_hash(password), 'customer', now_iso())
    )
    conn.commit()
    conn.close()
    return redirect(url_for('login_page', message='Account created successfully. Please log in.'))


@app.get('/logout')
def logout():
    session.clear()
    return redirect(url_for('login_page', message='You have been logged out.'))


@app.get('/account')
def account_page():
    user = require_login()
    if not user:
        return redirect(url_for('login_page'))

    conn = get_db()
    orders = conn.execute(
        'SELECT * FROM orders WHERE customer_email = ? ORDER BY created_at DESC LIMIT 10',
        (user['email'],)
    ).fetchall()
    conn.close()

    return render_template('account.html', user=dict(user), orders=[dict(order) for order in orders])


@app.get('/admin')
def admin_page():
    user = require_login()
    if not user or user['role'] != 'admin':
        return redirect(url_for('login_page', message='Admin access required'))

    conn = get_db()
    stats = {
        'users': conn.execute('SELECT COUNT(*) as count FROM users').fetchone()['count'],
        'contacts': conn.execute('SELECT COUNT(*) as count FROM contacts').fetchone()['count'],
        'orders': conn.execute('SELECT COUNT(*) as count FROM orders').fetchone()['count'],
    }
    contacts = conn.execute('SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10').fetchall()
    orders = conn.execute('SELECT * FROM orders ORDER BY created_at DESC LIMIT 10').fetchall()
    conn.close()

    orders_out = []
    for o in orders:
        order_dict = dict(o)
        try:
            order_dict['item_count'] = len(json.loads(order_dict.get('items_json') or '[]'))
        except (json.JSONDecodeError, TypeError):
            order_dict['item_count'] = 0
        orders_out.append(order_dict)

    return render_template('admin.html', user=dict(user), stats=stats, contacts=[dict(c) for c in contacts], orders=orders_out)


@app.get('/api/me')
def api_me():
    user = require_login()
    if not user:
        return jsonify({"authenticated": False}), 401
    return jsonify({"authenticated": True, "user": dict(user)})


@app.post('/api/contact')
def contact():
    payload = request.get_json(silent=True) or {}
    name = (payload.get('name') or '').strip()
    email = (payload.get('email') or '').strip()
    message = (payload.get('message') or '').strip()

    if not name or not email or not message:
        return jsonify({"success": False, "error": "Name, email, and message are required."}), 400

    conn = get_db()
    conn.execute(
        'INSERT INTO contacts (name, email, phone, subject, message, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        (name, email, payload.get('phone', ''), payload.get('subject', ''), message, now_iso())
    )
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": "Thanks! Your message has been sent."})


@app.post('/api/orders')
def orders():
    payload = request.get_json(silent=True) or {}
    customer = payload.get('customer') or {}
    items = payload.get('items') or []

    if not customer.get('name') or not customer.get('email') or not customer.get('phone') or not customer.get('address') or not customer.get('city'):
        return jsonify({"success": False, "error": "Please fill in your shipping details."}), 400

    if not items:
        return jsonify({"success": False, "error": "Your cart is empty."}), 400

    order_id = f"JBG-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    conn = get_db()
    conn.execute(
        '''
        INSERT INTO orders (
            id, user_id, customer_name, customer_email, customer_phone, customer_address, customer_city, customer_note,
            payment_method, items_json, subtotal, delivery, total, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''',
        (
            order_id,
            session.get('user_id'),
            customer.get('name', ''),
            customer.get('email', ''),
            customer.get('phone', ''),
            customer.get('address', ''),
            customer.get('city', ''),
            customer.get('note', ''),
            payload.get('paymentMethod', 'momo'),
            json.dumps(items),
            payload.get('subtotal', 0),
            payload.get('delivery', 0),
            payload.get('total', 0),
            now_iso()
        )
    )
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": "Order received successfully.", "order": {"id": order_id}})


@app.get('/api/orders')
def list_orders():
    user = require_login()
    if not user:
        return jsonify({"error": "Authentication required"}), 401
    conn = get_db()
    if user['role'] == 'admin':
        rows = conn.execute('SELECT * FROM orders ORDER BY created_at DESC').fetchall()
    else:
        rows = conn.execute('SELECT * FROM orders WHERE customer_email = ? ORDER BY created_at DESC', (user['email'],)).fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
