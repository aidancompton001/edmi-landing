/**
 * EDMI Data Verification Script (ЖЕЛЕЗНОЕ ПРАВИЛО)
 * Verifies all prices, product names, URLs, and contact data
 * in variant-d.html against the approved design document.
 */

const fs = require('fs');

// ===== SOURCE OF TRUTH (from design doc) =====
const MICROSCOPES = [
  { name: 'Zeiss EXTARO 300 Premium Package', price: 47564, brand: 'Zeiss' },
  { name: 'Zeiss EXTARO 300 Classic+ Package', price: 39643, brand: 'Zeiss' },
  { name: 'Zeiss EXTARO 300 Essential Package', price: 31737, brand: 'Zeiss' },
  { name: 'CJ-Optik Flexion TWIN', price: 25000, brand: 'CJ-Optik' },
  { name: 'CJ-Optik Flexion TWIN lite', price: 21900, brand: 'CJ-Optik' },
  { name: 'CJ-Optik Flexion Advanced SensorUnit', price: 20100, brand: 'CJ-Optik' },
  { name: 'CJ-Optik Flexion Advanced', price: 19200, brand: 'CJ-Optik' },
];

const ACCESSORIES = [
  { name: '\u0410\u0434\u0430\u043f\u0442\u0435\u0440 4K-Imaging-Port', price: 1760 },
  { name: '\u0410\u0434\u0430\u043f\u0442\u0435\u0440 HD-Imaging-Port', price: 1667 },
  { name: '\u0410\u0434\u0430\u043f\u0442\u0435\u0440 Phone-Imaging-Port', price: 2223 },
  { name: 'Beam Splitter CJ 50:50', price: 1185 },
  { name: '\u0412\u0430\u0440\u0456\u043e\u0444\u043e\u043a\u0443\u0441 200-350mm', price: 2500 },
  { name: '\u0414\u0436\u0435\u0440\u0435\u043b\u043e LED CJ Retrofit CZ OPMI Pico', price: 2050 },
  { name: '\u041a\u0443\u0442\u043e\u0432\u0438\u0439 \u0434\u0456\u043b\u044c\u043d\u0438\u043a 30\u00b0 ergo tube double 50:50', price: 1815 },
  { name: '\u041a\u0443\u0442\u043e\u0432\u0438\u0439 \u0434\u0456\u043b\u044c\u043d\u0438\u043a 30\u00b0 ergo tube left 50:50', price: 1686 },
  { name: '\u041a\u0443\u0442\u043e\u0432\u0438\u0439 \u0434\u0456\u043b\u044c\u043d\u0438\u043a 30\u00b0 ergo tube right 50:50', price: 1686 },
  { name: '\u041b\u0430\u043c\u043f\u0430 \u0433\u0430\u043b\u043e\u0433\u0435\u043d\u043d\u0430 Osram 100W 12V', price: 15 },
  { name: '\u041b\u0430\u043c\u043f\u0438 Dr.Fischer 12V 50W Wild', price: 54 },
];

const CONTACTS = {
  phone: '+38 (067) 000-24-67',
  email: 'office@edmi.dental',
  address: '\u0406\u0432\u0430\u043d\u043e-\u0424\u0440\u0430\u043d\u043a\u0456\u0432\u0441\u044c\u043a',
  schedule: '\u041f\u043d-\u041f\u0442 9:00-17:00',
  facebook: 'facebook.com/edmidental',
  instagram: 'instagram.com/edmi.dental',
};

const IMAGES = [
  'extaro-300-premium.png',
  'extaro-300-essential.png',
  'extaro-300-mora.png',
  'cj-optik-flexion-twin.jpg',
  'cj-optik-flexion-twin-lite.jpg',
  'cj-optik-flexion-advanced-sensorunit.jpg',
  'cj-optik-flexion-advanced.jpg',
];

// ===== READ HTML =====
const html = fs.readFileSync('c:/Projects/EDMI/apps/landing/variant-d.html', 'utf8');
let errors = 0;
let warnings = 0;
let passed = 0;

function check(condition, msg) {
  if (condition) {
    console.log('  OK ' + msg);
    passed++;
  } else {
    console.log('  FAIL: ' + msg);
    errors++;
  }
}

// ===== 1. MICROSCOPE PRICES =====
console.log('\n=== MICROSCOPE PRICES ===');
const pricePattern = /\u20ac([\d\s]+)/g;
const pricesInHTML = [];
let m;
while ((m = pricePattern.exec(html)) !== null) {
  const price = parseInt(m[1].replace(/\s/g, ''));
  pricesInHTML.push(price);
}

console.log('  Found ' + pricesInHTML.length + ' prices in HTML');
check(pricesInHTML.length === MICROSCOPES.length + ACCESSORIES.length,
  'Total prices count: ' + pricesInHTML.length + ' (expected ' + (MICROSCOPES.length + ACCESSORIES.length) + ')');

MICROSCOPES.forEach((mic, i) => {
  const htmlPrice = pricesInHTML[i];
  check(htmlPrice === mic.price,
    mic.name + ': HTML ' + htmlPrice + ' vs expected ' + mic.price);
});

// Check prices are in descending order (microscopes)
console.log('\n=== MICROSCOPE PRICE ORDER ===');
const micPrices = pricesInHTML.slice(0, 7);
let isDescending = true;
for (let i = 1; i < micPrices.length; i++) {
  if (micPrices[i] > micPrices[i - 1]) isDescending = false;
}
check(isDescending, 'Microscope prices descending: ' + micPrices.join(' > '));

