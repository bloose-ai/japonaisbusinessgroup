// ===== JBG shared scripts =====

// ---- Mobile nav toggle ----
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  renderFooter();
  renderCategoryGrid();
  renderFeaturedProducts();
  initCategorySidebar();
  initPriceFilter();
  renderProducts();
  renderProductPage();
  renderBlogGrid();
  renderBlogPost();
  updateCartCount();
  renderCartPage();
  renderCheckoutSummary();
  wireContactForm();
  wireNewsletter();
  wireCheckoutForm();
});

// ---- Footer (shared across all pages) ----
function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="foot-logo">
            <img src="images/logo-icon.png" alt="JBG - Japonais Business Group logo">
            <span class="name">JAPONAIS<b>BUSINESS GROUP</b></span>
          </div>
          <p class="desc">We provide high-quality products for modern living. Your satisfaction is our priority.</p>
          <div class="socials">
            <a href="https://www.facebook.com/share/g/1RYzYXc7cJ/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9H16l-.4 2.9h-2.1v7A10 10 0 0 0 22 12z"/></svg></a>
            <a href="https://www.instagram.com/japonais_business_group?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg></a>
            <a href="https://youtube.com/@japonaisbusinessgroup?si=1p3LEYiU4W6-prRL" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.6-.5-5.2c-.3-1-1-1.7-2-2C18.9 4.3 12 4.3 12 4.3s-6.9 0-8.5.5c-1 .3-1.7 1-2 2C1 8.4 1 12 1 12s0 3.6.5 5.2c.3 1 1 1.7 2 2 1.6.5 8.5.5 8.5.5s6.9 0 8.5-.5c1-.3 1.7-1 2-2 .5-1.6.5-5.2.5-5.2zM10 15.5v-7l6 3.5-6 3.5z"/></svg></a>
          </div>
        </div>
        <div>
          <h4>QUICK LINKS</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="category.html">Shop</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4>CUSTOMER SERVICE</h4>
          <ul>
            <li><a href="#">My Account</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Return Policy</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4>CATEGORIES</h4>
          <ul>
            ${CATEGORIES.slice(0, 5).map(c => `<li><a href="category.html?cat=${c.slug}">${c.name}</a></li>`).join('')}
          </ul>
        </div>
        <div>
          <h4>CONTACT US</h4>
          <ul>
            <li>Kigali-gisozi, Rubavu-Gisenyi, Rusizi-kamembe, Musanze</li>
            <li>+250782230682</li>
            <li>info@japonaisbusinessgroup.com</li>
          </ul>
        </div>
      </div>
      <div class="foot-bottom">
        <span>&copy; 2026 Japonais Business Group. All Rights Reserved.</span>
        <div class="pay-icons">
          <span>VISA</span><span>MC</span><span>MTN</span>
        </div>
      </div>
    </div>
  `;
}

function updateSeoMetadata(description, canonicalPath) {
  const descriptionTag = document.querySelector('meta[name="description"]');
  const canonicalTag = document.querySelector('link[rel="canonical"]');
  if (descriptionTag) descriptionTag.content = description;
  if (canonicalTag) canonicalTag.href = new URL(canonicalPath, 'https://www.japonaisbusinessgroup.com').href;
}

// ---- Product data (all categories) ----
const PRODUCTS = [
  { id: 'p1', name: 'Freestanding Double-Slipper Bathtub', price: 1450, category: 'Bathtubs', img: 'images/products/bathtubs/1.jpg', desc: 'A glossy acrylic freestanding tub with a raised slipper edge on both ends, paired here with a matte black floor-standing filler. Its deep basin and sculpted curves make it a striking centerpiece for spacious, modern bathrooms.' },
  { id: 'p2', name: 'Rectangular Soaking Bathtub with Deck Faucets', price: 1180, category: 'Bathtubs', img: 'images/products/bathtubs/2.jpg', desc: 'A clean-lined rectangular tub finished in high-gloss white, with a built-in deck for mounting the mixer taps directly on the tub. The wide, flat rim doubles as a shelf for soaps and candles.' },
  { id: 'p3', name: 'Compact Alcove Soaking Tub', price: 890, category: 'Bathtubs', img: 'images/products/bathtubs/3.jpg', desc: 'A space-saving tub sized for smaller bathrooms, with straight sides and a gently curved interior for comfortable soaking. Works well against a wall or tucked into an alcove.' },
  { id: 'p4', name: 'Vintage Clawfoot Bathtub', price: 1650, category: 'Bathtubs', img: 'images/products/bathtubs/4.jpg', desc: 'A traditional roll-top tub finished in glossy white with ornate brass-tone claw feet and a matching telephone-style faucet. Brings a classic, old-world elegance to any bathroom.' },
  { id: 'p5', name: 'Wall-Mounted Vanity with Mirror Cabinet', price: 620, category: 'Bath Cabinets', img: 'images/products/bath-cabinets/1.jpeg', desc: 'A grey wall-hung vanity set pairing a ceramic basin countertop with soft-close cabinet doors below and a mirrored storage cabinet with open shelving above — a complete, space-efficient washstand solution.' },
  { id: 'p6', name: 'LED Mirror Vanity Cabinet with Marble-Top Basin', price: 780, category: 'Bath Cabinets', img: 'images/products/bath-cabinets/2.jpeg', desc: 'A premium vanity unit featuring a backlit LED mirror cabinet with built-in shelving, sitting above a black marble-effect countertop with an integrated basin and gold-trimmed cabinet doors.' },
  { id: 'p7', name: 'Irregular Wave-Edge Frameless Mirror', price: 165, category: 'Mirrors', img: 'images/products/mirrors/1.jpeg', desc: 'A sculptural full-length mirror with an organic, wave-like silhouette and no visible frame. A striking statement piece for a living room, bedroom, or entryway.' },
  { id: 'p8', name: 'Round LED Backlit Bathroom Mirror', price: 195, category: 'Mirrors', img: 'images/products/mirrors/2.jpeg', desc: 'A circular mirror with a soft LED halo and a touch-sensor power button, giving even, flattering light for grooming and skincare routines.' },
  { id: 'p9', name: 'Rectangular LED Mirror with Demister Pad', price: 240, category: 'Mirrors', img: 'images/products/mirrors/3.jpeg', desc: 'A backlit rectangular mirror with touch controls for brightness and an anti-fog demister pad, keeping the surface clear even after a hot shower.' },
  { id: 'p10', name: 'Oval LED Mirror with Digital Clock', price: 260, category: 'Mirrors', img: 'images/products/mirrors/4.jpeg', desc: 'An oval backlit mirror with a built-in digital clock display and touch controls, combining everyday function with a soft, ambient glow.' },
  { id: 'p11', name: 'Large Rectangular Backlit Vanity Mirror', price: 310, category: 'Mirrors', img: 'images/products/mirrors/5.jpeg', desc: 'An oversized rectangular mirror with edge-lit LED lighting and a built-in display panel, sized for double-vanity bathrooms and hospitality spaces.' },
  { id: 'p12', name: 'Bold-Frame Rectangular LED Mirror', price: 285, category: 'Mirrors', img: 'images/products/mirrors/6.jpeg', desc: 'A rectangular mirror with a wide illuminated border and touch-sensor controls, offering strong, even lighting for larger bathroom layouts.' },
  { id: 'p13', name: 'Double-Door Frost-Free Refrigerator', price: 980, category: 'Refrigerators', img: 'images/products/refrigerators/1.jpg', desc: 'A spacious top-freezer refrigerator with independent temperature zones and an inverter compressor for quiet, energy-efficient running. Smart inverter technology keeps food fresher for longer while lowering electricity bills.' },
  { id: 'p14', name: '4-Burner Gas Cooker with Oven', price: 720, category: 'Gas Cookers', img: 'images/products/gas-cookers/1.jpg', desc: 'A freestanding gas range with four burners, a full-size gas oven, and precise temperature dial controls. Finished in matte black with stainless trim for a sleek, professional kitchen look.' },
  { id: 'p15', name: 'HD Bullet CCTV Camera', price: 68, category: 'Security Cameras', img: 'images/products/cameras/1.jpg', desc: 'A weatherproof outdoor bullet camera with a wide-angle lens and infrared night vision, built for continuous perimeter monitoring around homes and businesses.' },
  { id: 'p16', name: 'HD Dome CCTV Camera', price: 62, category: 'Security Cameras', img: 'images/products/cameras/2.jpg', desc: 'A discreet indoor/outdoor dome camera offering wide-angle coverage and clear night vision, ideal for entryways, hallways, and reception areas.' },
  { id: 'p17', name: '18-inch LED Ring Light with Tripod Stand', price: 95, category: 'Camera & Studio Accessories', img: 'images/products/camera-accessories/1.jpeg', desc: 'A dimmable ring light with adjustable color temperature, triple phone clamps, and a remote control — complete with a carry case and adjustable stand for content creation and live streaming.' },
  { id: 'p18', name: '32-inch Smart HD TV with webOS', price: 260, category: 'Televisions', img: 'images/products/televisions/1.jpg', desc: 'A compact smart TV running webOS Hub with support for Apple AirPlay and HomeKit, plus Dolby Audio for crisp, room-filling sound.' },
  { id: 'p19', name: '55-inch Crystal UHD Smart TV', price: 690, category: 'Televisions', img: 'images/products/televisions/2.jpg', desc: 'A large-screen 4K smart TV with vivid color reproduction and slim bezels, well suited to living rooms, showrooms, and entertainment lounges.' },
  { id: 'p20', name: 'Advanced USB Wall Socket Set', price: 18, category: 'Switches & Sockets', img: 'images/products/switches-sockets/1.jpeg', desc: 'A fire-rated universal socket with dual USB-A/USB-C charging ports and twin switches, finished in matte black for a modern wall profile.' },
  { id: 'p21', name: 'Screwless Double USB Wall Socket', price: 22, category: 'Switches & Sockets', img: 'images/products/switches-sockets/2.jpg', desc: 'A sleek screwless-plate double socket with integrated USB charging ports, finished in graphite for a minimalist, professional look.' },
  { id: 'p22', name: 'Gold Finish Switch & Socket Collection', price: 15, category: 'Switches & Sockets', img: 'images/products/switches-sockets/3.jpg', desc: 'A brushed-gold range of switches and sockets — including USB sockets, single switches, and multi-gang plates — for a coordinated, upscale finish throughout the home.' },
  { id: 'p23', name: 'Compact Rooftop Solar Water Heater', price: 480, category: 'Solar Water Heaters', img: 'images/products/solar-heaters/1.jpg', desc: 'A vacuum-tube solar water heater with an insulated steel tank, designed to mount directly on a pitched roof and deliver hot water using free solar energy.' },
  { id: 'p24', name: 'Vacuum Tube Solar Water Heater System', price: 520, category: 'Solar Water Heaters', img: 'images/products/solar-heaters/2.jpg', desc: 'A freestanding solar water heater with a full vacuum-tube collector array and support frame, suited to ground or flat-roof installation.' },
  { id: 'p25', name: 'Wall-Hung Urinal Set (Row Installation)', price: 145, category: 'Toilets & Urinals', img: 'images/products/toilets/1.jpeg', desc: 'Ceramic wall-hung urinals with manual flush valves, supplied and installed in a row — a durable, easy-clean option for commercial and public restrooms.' },
  { id: 'p26', name: 'Ceramic Ceramic Squat Toilet Pan', price: 58, category: 'Toilets & Urinals', img: 'images/products/toilets/2.jpeg', desc: 'A durable ceramic squat toilet pan, available in several finishes, suited to both new installations and replacements in standard restroom layouts.' },
  { id: 'p27', name: 'Squat Toilet with Wall-Mounted Cistern', price: 95, category: 'Toilets & Urinals', img: 'images/products/toilets/3.jpeg', desc: 'A complete squat toilet setup with a wall-mounted flush cistern and pipework, finished into a tiled floor recess for a neat, built-in look.' },
  { id: 'p28', name: 'Manual Flush Wall Urinal', price: 130, category: 'Toilets & Urinals', img: 'images/products/toilets/4.jpeg', desc: 'A wall-mounted ceramic urinal paired with a chrome manual flush valve, built for reliable everyday use in busy washrooms.' },
  { id: 'p29', name: 'Exposed Flush Valve Urinal', price: 120, category: 'Toilets & Urinals', img: 'images/products/toilets/5.jpeg', desc: 'A compact wall urinal with an exposed chrome flush valve, offering straightforward installation and servicing.' },
  { id: 'p30', name: 'Urinal Set with Privacy Dividers', price: 310, category: 'Toilets & Urinals', img: 'images/products/toilets/6.jpeg', desc: 'A multi-bay urinal installation with glass privacy dividers and grab rails, designed for commercial restrooms that need both function and discretion.' },
  { id: 'p31', name: 'Accessible Toilet with Support Rails', price: 275, category: 'Toilets & Urinals', img: 'images/products/toilets/7.jpeg', desc: 'A raised-height toilet suite fitted with wall-mounted support rails, designed for accessible and elderly-friendly bathroom installations.' },
  { id: 'p32', name: 'PPR Pipe Fittings & Ball Valve Set', price: 42, category: 'Plumbing Products', img: 'images/products/plumbing/1.jpeg', desc: 'A mixed set of CPVC/PPR fittings — elbows, tees, unions, and a ball valve with brass inserts — covering the essentials for a residential plumbing run.' },
  { id: 'p33', name: 'PPR Pipes & Ball Valve Kit', price: 55, category: 'Plumbing Products', img: 'images/products/plumbing/2.jpeg', desc: 'PPR pressure pipes bundled with elbows, tees, and both a stop valve and a lever ball valve, ready for hot and cold water line installation.' },
  { id: 'p34', name: 'Brass-Union PPR Fittings Set', price: 38, category: 'Plumbing Products', img: 'images/products/plumbing/3.jpeg', desc: 'A compact fittings set combining PPR elbows and tees with brass union and threaded connectors, plus a length of PPR pipe for straightforward joins.' },
  { id: 'p35', name: 'Green PPR Pipe Fittings Bundle', price: 65, category: 'Plumbing Products', img: 'images/products/plumbing/4.jpeg', desc: 'A large bundle of green PPR pipes and fittings — elbows, tees, couplers, and pipe clips — for full-room or full-building plumbing installations.' },
  { id: 'p36', name: 'Complete PPR Plumbing Fittings Set', price: 89, category: 'Plumbing Products', img: 'images/products/plumbing/5.jpeg', desc: 'An extensive PPR fittings range covering valves, taps, manifolds, unions, and pipe sections, giving installers everything needed for a full plumbing job in one set.' },
  { id: 'p37', name: '6-Piece Chrome Bathroom Accessory Set', price: 75, category: 'Bathroom Accessories', img: 'images/products/bathroom-accessories/1.jpeg', desc: 'A coordinated chrome accessory set including a robe hook, soap dish, tumbler holder, soap dispenser, towel ring, and towel bar — all sharing a polished, classic finish.' },
  { id: 'p38', name: '4-Piece Matte Black Accessory Set', price: 68, category: 'Bathroom Accessories', img: 'images/products/bathroom-accessories/2.jpeg', desc: 'A modern matte black set covering a double robe hook, hand-towel bar, longer towel bar, and toilet-roll holder, for a coordinated contemporary bathroom.' },
  { id: 'p39', name: 'Black Bidet Sprayer Set with Coil Hose', price: 34, category: 'Bathroom Accessories', img: 'images/products/bathroom-accessories/3.jpeg', desc: 'A matte black handheld bidet sprayer with angle valve and coiled hose, offering pressurized spray for a cleaner, paper-saving bathroom routine.' },
  { id: 'p40', name: 'Bidet Sprayer Set (Chrome, Grey & Black)', price: 32, category: 'Bathroom Accessories', img: 'images/products/bathroom-accessories/4.jpeg', desc: 'A handheld bidet sprayer and valve set available in chrome, gunmetal, or matte black finishes, with a flexible coil hose for easy reach.' },
  { id: 'p41', name: 'Oval Gold & Black Countertop Basin', price: 210, category: 'Bathroom Accessories', img: 'images/products/bathroom-accessories/5.jpeg', desc: 'A statement countertop basin with a textured gold exterior and glossy black interior, paired here with a matte black waterfall faucet.' },
  { id: 'p42', name: 'Matte White Vessel Sink', price: 145, category: 'Bathroom Accessories', img: 'images/products/bathroom-accessories/6.jpeg', desc: 'A soft-edged rectangular vessel basin in a matte white finish, designed to sit on a countertop with a single-lever faucet.' },
  { id: 'p43', name: 'Black Rainfall Shower System', price: 195, category: 'Bathroom Accessories', img: 'images/products/bathroom-accessories/7.jpeg', desc: 'A wall-mounted thermostatic shower system in matte black, with a rectangular rain shower head, adjustable handheld sprayer, and slide rail.' },
  { id: 'p44', name: 'Outdoor Bollard Path Light', price: 45, category: 'Lighting', img: 'images/products/lighting/1.jpeg', desc: 'A weatherproof LED bollard light for driveways and garden paths, casting a warm, even glow along walkways after dark.' },
  { id: 'p45', name: 'Minimalist Pendant Light with Glass Globe', price: 58, category: 'Lighting', img: 'images/products/lighting/12.jpeg', desc: 'A slim pendant fixture pairing a slender black rod with a small glass globe diffuser, well suited to bedside or kitchen island lighting.' },
  { id: 'p46', name: 'Solar-Powered Moon Garden Light', price: 39, category: 'Lighting', img: 'images/products/lighting/15.jpeg', desc: 'A textured sphere light that mimics the moon\'s surface, running on solar power to add soft ambient light to lawns and garden beds.' },
  { id: 'p47', name: 'Modern Crystal Chandelier', price: 340, category: 'Lighting', img: 'images/products/lighting/11.jpeg', desc: 'A tiered chandelier with cascading crystal-style droplets on a metal frame, sized for dining rooms and entryway ceilings.' },
  { id: 'p48', name: 'Round LED Flush-Mount Ceiling Light', price: 62, category: 'Lighting', img: 'images/products/lighting/2.jpeg', desc: 'A slim round ceiling fixture with even, glare-free LED light, suited to hallways, bedrooms, and living spaces.' },
  { id: 'p49', name: 'Modern Wall Sconce Lamp', price: 48, category: 'Lighting', img: 'images/products/lighting/19.jpeg', desc: 'A wall-mounted light fixture with a sculptural shade, adding layered accent lighting to corridors and living rooms.' },
  { id: 'p50', name: 'Adjustable Modern Floor Lamp', price: 110, category: 'Lighting', img: 'images/products/lighting/18.jpeg', desc: 'A tall floor lamp with an adjustable arm and head, giving directional reading or ambient light for lounges and studies.' },
  { id: 'p51', name: 'Ceramic Base Table Lamp', price: 54, category: 'Lighting', img: 'images/products/lighting/5.jpeg', desc: 'A table lamp with a textured ceramic base and fabric shade, adding warm, soft lighting to bedside tables and consoles.' },
  { id: 'p52', name: 'Flexible LED Strip Light Kit', price: 28, category: 'Lighting', img: 'images/products/lighting/9.jpeg', desc: 'A cuttable, self-adhesive LED strip kit for under-cabinet, cove, or accent lighting, supplied with a remote-control dimmer.' },
  { id: 'p53', name: 'Outdoor Wall Lantern Light', price: 52, category: 'Lighting', img: 'images/products/lighting/1.jpeg', desc: 'A weatherproof wall-mounted lantern light for porches and exterior walls, combining classic styling with LED efficiency.' },
  { id: 'p54', name: 'Adjustable Track Spotlight', price: 65, category: 'Lighting', img: 'images/products/lighting/6.jpeg', desc: 'A ceiling-mounted track spotlight with rotating heads, giving focused accent lighting for artwork, shelving, or retail displays.' },
  { id: 'p55', name: 'Rattan Woven Pendant Lamp', price: 72, category: 'Lighting', img: 'images/products/lighting/13.webp', desc: 'A natural woven rattan pendant shade that filters light into warm, dappled patterns — a popular choice for dining and lounge areas.' },
  { id: 'p56', name: 'Nordic Glass Pendant Light', price: 84, category: 'Lighting', img: 'images/products/lighting/14.jpg', desc: 'A minimalist pendant light with a hand-blown glass shade and slim metal fittings, inspired by understated Scandinavian design.' },
  { id: 'p57', name: 'Industrial Wall Lamp', price: 46, category: 'Lighting', img: 'images/products/lighting/20.jpeg', desc: 'A metal-shaded wall lamp with an exposed-bulb industrial look, well suited to loft-style interiors and feature walls.' },
  { id: 'p58', name: 'Recessed LED Downlight', price: 19, category: 'Lighting', img: 'images/products/lighting/10.jpeg', desc: 'A slim recessed ceiling downlight for even, low-profile general lighting throughout homes and offices.' },
  { id: 'p59', name: 'Gold-Frame Tiered Chandelier', price: 385, category: 'Lighting', img: 'images/products/lighting/21.jpeg', desc: 'A layered chandelier with a brushed-gold frame and warm-dimmable bulbs, designed as a statement piece for dining rooms.' },
  { id: 'p60', name: 'LED Vanity Light Bar', price: 58, category: 'Lighting', img: 'images/products/lighting/4.jpeg', desc: 'A horizontal LED light bar for mounting above bathroom mirrors, giving bright, even, shadow-free illumination.' },
  { id: 'p61', name: 'Solar Garden Spike Light', price: 24, category: 'Lighting', img: 'images/products/lighting/16.jpeg', desc: 'A stake-mounted solar light for lining garden beds and pathways, charging by day and glowing automatically at night.' },
  { id: 'p62', name: 'Ultra-Slim LED Panel Light', price: 34, category: 'Lighting', img: 'images/products/lighting/7.jpeg', desc: 'A flat LED panel light for ceiling or surface mounting, giving bright, uniform light for kitchens, offices, and hallways.' },
  { id: 'p63', name: 'Decorative Multi-Head Hanging Lamp', price: 96, category: 'Lighting', img: 'images/products/lighting/17.jpeg', desc: 'A cluster pendant fixture with multiple glass shades at staggered heights, creating a layered focal point over dining tables.' },
  { id: 'p64', name: 'Touch-Control Bedside Lamp', price: 41, category: 'Lighting', img: 'images/products/lighting/8.jpeg', desc: 'A compact touch-sensitive bedside lamp with adjustable brightness levels, adding soft, controllable light to any nightstand.' },
  { id: 'p65', name: 'Multi-Speed Countertop Blender', price: 55, category: 'Electronics', img: 'images/products/electronics/1.jpeg', desc: 'A high-power countertop blender with multiple speed settings and a shatter-resistant jug, built for smoothies, sauces, and everyday kitchen prep.' },
  { id: 'p66', name: 'Digital Microwave Oven', price: 95, category: 'Electronics', img: 'images/products/electronics/2.jpg', desc: 'A digital-control microwave oven with preset cooking programs and a defrost function, sized for family kitchens.' },
  { id: 'p67', name: 'Stainless Steel Electric Kettle', price: 32, category: 'Electronics', img: 'images/products/electronics/3.jpg', desc: 'A fast-boiling stainless steel kettle with auto shut-off and boil-dry protection, built for daily reliability.' },
  { id: 'p68', name: 'Automatic Rice Cooker', price: 48, category: 'Electronics', img: 'images/products/electronics/4.jpg', desc: 'A one-touch rice cooker with a non-stick inner pot and keep-warm function, taking the guesswork out of everyday cooking.' },
  { id: 'p69', name: 'Digital Air Fryer', price: 78, category: 'Electronics', img: 'images/products/electronics/5.jpg', desc: 'A digital air fryer with adjustable temperature and timer controls, giving crisp results with a fraction of the oil.' },
  { id: 'p70', name: 'Oscillating Stand Fan', price: 62, category: 'Electronics', img: 'images/products/electronics/6.jpg', desc: 'A height-adjustable stand fan with multiple speed settings and wide oscillation, built for year-round air circulation.' },
  { id: 'p71', name: 'Steam Iron Box', price: 26, category: 'Electronics', img: 'images/products/electronics/7.jpg', desc: 'A steam iron with adjustable temperature settings and a non-stick soleplate, for fast, effective everyday ironing.' },
  { id: 'p72', name: '2-Slice Electric Toaster', price: 24, category: 'Electronics', img: 'images/products/electronics/8.jpg', desc: 'A compact toaster with adjustable browning control and a removable crumb tray, sized for small kitchens and offices.' },
  { id: 'p73', name: 'Bagless Vacuum Cleaner', price: 115, category: 'Electronics', img: 'images/products/electronics/9.jpg', desc: 'A powerful bagless vacuum cleaner with a washable filter, built for everyday cleaning across carpets and hard floors.' },
  { id: 'p74', name: 'Ionic Hair Dryer', price: 34, category: 'Electronics', img: 'images/products/electronics/10.jpg', desc: 'A lightweight ionic hair dryer with multiple heat and speed settings, designed to reduce frizz and cut drying time.' },
  { id: 'p75', name: 'Hot & Cold Water Dispenser', price: 165, category: 'Electronics', img: 'images/products/electronics/11.jpg', desc: 'A freestanding water dispenser delivering both hot and cold water on demand, suited to homes and offices alike.' },
  { id: 'p76', name: 'Bluetooth Speaker System', price: 88, category: 'Electronics', img: 'images/products/electronics/12.jpeg', desc: 'A powerful home speaker system with Bluetooth connectivity and deep bass output, built for movie nights and gatherings.' },
  { id: 'p77', name: '6-Way Extension Power Strip', price: 16, category: 'Electronics', img: 'images/products/electronics/13.jpg', desc: 'A surge-protected extension strip with multiple outlets and an on/off switch, keeping multi-device setups tidy and safe.' },
  { id: 'p78', name: 'Electric Pressure Cooker', price: 92, category: 'Electronics', img: 'images/products/electronics/15.jpeg', desc: 'A multi-function electric pressure cooker that cuts cooking time for stews, rice, and beans while keeping the kitchen cool.' },
  { id: 'p79', name: '3-Blade Ceiling Fan', price: 74, category: 'Electronics', img: 'images/products/electronics/16.jpg', desc: 'A quiet-running ceiling fan with multiple speed settings, designed to keep rooms comfortable through hot seasons.' },
  { id: 'p80', name: 'Personal Juicer Blender', price: 42, category: 'Electronics', img: 'images/products/electronics/17.jpg', desc: 'A compact juicer/blender combo with a travel-friendly bottle, perfect for quick smoothies and fresh juice on the go.' },
  { id: 'p81', name: 'Drip Coffee Maker', price: 58, category: 'Electronics', img: 'images/products/electronics/18.jpg', desc: 'An automatic drip coffee maker with a reusable filter and a warming plate, brewing a full pot in minutes.' },
  { id: 'p82', name: 'Chest Deep Freezer', price: 340, category: 'Electronics', img: 'images/products/electronics/19.jpg', desc: 'A large-capacity chest freezer with adjustable thermostat control, built for long-term food storage.' },
  { id: 'p83', name: 'Front-Load Washing Machine', price: 560, category: 'Electronics', img: 'images/products/electronics/20.jpg', desc: 'A front-load washing machine with multiple wash programs and a quiet-spin motor, built to handle daily loads for a busy household.' },
  { id: 'p84', name: 'Instant Electric Water Heater', price: 86, category: 'Electronics', img: 'images/products/electronics/14.jpg', desc: 'A compact tankless water heater that delivers hot water on demand, ideal for kitchens and small bathrooms.' },
  { id: 'p85', name: 'Multi-Function Electric Cooker', price: 68, category: 'Electronics', img: 'images/products/electronics/21.jpg', desc: 'An all-in-one electric cooker combining boiling, frying, and steaming functions in a single compact appliance.' },
];

const CATALOG_ONLY_PRODUCTS = [
  { name: 'Eklis Hydromassage Shower Cabin', category: 'Shower Enclosures', img: '/images/products/bath/bath-1-1.jpg', desc: 'A compact corner shower cabin with curved glass doors, a built-in seat, and a vertical hydromassage panel. Its rounded footprint is suited to bathrooms where space is limited.' },
  { name: 'Black Mirror Quadrant Shower Cabin', category: 'Shower Enclosures', img: '/images/products/bath/bath-1-2.jpg', desc: 'A curved corner enclosure with dark reflective glass, a matching black frame, and sliding doors. The striking finish gives a modern look while keeping the shower area enclosed.' },
  { name: 'Rectangular Glass Shower Cabin', category: 'Shower Enclosures', img: '/images/products/bath/bath-1-3.jpg', desc: 'A spacious rectangular enclosure with clear glass panels, a slim metal frame, and a raised shower tray. The simple shape fits neatly along a bathroom wall.' },
  { name: 'Frascio Satin-Glass Shower Cabin', category: 'Shower Enclosures', img: '/images/products/bath/bath-1-4.jpg', desc: 'A rectangular shower enclosure with frosted glass panels, a polished metal frame, and wide hinged doors. The satin finish adds privacy while allowing light through.' },
  { name: 'Insignia Black Steam Shower Cabin', category: 'Shower Enclosures', img: '/images/products/bath/bath-1-5.jpg', desc: 'A curved steam-shower cabin with dark glass, a built-in seat, overhead lighting, and a multi-jet control panel. A complete enclosure designed for a spa-style bathroom.' },
  { name: 'Novellini Star Glass Shower Cabin', category: 'Shower Enclosures', img: '/images/products/bath/bath-1-6.jpg', desc: 'A clean-lined glass shower enclosure with clear panels, chrome hardware, and a low-profile tray. Its understated design pairs easily with a range of bathroom finishes.' },
  { name: 'Gold Stainless-Steel Soap Dish Shelf', category: 'Bathroom Accessories', img: '/images/products/bathroom-accessories/accessory-8-2.jpg', desc: 'A wall-mounted stainless-steel soap shelf with a warm gold finish and open drainage design. Keeps soap close at hand while helping water drain away.' },
  { name: 'Chrome Brass Wall-Mounted Soap Holder', category: 'Bathroom Accessories', img: '/images/products/bathroom-accessories/accessory-8-3.jpg', desc: 'A polished chrome wall-mounted soap holder with a sturdy brass fixture and open wire basket. Its raised design keeps the soap accessible beside a sink or shower.' },
  { name: 'Sofia Chrome Soap Basket', category: 'Bathroom Accessories', img: '/images/products/bathroom-accessories/accessory-8-4.jpg', desc: 'A compact chrome-finish wire basket with a wall-mounted base. The open design drains easily and provides a tidy place for soap in the shower or beside the basin.' },
  { name: 'Wall-Mounted Push Soap Dispenser', category: 'Bathroom Accessories', img: '/images/products/bathroom-accessories/accessory-8-1.jpg', desc: 'A wall-mounted liquid soap dispenser with a dark rectangular body and a front push button. Its fixed position helps keep bathroom counters clear.' },
  { name: 'TP-Link Tapo Pan-and-Tilt Security Camera', category: 'Security Cameras', img: '/images/products/cameras/camera-3-1.jpg', desc: 'A compact indoor security camera with a rounded pan-and-tilt head and a desktop-style base. The movable lens can be positioned to monitor a wider area of a room.' },
  { name: 'Outdoor Wireless Security Camera', category: 'Security Cameras', img: '/images/products/cameras/camera-3-4.jpg', desc: 'An outdoor wireless camera with a weather-ready housing, antennae, and built-in LED lighting around the lens. Designed for mounting outside to monitor entrances and yard areas.' },
  { name: 'DEKOPRO 198-Piece Home Repair Tool Kit', category: 'Tools & Hardware', img: '/images/products/electronics/electronics-22-1.jpg', desc: 'A broad household repair set arranged in a carry case, with hand tools, sockets, and accessories held in fitted compartments. A convenient kit for common home maintenance tasks.' },
  { name: 'Dormer 25-Piece Jobber Drill Set', category: 'Tools & Hardware', img: '/images/products/electronics/electronics-22-2.jpg', desc: 'A 25-piece jobber drill set supplied in a compact red storage case. The organized layout keeps the drill bits together and easy to select for workshop jobs.' },
  { name: '9L Fluorine-Free Foam Fire Extinguisher', category: 'Fire Safety', img: '/images/products/fire-safety/fire-1.jpg', desc: 'A red portable foam extinguisher with a hose, pressure gauge, and carry handle. Its 9-litre size is suited to building and workplace fire-safety setups.' },
  { name: 'Portable Fire Extinguisher Range', category: 'Fire Safety', img: '/images/products/fire-safety/fire-2.jpg', desc: 'A selection of portable fire extinguishers in different sizes and styles, including hose-equipped units. Contact us to confirm the extinguisher type and capacity for your needs.' },
  { name: 'Coiled Fire Hose', category: 'Fire Safety', img: '/images/products/fire-safety/fire-3.jpg', desc: 'A bright red fire hose supplied in a compact coil with metal connectors at the ends. The coiled format makes the hose easier to store with emergency equipment.' },
  { name: 'Outdoor Rescue Helmet with Visor', category: 'Fire Safety', img: '/images/products/fire-safety/fire-5.jpg', desc: 'A red protective rescue helmet with a high-visibility yellow band, front light, and clear visor. The adjustable chin strap helps keep it secure during use.' },
  { name: 'Flame-Resistant Firefighting Gloves', category: 'Fire Safety', img: '/images/products/fire-safety/fire-6.jpg', desc: 'A pair of long-cuff orange protective gloves with reflective yellow bands and reinforced-looking palms. Designed for use as part of firefighting and rescue protective gear.' },
  { name: 'Fire Protection Equipment', category: 'Fire Safety', img: '/images/products/fire-safety/fire-4.jpg', desc: 'A fire-protection installation showing extinguishers, hose reels, and wall-mounted safety equipment. Contact us to discuss equipment and setup for your building.' },
  { name: 'Fire Protection Equipment Set', category: 'Fire Safety', img: '/images/products/fire-safety/1006765691704704935.jpg', desc: 'A collection of fire extinguishers, hose reels, and related emergency equipment for building fire-protection systems.' },
  { name: 'Portable Fire Extinguisher Set', category: 'Fire Safety', img: '/images/products/fire-safety/1031324383414589707.jpg', desc: 'A selection of portable fire extinguishers in different agent types and sizes for a range of fire-protection needs.' },
  { name: '10 kg Trolley-Mounted CO2 Extinguisher', category: 'Fire Safety', img: '/images/products/fire-safety/10KG Steel Trolley CO2 Fire Extinguisher.jpg', desc: 'A large carbon-dioxide fire extinguisher mounted on a wheeled trolley for easier movement.' },
  { name: 'Fire Monitor Nozzle', category: 'Fire Safety', img: '/images/products/fire-safety/201113939605664546.jpg', desc: 'A red fire monitor nozzle with a flanged base, adjustable outlet, and pressure gauge.' },
  { name: 'Fire Hydrant with Twin Outlets', category: 'Fire Safety', img: '/images/products/fire-safety/332984966197155650.jpg', desc: 'A red fire hydrant fitted with capped hose outlets and chains to keep the caps attached.' },
  { name: 'Fire Hydrant Valve', category: 'Fire Safety', img: '/images/products/fire-safety/414120128228108506.jpg', desc: 'A red hydrant valve body with capped side connections and a protective top cap.' },
  { name: 'Manual Fire Alarm Pull Station', category: 'Fire Safety', img: '/images/products/fire-safety/660762576612199130.jpg', desc: 'A wall-mounted manual fire alarm station with a pull-down activation handle.' },
  { name: 'Fire Hose Reel Cabinet', category: 'Fire Safety', img: '/images/products/fire-safety/99+ Fire Hose Reel Cabinets - Kitchen island….jpg', desc: 'A wall-mounted fire hose reel housed in a red metal cabinet for organized emergency access.' },
  { name: 'Bronze Fire Hose Valve', category: 'Fire Safety', img: '/images/products/fire-safety/angled globe valve Archives - Johnson Valves.jpg', desc: 'A bronze fire-service valve with a red handwheel and threaded connections.' },
  { name: 'Fire Pump Package', category: 'Fire Safety', img: '/images/products/fire-safety/Armstrong introduces HSC Firepak -- a completely___.jpg', desc: 'A packaged fire pump system with pump assemblies and control equipment mounted on a shared base.' },
  { name: 'Smoke and Carbon Monoxide Alarm', category: 'Fire Safety', img: '/images/products/fire-safety/Fire alarm smoke sensor glowing red on ceiling _ Carbon monoxide detector. stock photo concept', desc: 'A ceiling-mounted smoke and carbon monoxide detector with a visible alarm indicator.' },
  { name: 'Fire Alarm Smoke Detector', category: 'Fire Safety', img: '/images/products/fire-safety/Fire Alarm Systems.jpg', desc: 'A smoke detector with a flashing alarm indicator, shown in a smoke-filled room.' },
  { name: 'Wall-Mounted Fire Hose Reel', category: 'Fire Safety', img: '/images/products/fire-safety/Fire Fighting Hose Reel.jpg', desc: 'A red wall-mounted fire hose reel with a hose guide and nozzle for emergency use.' },
  { name: 'Firefighting Equipment Assortment', category: 'Fire Safety', img: '/images/products/fire-safety/Fire Fighting System becomes an alternative scheme for industrial insurance policy.jpg', desc: 'An assortment of extinguishers, hoses, valves, and other firefighting equipment.' },
  { name: 'Fire Hose Reel and Hydrant Installation', category: 'Fire Safety', img: '/images/products/fire-safety/Fire Hydrant System.jpg', desc: 'A building fire-protection installation with a hose reel, hose cabinet, and hydrant connection.' },
  { name: 'Flanged Fire Hydrant Valve', category: 'Fire Safety', img: '/images/products/fire-safety/FIRE HYDRANT VALVE.jpg', desc: 'A red flanged hydrant valve with a handwheel for controlling water flow.' },
  { name: 'Fire Protection System Components', category: 'Fire Safety', img: '/images/products/fire-safety/Fire protection system انظمه الإطفاء water fire….jpg', desc: 'A collection of fire-protection equipment including extinguishers, hose fittings, and system components.' },
  { name: 'Fire Safety Equipment Installation', category: 'Fire Safety', img: '/images/products/fire-safety/fire protection_ Haseen Habib Trading.jpg', desc: 'A building fire-safety setup featuring an extinguisher and a cabinet-mounted hose reel.' },
  { name: 'Split-Case Fire Pump', category: 'Fire Safety', img: '/images/products/fire-safety/Fire pump system-split case fire pump.jpg', desc: 'A split-case fire pump assembly with motor, piping, and control equipment.' },
  { name: 'Firefighting Equipment Range', category: 'Fire Safety', img: '/images/products/fire-safety/Fire Safety Equipment & Services Coimbatore.jpg', desc: 'A display of firefighting equipment including extinguishers, hoses, protective gear, and fittings.' },
  { name: 'Fire Alarm and Safety Equipment Installation', category: 'Fire Safety', img: '/images/products/fire-safety/Fireproofing Your Office in 5 Easy Steps.jpg', desc: 'A corridor fire-safety installation featuring an alarm, portable extinguisher, and enclosed hose reel.' },
  { name: 'Fire Alarm Sounder and Strobe', category: 'Fire Safety', img: '/images/products/fire-safety/FIRESUPPLIES_ Addressable & Conventional Fire Alarm System.jpg', desc: 'A wall-mounted fire alarm sounder with a clear strobe light for audible and visual alerts.' },
  { name: 'Emergency First Aid Kit', category: 'Fire Safety', img: '/images/products/fire-safety/First Aid Kit 185-Piece Emergency Essentials.jpg', desc: 'A portable first-aid kit with medical supplies for workplace and emergency preparedness.' },
  { name: 'Grooved Fire-System Pipe Fittings', category: 'Fire Safety', img: '/images/products/fire-safety/Grooved Pipe Fitting (@ulfmvalve) on X.jpg', desc: 'Grooved pipe fittings and couplings used to connect sections of fire-protection piping.' },
  { name: 'Fire-System Gate Valve', category: 'Fire Safety', img: '/images/products/fire-safety/NRS and OS&Y gate valve.jpg', desc: 'A flanged gate valve with a handwheel for controlling flow in fire-protection piping.' },
  { name: 'Outdoor Fire Hydrant', category: 'Fire Safety', img: '/images/products/fire-safety/Red fire hydrant stock image_ Image of department, painted - 1662587.jpg', desc: 'A freestanding red outdoor fire hydrant with capped hose outlets.' },
  { name: 'Fire Sprinkler Head', category: 'Fire Safety', img: '/images/products/fire-safety/scanline 3d model.jpg', desc: 'A pendent fire sprinkler head with a protective frame and heat-sensitive glass bulb.' },
  { name: 'Fire Hydrant and Sprinkler Equipment', category: 'Fire Safety', img: '/images/products/fire-safety/SHIVA FIRE INDIA → %23Firefighting company in Kolkata,(West Bengal)= Installation Ӏ fire hydrant systems, Sprinkler systems, fire alarm systems, equipment   supplier & AMC, Maintenance company in….jpg', desc: 'A collection of fire hydrant, sprinkler, alarm, and firefighting equipment.' },
  { name: 'Portable Emergency First Aid Kit', category: 'Fire Safety', img: '/images/products/fire-safety/Travel-First Aid-Kit Car-Home 300PCS Survival-Kit Outdoor-Adventure - Small Portable Red Emergency Essential Sets Office Hiking Camping Business Public Must Have First Aid Gear Equipment 1st Aid.jpg', desc: 'A compact travel first-aid kit with medical and emergency supplies for home, vehicle, or outdoor use.' },
  { name: 'Vertical Multistage Fire Pump', category: 'Fire Safety', img: '/images/products/fire-safety/vertical multistage fire pump.jpg', desc: 'A vertical multistage fire pump with an electric motor and inline pipe connections.' },
  { name: 'Fire Alarm Sounder and Strobe', category: 'Fire Safety', img: '/images/products/fire-safety/Whemenoc\'s System Sensor P241575 SpectrAlert….jpg', desc: 'A wall-mounted fire alarm sounder and strobe unit for audible and visual notification.' },
  { name: 'Wall-Mounted Automatic Hand Dryer', category: 'Hand Dryers', img: '/images/products/hand-dryers/hand-dryer-2.jpg', desc: 'A compact wall-mounted hand dryer with a light neutral finish and sensor-style front panel. Its slim profile is suited to washrooms where counter space is limited.' },
  { name: '24-Inch Heavy-Duty Pipe Wrench', category: 'Plumbing Products', img: '/images/products/plumbing/plumbing-6-1.jpg', desc: 'A long red adjustable pipe wrench with a heavy-duty handle and toothed jaw. The adjustable head grips pipe and fittings for plumbing and maintenance work.' },
  { name: '1-Inch Push-Fit Female Ball Valve', category: 'Plumbing Products', img: '/images/products/plumbing/plumbing-6-2.jpg', desc: 'A brass shut-off valve with a red lever and female threaded connection. The push-fit end is designed for a quick connection to compatible pipe.' },
  { name: '3/4-Inch Push-Fit Stop Valve with Drain', category: 'Plumbing Products', img: '/images/products/plumbing/plumbing-6-3.jpg', desc: 'A brass push-fit stop valve with a blue handwheel and integrated drain point. It is designed to shut off compatible plumbing lines and provide a convenient drain connection.' },
  { name: 'Smeg Four-Door Side-by-Side Fridge Freezer', category: 'Refrigerators', img: '/images/products/refrigerators/refrigerator-2-3.jpg', desc: 'A stainless-steel four-door refrigerator with a built-in water and ice dispenser. The wide side-by-side layout separates fresh-food and freezer storage for easy access.' },
  { name: 'Double-Door Stainless-Steel Refrigerator', category: 'Refrigerators', img: '/images/products/refrigerators/refrigerator-2-1.jpg', desc: 'A freestanding stainless-steel refrigerator with a top freezer and a lower fresh-food compartment. The two-door design provides separate access to everyday chilled and frozen items.' },
  { name: 'Brushed-Nickel Wall-Mount Kitchen Faucet', category: 'Water Taps', img: '/images/products/water-taps/tap-1.jpg', desc: 'A brushed-nickel wall-mounted kitchen faucet with a high-arc pull-down spray head and single control handle. Its flexible-looking sprayer is convenient for rinsing dishes and the sink.' },
  { name: 'Matte-Black Pull-Down Kitchen Faucet (Style 2)', category: 'Water Taps', img: '/images/products/water-taps/tap-3.jpg', desc: 'A contemporary black kitchen mixer with a high gooseneck spout and detachable spray head. The single-lever control keeps water adjustment simple at the sink.' },
  { name: 'Three-Way Kitchen Mixer Tap with Filter', category: 'Water Taps', img: '/images/products/water-taps/tap-2.jpg', desc: 'A polished chrome kitchen tap with a high swivel spout and separate controls for regular and filtered water. Combines multiple water outlets in one sink-mounted fitting.' },
  { name: 'Chrome High-Arc Basin Mixer Tap', category: 'Water Taps', img: '/images/products/water-taps/tap-4.jpg', desc: 'A modern chrome basin mixer with a tall curved spout and single lever. Its high-arc shape provides useful clearance above a bathroom basin.' },
  { name: 'Lusk Chrome Basin Mixer Tap', category: 'Water Taps', img: '/images/products/water-taps/tap-5.jpg', desc: 'A polished chrome basin mixer with a clean, angular body and single top-mounted lever. A simple contemporary fitting for a bathroom sink.' },
  { name: 'Gold Stainless-Steel Drinking-Water Filter Tap', category: 'Water Taps', img: '/images/products/water-taps/tap-6.jpg', desc: 'A slim gold-finish drinking-water tap with a high curved spout, shown mounted beside a kitchen sink. Its separate form suits setups with a dedicated filtered-water outlet.' },
  { name: 'Chrome Wall-Mounted ABS Water Tap', category: 'Water Taps', img: '/images/products/water-taps/tap-7.jpg', desc: 'A compact chrome-finish wall-mounted tap with a straight spout and top lever. Its simple shape works for utility, bathroom, or outdoor water points.' },
  { name: 'Chrome Wall-Mounted Dual-Spout Mixer Tap', category: 'Water Taps', img: '/images/products/water-taps/tap-8.jpg', desc: 'A wall-mounted chrome mixer tap with separate hot- and cold-water controls and a short downward spout. A practical choice for a bathroom or utility sink.' },
  { name: 'Outdoor CCTV Camera System Kit', category: 'Security Cameras', img: '/images/products/cameras/camera-3-2.jpg', desc: 'A multi-camera outdoor security kit shown with a recorder, cameras, cabling, and power accessories. Contact us to confirm the package contents and camera configuration.' },
  { name: 'Outdoor Bullet Security Camera', category: 'Security Cameras', img: '/images/products/cameras/camera-3-3.jpg', desc: 'A wall-mounted bullet-style security camera with a protective housing and adjustable mounting bracket. Its outdoor design is suited to monitoring entrances and perimeter areas.' },
  { name: 'Compact Household Tool Kit', category: 'Tools & Hardware', img: '/images/products/electronics/electronics-22-3.jpg', desc: 'A portable household tool set arranged in a compact carry case, with common hand tools held in fitted compartments for storage and easy access.' },
  { name: 'Wall-Mounted Automatic Hand Dryer (Style 2)', category: 'Hand Dryers', img: '/images/products/hand-dryers/hand-dryer-1.jpg', desc: 'A white wall-mounted hand dryer with a curved housing and automatic-sensor graphic on the front. Its compact shape is designed for shared washrooms.' },
  { name: 'Bottom-Freezer Refrigerator', category: 'Refrigerators', img: '/images/products/refrigerators/refrigerator-2-2.jpg', desc: 'A tall two-door refrigerator with a stainless-look finish and a lower freezer compartment. The separate lower drawer keeps frozen items apart from fresh-food storage.' },
].map((product, index) => ({ ...product, id: `catalog-${index + 1}`, price: null, quoteOnly: true }));

// ---- Category metadata (slug, display name, representative image) ----
const CATEGORIES = [
  { slug: 'bathtubs', name: 'Bathtubs', img: 'images/cat-bathtubs.jpg', count: 4 },
  { slug: 'bath-cabinets', name: 'Bath Cabinets', img: 'images/products/bath-cabinets/1.jpeg', count: 2 },
  { slug: 'mirrors', name: 'Mirrors', img: 'images/cat-mirrors.jpg', count: 6 },
  { slug: 'refrigerators', name: 'Refrigerators', img: 'images/cat-refrigerators.jpg', count: 1 },
  { slug: 'gas-cookers', name: 'Gas Cookers', img: 'images/products/gas-cookers/1.jpg', count: 1 },
  { slug: 'cameras', name: 'Security Cameras', img: 'images/products/cameras/1.jpg', count: 2 },
  { slug: 'camera-accessories', name: 'Camera & Studio Accessories', img: 'images/products/camera-accessories/1.jpeg', count: 1 },
  { slug: 'televisions', name: 'Televisions', img: 'images/products/televisions/1.jpg', count: 2 },
  { slug: 'switches-sockets', name: 'Switches & Sockets', img: 'images/products/switches-sockets/1.jpeg', count: 3 },
  { slug: 'solar-heaters', name: 'Solar Water Heaters', img: 'images/products/solar-heaters/1.jpg', count: 2 },
  { slug: 'toilets', name: 'Toilets & Urinals', img: 'images/products/toilets/1.jpeg', count: 7 },
  { slug: 'plumbing', name: 'Plumbing Products', img: 'images/products/plumbing/1.jpeg', count: 5 },
  { slug: 'bathroom-accessories', name: 'Bathroom Accessories', img: 'images/products/bathroom-accessories/1.jpeg', count: 7 },
  { slug: 'shower-enclosures', name: 'Shower Enclosures', img: '/images/products/bath/bath-1-5.jpg', count: 0 },
  { slug: 'tools-hardware', name: 'Tools & Hardware', img: '/images/products/electronics/electronics-22-1.jpg', count: 0 },
  { slug: 'fire-safety', name: 'Fire Safety', img: '/images/products/fire-safety/fire-1.jpg', count: 0 },
  { slug: 'hand-dryers', name: 'Hand Dryers', img: '/images/products/hand-dryers/hand-dryer-2.jpg', count: 0 },
  { slug: 'water-taps', name: 'Water Taps', img: '/images/products/water-taps/tap-2.jpg', count: 0 },
  { slug: 'lighting', name: 'Lighting', img: 'images/cat-lighting.jpg', count: 21 },
  { slug: 'electronics', name: 'Electronics', img: 'images/cat-electronics.jpg', count: 21 },
];
const SHOP_PRODUCTS = PRODUCTS.concat(CATALOG_ONLY_PRODUCTS);
CATEGORIES.forEach(category => {
  category.count = SHOP_PRODUCTS.filter(product => product.category === category.name).length;
});

// ---- Featured products (curated picks shown on homepage, span multiple categories) ----
const FEATURED_IDS = ['p1', 'p35', 'p13', 'p8', 'p83', 'p14'];
const FEATURED_PRODUCTS = FEATURED_IDS.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

// Combined lookup used by the product detail page (FEATURED_PRODUCTS is already a subset of PRODUCTS)
const ALL_PRODUCTS = SHOP_PRODUCTS;

// Returns a real <img> if the product has a photo, otherwise falls back to the SVG placeholder
function productThumbHTML(p) {
  return p.img
    ? `<img class="product-image" src="${p.img}" alt="${p.name}">`
    : `<div class="placeholder-img">${tubIconSVG()}</div>`;
}

function tubIconSVG() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M3 12h18M5 12V9a2 2 0 0 1 2-2h1M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>
    <circle cx="16" cy="6" r="1.5"/></svg>`;
}

