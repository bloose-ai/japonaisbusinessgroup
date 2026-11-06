const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const rootDir = __dirname;
const dataDir = path.join(rootDir, 'data');
const contactsFile = path.join(dataDir, 'contacts.json');
const ordersFile = path.join(dataDir, 'orders.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function ensureDataFile(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf8');
  }
}

function readJson(filePath) {
  ensureDataFile(filePath);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

app.use(express.json({ limit: '1mb' }));
app.use((req, res, next) => {
  const hostname = req.hostname.toLowerCase();
  if (hostname === 'www.japonaisbusinessgroup.com' || (hostname === 'japonaisbusinessgroup.com' && req.path === '/index.html')) {
    const destinationPath = req.path === '/index.html' ? '/' : req.originalUrl;
    return res.redirect(301, `https://japonaisbusinessgroup.com${destinationPath}`);
  }
  next();
});
app.use(express.static(rootDir, { index: 'index.html' }));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'jbg-site-backend' });
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
  }

  const contacts = readJson(contactsFile);
  const inquiry = {
    id: `contact-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    subject: subject || '',
    message,
    createdAt: new Date().toISOString()
  };

  contacts.push(inquiry);
  writeJson(contactsFile, contacts);

  res.json({ success: true, message: 'Thanks! Your message has been sent.', inquiry });
});

app.post('/api/orders', (req, res) => {
  const { customer, items, paymentMethod, total, subtotal, delivery } = req.body || {};

  if (!customer?.name || !customer?.email || !customer?.phone || !customer?.address || !customer?.city) {
    return res.status(400).json({ success: false, error: 'Please fill in your shipping details.' });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, error: 'Your cart is empty.' });
  }

  const orders = readJson(ordersFile);
  const order = {
    id: `JBG-${Date.now()}`,
    customer,
    paymentMethod: paymentMethod || 'momo',
    items,
    total: Number(total) || 0,
    subtotal: Number(subtotal) || 0,
    delivery: Number(delivery) || 0,
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  writeJson(ordersFile, orders);

  res.json({ success: true, message: 'Order received successfully.', order });
});

app.get('/api/orders', (req, res) => {
  res.json(readJson(ordersFile));
});

app.listen(PORT, () => {
  console.log(`JBG backend running at http://localhost:${PORT}`);
});