// ===== 2. ACCESSORY PRICES =====
console.log('\n=== ACCESSORY PRICES ===');
ACCESSORIES.forEach((acc, i) => {
  const htmlPrice = pricesInHTML[MICROSCOPES.length + i];
  check(htmlPrice === acc.price,
    acc.name + ': HTML ' + htmlPrice + ' vs expected ' + acc.price);
});

// ===== 3. PRODUCT NAMES IN HTML =====
console.log('\n=== PRODUCT NAMES ===');
// In HTML, names are displayed without brand prefix AND without "Package" suffix
// because brand is shown separately in .product-brand element
MICROSCOPES.forEach(mic => {
  const shortName = mic.name.replace('Zeiss ', '').replace('CJ-Optik ', '').replace(' Package', '');
  check(html.includes(shortName), 'Name found: "' + shortName + '"');
});

ACCESSORIES.forEach(acc => {
  check(html.includes(acc.name), 'Accessory found: "' + acc.name + '"');
});

// ===== 4. CONTACT DATA =====
console.log('\n=== CONTACTS ===');
check(html.includes(CONTACTS.phone), 'Phone: ' + CONTACTS.phone);
check(html.includes(CONTACTS.email), 'Email: ' + CONTACTS.email);
check(html.includes(CONTACTS.address), 'Address contains: ' + CONTACTS.address);
check(html.includes(CONTACTS.schedule), 'Schedule: ' + CONTACTS.schedule);
check(html.includes(CONTACTS.facebook), 'Facebook: ' + CONTACTS.facebook);
check(html.includes(CONTACTS.instagram), 'Instagram: ' + CONTACTS.instagram);

// ===== 5. IMAGE FILES EXIST =====
console.log('\n=== IMAGE FILES ===');
const imgDir = 'c:/Projects/EDMI/apps/landing/public/images/products/';
IMAGES.forEach(img => {
  const exists = fs.existsSync(imgDir + img);
  const size = exists ? fs.statSync(imgDir + img).size : 0;
  check(exists && size > 0, 'Image ' + img + ': ' + (exists ? 'exists (' + (size / 1024).toFixed(0) + ' KB)' : 'MISSING'));
});

// Check images are referenced in HTML
console.log('\n=== IMAGE REFERENCES IN HTML ===');
IMAGES.forEach(img => {
  check(html.includes(img), 'Referenced in HTML: ' + img);
});

// ===== 6. EXTERNAL LINKS =====
console.log('\n=== EXTERNAL LINKS ===');
check(html.includes('edmi.com.ua'), 'Link to edmi.com.ua');
check(html.includes('tel:+380670002467'), 'Tel link: +380670002467');
check(html.includes('mailto:office@edmi.dental'), 'Mailto: office@edmi.dental');
check(html.includes('edmi.com.ua/product/'), 'Product links to edmi.com.ua');

// ===== 7. CROSS-SUM VERIFICATION =====
console.log('\n=== CROSS-SUM VERIFICATION ===');
const totalMicroscopeValue = MICROSCOPES.reduce((s, m) => s + m.price, 0);
const totalAccessoryValue = ACCESSORIES.reduce((s, a) => s + a.price, 0);
console.log('  Microscopes total: EUR ' + totalMicroscopeValue.toLocaleString());
console.log('  Accessories total: EUR ' + totalAccessoryValue.toLocaleString());
console.log('  Grand total catalog value: EUR ' + (totalMicroscopeValue + totalAccessoryValue).toLocaleString());
console.log('  Microscope count: ' + MICROSCOPES.length);
console.log('  Accessory count: ' + ACCESSORIES.length);
console.log('  Total products: ' + (MICROSCOPES.length + ACCESSORIES.length));

const htmlMicTotal = micPrices.reduce((s, p) => s + p, 0);
const htmlAccTotal = pricesInHTML.slice(7).reduce((s, p) => s + p, 0);
check(htmlMicTotal === totalMicroscopeValue,
  'HTML microscope sum (EUR ' + htmlMicTotal + ') = design doc (EUR ' + totalMicroscopeValue + ')');
check(htmlAccTotal === totalAccessoryValue,
  'HTML accessory sum (EUR ' + htmlAccTotal + ') = design doc (EUR ' + totalAccessoryValue + ')');

// ===== 8. SECTION COUNT =====
console.log('\n=== SECTIONS ===');
const sections = ['hero', 'about', 'microscopes', 'accessories', 'tradein', 'service', 'contact'];
sections.forEach(s => {
  const hasSection = html.includes('id="' + s + '"') || html.includes('class="' + s + '"') || html.includes('class="' + s + ' ');
  check(hasSection, 'Section "' + s + '" present');
});

// ===== 9. BRANDS =====
console.log('\n=== BRANDS ===');
check(html.includes('Zeiss'), 'Brand Zeiss mentioned');
check(html.includes('CJ-Optik'), 'Brand CJ-Optik mentioned');

// ===== SUMMARY =====
console.log('\n' + '='.repeat(50));
console.log('VERIFICATION COMPLETE');
console.log('  Passed: ' + passed);
console.log('  Errors: ' + errors);
console.log('  Warnings: ' + warnings);
console.log('='.repeat(50));

if (errors > 0) {
  console.log('\nVERIFICATION FAILED');
  process.exit(1);
} else {
  console.log('\nALL CHECKS PASSED');
  process.exit(0);
}