document.addEventListener('error', (event) => {
  const image = event.target;
  if (image.tagName !== 'IMG' || !image.classList.contains('product-image')) return;

  const fallback = document.createElement('div');
  fallback.className = 'placeholder-img';
  fallback.setAttribute('role', 'img');
  fallback.setAttribute('aria-label', image.alt || 'Product image unavailable');
  fallback.innerHTML = blogIconSVG();
  image.replaceWith(fallback);
}, true);

function productCardHTML(p) {
  const productLink = `product.html?id=${p.id}`;
  const action = `<a href="#" class="btn btn-primary btn-small add-to-cart" data-id="${p.id}" data-name="${p.name}" data-price="${p.price ?? ''}">ADD TO CART</a>`;
  return `
    <div class="prod-card">
      <a href="${productLink}" class="thumb">${productThumbHTML(p)}</a>
      <div class="prod-info">
        <span class="prod-cat">${p.category}</span>
        <h4><a href="${productLink}">${p.name}</a></h4>
        ${action}
      </div>
    </div>
  `;
}

// ==================================================================
// SHOP / CATEGORY PAGE (category.html?cat=slug&min=&max=&q=&sort=)
// ==================================================================
const MAX_PRODUCT_PRICE = Math.ceil(Math.max(...PRODUCTS.map(p => p.price)) / 100) * 100;

function currentSort() {
  const sel = document.getElementById('sortSelect');
  return sel ? sel.value : 'newest';
}

// Reads the live filter state from the DOM controls (checkboxes + price inputs)
function readFilterState() {
  const checked = Array.from(document.querySelectorAll('#catFilterList input[type="checkbox"]:checked')).map(cb => cb.value);
  const minEl = document.getElementById('priceMin');
  const maxEl = document.getElementById('priceMax');
  const min = minEl && minEl.value !== '' ? Number(minEl.value) : 0;
  const max = maxEl && maxEl.value !== '' ? Number(maxEl.value) : MAX_PRODUCT_PRICE;
  return { cats: checked, min, max };
}

function renderProducts() {
  const grid = document.getElementById('prodGrid');
  if (!grid) return; // not on category.html

  const params = new URLSearchParams(window.location.search);
  const query = (params.get('q') || '').trim().toLowerCase();
  const { cats, min, max } = readFilterState();
  const activeNames = CATEGORIES.filter(c => cats.includes(c.slug)).map(c => c.name);

  let list = SHOP_PRODUCTS.slice();
  if (activeNames.length) {
    list = list.filter(p => activeNames.includes(p.category));
  }
  list = list.filter(p => p.quoteOnly || (p.price >= min && p.price <= max));
  if (query) {
    list = list.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
  }

  const sort = currentSort();
  if (sort === 'price-asc') list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  else if (sort === 'price-desc') list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));

  // Page heading / breadcrumb / document title
  const headingEl = document.getElementById('shopHeading');
  const crumbEl = document.getElementById('shopCrumb');
  const titleTag = document.getElementById('shopTitleTag');
  const label = activeNames.length === 1 ? activeNames[0] : (query ? `Search: "${params.get('q')}"` : 'All Products');
  if (headingEl) headingEl.textContent = label;
  if (crumbEl) crumbEl.innerHTML = (activeNames.length || query) ? `<a href="/">Home</a> &gt; <a href="category.html">Shop</a> &gt; ${label}` : `<a href="/">Home</a> &gt; Shop`;
  const seoTitle = `${label} | Japonais Business Group`;
  if (titleTag) titleTag.textContent = seoTitle;
  const seoDescription = activeNames.length
    ? `Browse ${activeNames.join(', ')} products from Japonais Business Group in Rwanda.`
    : query
      ? `Search Japonais Business Group products for ${params.get('q')}.`
      : 'Browse the full range of products from Japonais Business Group in Rwanda.';
  const canonicalCategory = cats.length ? `?cat=${encodeURIComponent(cats.slice().sort().join(','))}` : '';
  updateSeoMetadata(seoDescription, `/category.html${canonicalCategory}`);

  const countEl = document.getElementById('resultCount');
  if (countEl) countEl.textContent = `Showing ${list.length} of ${SHOP_PRODUCTS.length} results`;

  grid.innerHTML = list.length
    ? list.map(productCardHTML).join('')
    : `<p style="grid-column:1/-1;color:var(--gray-text);padding:40px 0;text-align:center;">No products match these filters. Try clearing some and searching again.</p>`;

  // Keep the URL shareable/bookmarkable without reloading the page
  const url = new URL(window.location.href);
  if (cats.length) url.searchParams.set('cat', cats.join(',')); else url.searchParams.delete('cat');
  if (min > 0) url.searchParams.set('min', min); else url.searchParams.delete('min');
  if (max < MAX_PRODUCT_PRICE) url.searchParams.set('max', max); else url.searchParams.delete('max');
  window.history.replaceState({}, '', url.toString());
}

// Builds the category checkbox list once, pre-checking whatever is in the URL
function initCategorySidebar() {
  const el = document.getElementById('catFilterList');
  if (!el) return; // not on category.html

  const params = new URLSearchParams(window.location.search);
  const activeSlugs = (params.get('cat') || '').split(',').filter(Boolean);

  el.innerHTML = CATEGORIES.map(c => `
    <li>
      <input type="checkbox" id="cb-${c.slug}" value="${c.slug}" ${activeSlugs.includes(c.slug) ? 'checked' : ''}>
      <label for="cb-${c.slug}" class="${activeSlugs.includes(c.slug) ? 'active-filter' : ''}">${c.name} <span>(${c.count})</span></label>
    </li>
  `).join('');

  el.addEventListener('change', (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      e.target.nextElementSibling.classList.toggle('active-filter', e.target.checked);
      renderProducts();
    }
  });
}

// Wires the price range slider + min/max number inputs together
function initPriceFilter() {
  const range = document.getElementById('priceRange');
  const minEl = document.getElementById('priceMin');
  const maxEl = document.getElementById('priceMax');
  const label = document.getElementById('priceRangeLabel');
  if (!range || !minEl || !maxEl) return; // not on category.html

  const params = new URLSearchParams(window.location.search);
  const urlMin = params.get('min');
  const urlMax = params.get('max');

  range.max = MAX_PRODUCT_PRICE;
  range.value = urlMax ? Number(urlMax) : MAX_PRODUCT_PRICE;
  maxEl.placeholder = String(MAX_PRODUCT_PRICE);
  if (urlMin) minEl.value = urlMin;
  if (urlMax) maxEl.value = urlMax;
  if (label) label.textContent = `Up to $${Number(range.value).toLocaleString()}`;

  range.addEventListener('input', () => {
    maxEl.value = range.value;
    if (label) label.textContent = `Up to $${Number(range.value).toLocaleString()}`;
    renderProducts();
  });
  maxEl.addEventListener('input', () => {
    const v = maxEl.value === '' ? MAX_PRODUCT_PRICE : Number(maxEl.value);
    range.value = Math.min(v, MAX_PRODUCT_PRICE);
    if (label) label.textContent = `Up to $${Number(range.value).toLocaleString()}`;
    renderProducts();
  });
  minEl.addEventListener('input', renderProducts);
}

// Re-render the grid when the sort dropdown, search form, or "clear all" button is used
document.addEventListener('DOMContentLoaded', () => {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.addEventListener('change', renderProducts);

  const shopSearch = document.getElementById('shopSearchForm');
  if (shopSearch) {
    // Pre-fill the search box if a ?q= is already in the URL (e.g. from another page)
    const params = new URLSearchParams(window.location.search);
    const qInput = document.getElementById('shopSearchInput');
    if (qInput && params.get('q')) qInput.value = params.get('q');

    shopSearch.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = document.getElementById('shopSearchInput').value.trim();
      const url = new URL(window.location.href);
      if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
      window.history.replaceState({}, '', url.toString());
      renderProducts();
    });
  }

  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      document.querySelectorAll('#catFilterList input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
        cb.nextElementSibling.classList.remove('active-filter');
      });
      const minEl = document.getElementById('priceMin');
      const maxEl = document.getElementById('priceMax');
      const range = document.getElementById('priceRange');
      const label = document.getElementById('priceRangeLabel');
      if (minEl) minEl.value = '';
      if (maxEl) maxEl.value = '';
      if (range) range.value = MAX_PRODUCT_PRICE;
      if (label) label.textContent = `Up to $${MAX_PRODUCT_PRICE.toLocaleString()}`;
      const qInput = document.getElementById('shopSearchInput');
      if (qInput) qInput.value = '';
      const url = new URL(window.location.href);
      url.search = '';
      window.history.replaceState({}, '', url.toString());
      renderProducts();
    });
  }
});

// ==================================================================
// HOMEPAGE: category grid + featured products
// ==================================================================
function renderCategoryGrid() {
  const grid = document.getElementById('catGrid');
  if (!grid) return; // not on index.html
  grid.innerHTML = CATEGORIES.slice(0, 10).map(c => `
    <a href="category.html?cat=${c.slug}" class="cat-card">
      <div class="thumb"><img src="${c.img}" alt="${c.name}"></div>
      <h3>${c.name.toUpperCase()}</h3><span class="shop-now">Shop Now &rarr;</span>
    </a>
  `).join('');
}

function renderFeaturedProducts() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return; // not on index.html
  grid.innerHTML = FEATURED_PRODUCTS.map(productCardHTML).join('');
}

// ==================================================================
// PRODUCT DETAIL PAGE (product.html?id=...)
// ==================================================================
function renderProductPage() {
  const titleEl = document.getElementById('pTitleHead');
  if (!titleEl) return; // not on product.html

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const product = ALL_PRODUCTS.find(p => p.id === productId) || ALL_PRODUCTS[0];

  const duplicateName = ALL_PRODUCTS.some(item => item.id !== product.id && item.name === product.name);
  const seoTitle = `${product.name}${duplicateName ? ` | ${product.category} ${product.id}` : ''} | Japonais Business Group`;
  document.getElementById('pTitleTag').textContent = seoTitle;
  updateSeoMetadata(product.desc, `/product.html?id=${encodeURIComponent(product.id)}`);
  titleEl.textContent = product.name;
  document.getElementById('pCrumb').textContent = product.name;
  document.getElementById('pCategory').textContent = product.category;
  const priceEl = document.getElementById('pPrice');
  if (priceEl) priceEl.remove();
  document.getElementById('pDesc').textContent = product.desc;
  document.getElementById('pGalleryThumb').innerHTML = productThumbHTML(product);

  const addBtn = document.getElementById('pAddToCart');
  addBtn.dataset.id = product.id;
  addBtn.dataset.name = product.name;
  addBtn.dataset.price = product.price;

  // Qty stepper
  const qtyInput = document.getElementById('pQty');
  document.getElementById('pQtyDec').addEventListener('click', () => {
    qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
  });
  document.getElementById('pQtyInc').addEventListener('click', () => {
    qtyInput.value = Number(qtyInput.value) + 1;
  });

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const qty = Math.max(1, Number(qtyInput.value) || 1);
    for (let i = 0; i < qty; i++) addToCart(product.id, product.name, product.price);
    const original = addBtn.textContent;
    addBtn.textContent = 'ADDED ✓';
    setTimeout(() => { addBtn.textContent = original; }, 1200);
  });

  // Related products: same category, excluding the current one
  const relatedEl = document.getElementById('relatedGrid');
  if (relatedEl) {
    const related = ALL_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    relatedEl.innerHTML = related.map(p => `
      <div class="prod-card">
        <a href="product.html?id=${p.id}" class="thumb">${productThumbHTML(p)}</a>
        <div class="prod-info">
          <h4><a href="product.html?id=${p.id}">${p.name}</a></h4>
          <a href="#" class="btn btn-primary btn-small add-to-cart" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}">ADD TO CART</a>
        </div>
      </div>
    `).join('');
  }
}

// ==================================================================
// CART SYSTEM (persisted to localStorage under 'jbg_cart')
// ==================================================================
const CART_KEY = 'jbg_cart';

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
  renderCartPage();
}

function addToCart(id, name, price) {
  const cart = getCart();
  const itemPrice = price === null || price === '' || price === 'null' ? null : Number(price);
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price: itemPrice, qty: 1 });
  }
  saveCart(cart);
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    saveCart(cart.filter(i => i.id !== id));
  } else {
    saveCart(cart);
  }
}

function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
}

function cartTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = subtotal === 0 ? 0 : (subtotal >= 1000 ? 0 : 25);
  return { subtotal, delivery, total: subtotal + delivery };
}

function updateCartCount() {
  const count = getCart().reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
}

// Delegate clicks on every "Add to Cart" button, site-wide
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.add-to-cart');
  if (!btn) return;
  e.preventDefault();
  addToCart(btn.dataset.id, btn.dataset.name, btn.dataset.price);
  const original = btn.textContent;
  btn.textContent = 'ADDED ✓';
  setTimeout(() => { btn.textContent = original; }, 1200);
});

function renderCartPage() {
  const rowsEl = document.getElementById('cartRows');
  const emptyEl = document.getElementById('cartEmpty');
  const fullEl = document.getElementById('cartFull');
  if (!rowsEl || !emptyEl || !fullEl) return; // not on cart.html

  const cart = getCart();

  if (cart.length === 0) {
    emptyEl.hidden = false;
    fullEl.hidden = true;
    return;
  }

  emptyEl.hidden = true;
  fullEl.hidden = false;

  rowsEl.innerHTML = cart.map(item => {
    const product = ALL_PRODUCTS.find(p => p.id === item.id);
    const thumbHTML = product ? productThumbHTML(product) : `<div class="placeholder-img">${tubIconSVG()}</div>`;
    return `
    <tr>
      <td>
        <div class="cart-prod">
          <div class="thumb">${thumbHTML}</div>
          <h4>${item.name}</h4>
        </div>
      </td>
      <td>
        <div class="qty-control">
          <button type="button" data-action="dec" data-id="${item.id}">&minus;</button>
          <span>${item.qty}</span>
          <button type="button" data-action="inc" data-id="${item.id}">&plus;</button>
        </div>
      </td>
      <td><button type="button" class="remove-btn" data-action="remove" data-id="${item.id}">Remove</button></td>
    </tr>
  `;
  }).join('');

  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const countEl = document.getElementById('sumItemCount');
  if (countEl) countEl.textContent = itemCount;
}

// ==================================================================
// CHECKOUT PAGE (checkout.html)
// ==================================================================
function renderCheckoutSummary() {
  const rowsEl = document.getElementById('checkoutRows');
  if (!rowsEl) return; // not on checkout.html

  const cart = getCart();

  // If the cart is empty, send the shopper back to shop instead of showing a blank checkout
  if (cart.length === 0) {
    document.getElementById('checkoutEmpty').hidden = false;
    document.getElementById('checkoutFull').hidden = true;
    return;
  }
  document.getElementById('checkoutEmpty').hidden = true;
  document.getElementById('checkoutFull').hidden = false;

  rowsEl.innerHTML = cart.map(item => `
    <div class="checkout-line">
      <span class="ci-name">${item.name} <span class="ci-qty">&times;${item.qty}</span></span>
    </div>
  `).join('');
}

function wireCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  if (!form) return; // not on checkout.html

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const cart = getCart();
    if (cart.length === 0) return;

    // Validate form fields
    const name = document.getElementById('coName')?.value || '';
    const phone = document.getElementById('coPhone')?.value || '';
    const email = document.getElementById('coEmail')?.value || '';
    const address = document.getElementById('coAddress')?.value || '';
    const city = document.getElementById('coCity')?.value || '';
    const note = document.getElementById('coNote')?.value || '';

    if (!name || !phone || !email || !address || !city) {
      alert('Please fill in all required delivery details.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) { submitBtn.textContent = 'SENDING...'; submitBtn.disabled = true; }

    // No pricing is sent — this is a request/inquiry, not a priced order.
    // The team calls or emails the customer back to confirm pricing.
    const requestPayload = {
      customer: { name, phone, email, address, city, note },
      items: cart.map(i => ({ id: i.id, name: i.name, qty: i.qty })),
      paymentMethod: 'call-to-confirm'
    };

    let orderId = 'JBG-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    try {
      const { response, result } = await postJson('/api/orders', requestPayload);
      if (response.ok && result?.order?.id) {
        orderId = result.order.id;
      } else if (!response.ok) {
        console.warn('Order backend responded with an error:', result);
      }
    } catch (error) {
      console.warn('Backend unreachable, request kept locally only:', error);
    }

    // Keep a local copy too, purely for the customer's own reference
    localStorage.setItem('jbg_last_order', JSON.stringify({
      id: orderId,
      timestamp: new Date().toISOString(),
      customer: { name, phone, email, address, city, note },
      items: cart
    }));

    if (submitBtn) { submitBtn.textContent = originalBtnText; submitBtn.disabled = false; }

    // Display confirmation screen
    document.getElementById('checkoutForm').hidden = true;
    document.querySelector('.checkout-summary').hidden = true;
    const confirmEl = document.getElementById('orderConfirm');
    confirmEl.hidden = false;
    confirmEl.querySelector('.order-number').textContent = orderId;

    saveCart([]);
  });
}

// Delegate qty/remove buttons inside the cart table
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const { action, id } = btn.dataset;
  if (action === 'inc') changeQty(id, 1);
  if (action === 'dec') changeQty(id, -1);
  if (action === 'remove') removeFromCart(id);
});

// ==================================================================
// BLOG
// ==================================================================
const BLOG_POSTS = [
  {
    id: 'choosing-bathtub',
    tag: 'BUYING GUIDE',
    title: 'How to Choose the Right Bathtub for Your Bathroom',
    excerpt: 'Freestanding, built-in, or corner — here is how to pick a tub that fits your space, budget, and daily routine.',
    date: 'Jun 28, 2026',
    author: 'JBG Team',
    image: 'images/blog/1.jpeg',
    body: [
      'Choosing a bathtub is about more than looks. Start by measuring your bathroom carefully, leaving enough clearance for doors, vanities, and comfortable movement around the tub.',
      'Freestanding tubs make a strong visual statement and work well in larger bathrooms, while built-in and corner tubs are better suited to compact spaces where every inch counts.',
      'Material matters too. Acrylic tubs are lightweight and retain heat well, ceramic offers a classic finish at a lower price point, and marble delivers a premium look for those willing to invest.',
      'Finally, think about maintenance. Non-porous finishes resist staining and are easier to clean, which matters most in busy, shared bathrooms.'
    ]
  },
  {
    id: 'lighting-tips',
    tag: 'HOME TIPS',
    title: '5 Lighting Tips to Transform Any Room',
    excerpt: 'Layered lighting can completely change how a room feels. Here are five practical tips our design team swears by.',
    date: 'Jun 15, 2026',
    author: 'JBG Team',
    image: 'images/blog/2.jpeg',
    body: [
      'Good lighting is layered lighting. Combine ambient, task, and accent light sources rather than relying on a single overhead fixture.',
      'Warm white bulbs (around 2700K–3000K) feel cozy in living spaces, while cooler tones suit kitchens and workspaces where focus matters.',
      'Dimmers are one of the most affordable upgrades you can make — they let a single fixture serve both bright, functional light and softer evening moods.',
      'Don\u2019t forget scale: a pendant or chandelier should be sized to the room, not just the table beneath it.'
    ]
  },
  {
    id: 'fridge-maintenance',
    tag: 'MAINTENANCE',
    title: 'Refrigerator Maintenance: 6 Habits That Extend Its Life',
    excerpt: 'Simple, regular habits that keep your refrigerator running efficiently for years and lower your electricity bill.',
    date: 'May 30, 2026',
    author: 'JBG Team',
    image: 'images/blog/3.jpeg',
    body: [
      'Vacuum the condenser coils twice a year. Dust buildup forces the compressor to work harder, which shortens its lifespan and raises energy use.',
      'Keep the door seals clean and check them regularly — a loose or dirty gasket lets cold air escape without you noticing.',
      'Set the temperature correctly: around 4°C for the fridge and -18°C for the freezer is the sweet spot for both food safety and efficiency.',
      'Give food room to breathe. An overpacked fridge blocks airflow and makes the compressor cycle more often than it needs to.'
    ]
  },
  {
    id: 'mirror-styling',
    tag: 'DESIGN',
    title: 'Mirror Styling: Small Room, Big Impact',
    excerpt: 'The right mirror can make a small bathroom or hallway feel twice its size. Here is how to choose and place one.',
    date: 'May 12, 2026',
    author: 'JBG Team',
    image: 'images/blog/4.jpeg',
    body: [
      'Placement matters as much as shape. A mirror positioned opposite a window will bounce natural light deeper into the room.',
      'Round and oval mirrors soften a space full of straight lines, while rectangular mirrors reinforce a more architectural, modern look.',
      'Backlit LED mirrors add functional light for grooming while doubling as a stylish focal point above the sink.',
      'Scale the mirror to roughly two-thirds the width of the vanity or console beneath it for the most balanced look.'
    ]
  },
  {
    id: 'appliance-buying',
    tag: 'BUYING GUIDE',
    title: 'What to Check Before Buying a Home Appliance',
    excerpt: 'A short checklist to run through before you commit to a new fridge, washer, or any major home appliance.',
    date: 'Apr 22, 2026',
    author: 'JBG Team',
    image: 'images/blog/5.jpeg',
    body: [
      'Measure twice: check not just the appliance footprint, but also doorway and hallway widths along the delivery path.',
      'Compare energy ratings. A slightly higher upfront cost on an efficient model is often recovered within a couple of years of lower bills.',
      'Ask about warranty coverage and where local servicing is available before you buy, not after something breaks.',
      'Read the noise rating if the appliance will run near a bedroom or living space — decibel levels vary more than people expect.'
    ]
  },
  {
    id: 'bathroom-trends',
    tag: 'TRENDS',
    title: 'Bathroom Design Trends We\u2019re Loving Right Now',
    excerpt: 'From matte black fixtures to freestanding tubs, here is what is shaping modern bathroom design this year.',
    date: 'Apr 3, 2026',
    author: 'JBG Team',
    image: 'images/blog/6.jpeg',
    body: [
      'Matte black fixtures continue to dominate, offering a bold contrast against light tile and stone surfaces.',
      'Freestanding tubs remain the centerpiece of aspirational bathroom design, often paired with a floor-mounted filler.',
      'Warm, natural materials — wood vanities, woven textures, and stone basins — are softening what used to be an all-white, clinical look.',
      'Smart mirrors with integrated lighting and demisting features are moving from luxury add-on to a mainstream expectation.'
    ]
  }
];

function blogIconSVG() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15l5-5 4 4 5-6 4 5"/></svg>`;
}

function renderBlogGrid() {
  const grid = document.getElementById('blogGrid');
  if (!grid) return;
  grid.innerHTML = BLOG_POSTS.map(post => `
    <article class="blog-card">
      <div class="thumb">
        ${post.image
          ? `<img src="${post.image}" alt="${post.title}">`
          : `<div class="placeholder-img">${blogIconSVG()}</div>`}
      </div>
      <div class="body">
        <span class="tag">${post.tag}</span>
        <h3><a href="blog-post.html?post=${post.id}">${post.title}</a></h3>
        <p>${post.excerpt}</p>
        <div class="meta">
          <span>${post.date}</span>
          <a class="read-more" href="blog-post.html?post=${post.id}">Read More &rarr;</a>
        </div>
      </div>
    </article>
  `).join('');

  initBlogPagination();
}

function initBlogPagination() {
  document.querySelectorAll('.pagination a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.textContent.trim();
      if (page === '→') return;
      window.location.hash = `page-${page}`;
      document.getElementById('blogGrid')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function renderBlogPost() {
  const bodyEl = document.getElementById('postBody');
  if (!bodyEl) return; // not on blog-post.html

  const params = new URLSearchParams(window.location.search);
  const postId = params.get('post');
  const post = BLOG_POSTS.find(p => p.id === postId) || BLOG_POSTS[0];

  document.getElementById('postTitleTag').textContent = `${post.title} | Japonais Business Group Blog`;
  updateSeoMetadata(post.excerpt, `/blog-post.html?post=${encodeURIComponent(post.id)}`);
  document.getElementById('postTitleHead').textContent = post.title;
  document.getElementById('postCrumb').textContent = post.title;
  document.getElementById('postMeta').textContent = `By ${post.author} · ${post.date}`;

  const heroEl = document.getElementById('postHero');
  if (heroEl) {
    heroEl.innerHTML = post.image
      ? `<img src="${post.image}" alt="${post.title}">`
      : `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15l5-5 4 4 5-6 4 5"/></svg>`;
  }

  bodyEl.innerHTML = post.body.map(p => `<p>${p}</p>`).join('');
}

function getApiBaseUrl() {
  const configured = localStorage.getItem('jbg_api_base');
  if (configured) return configured.replace(/\/$/, '');

  const { protocol, hostname, port } = window.location;
  if (hostname === '127.0.0.1' || hostname === 'localhost') {
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
  }

  return 'http://127.0.0.1:5000';
}

async function postJson(endpoint, payload) {
  const url = `${getApiBaseUrl()}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  let result = {};
  try {
    result = await response.json();
  } catch (error) {
    result = {};
  }

  return { response, result };
}

// ==================================================================
// CONTACT FORM
// ==================================================================
function wireNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  const emailEl = document.getElementById('newsletterEmail');
  const status = document.getElementById('newsletterStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!emailEl) return;
    const email = (emailEl.value || '').trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (status) { status.textContent = 'Please enter a valid email address.'; status.style.color = '#c0392b'; }
      return;
    }

    const KEY = 'jbg_newsletter';
    const list = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (list.find(i => i.email === email)) {
      if (status) { status.textContent = 'You are already subscribed.'; status.style.color = '#27ae60'; }
      return;
    }

    list.push({ email, subscribedAt: new Date().toISOString() });
    localStorage.setItem(KEY, JSON.stringify(list));
    if (status) { status.textContent = 'Thanks — you are subscribed!'; status.style.color = '#27ae60'; }
    emailEl.value = '';

    // Try to notify backend if available (optional)
    try {
      await postJson('/api/newsletter', { email });
    } catch (err) {
      // ignore - offline/local fallback
    }
  });
}

function wireContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('formStatus');

    const payload = {
      name: document.getElementById('cName')?.value || '',
      email: document.getElementById('cEmail')?.value || '',
      phone: document.getElementById('cPhone')?.value || '',
      subject: document.getElementById('cSubject')?.value || '',
      message: document.getElementById('cMessage')?.value || ''
    };

    status.textContent = 'Sending...';

    try {
      const { response, result } = await postJson('/api/contact', payload);
      if (!response.ok) {
        status.textContent = result.error || 'Unable to send your message right now.';
        return;
      }

      status.textContent = result.message || 'Thanks! Your message has been sent.';
      if (response.ok) form.reset();
    } catch (error) {
      status.textContent = 'Backend is not reachable. Please start the Python server and open the site at http://127.0.0.1:5000';
    }
  });
}

  document.querySelectorAll('form.search-bar').forEach(form => {
    if (form.id === 'shopSearchForm') return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="text"]');
      const q = input ? input.value.trim() : '';
      if (!q) return;
      window.location.href = `category.html?q=${encodeURIComponent(q)}`;
    });
  });