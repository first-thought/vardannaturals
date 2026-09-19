const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const sandbox = {
  console: {
    log() {},
    warn() {},
    error() {},
    table() {}
  },
  window: {},
  document: {
    addEventListener() {},
    getElementById() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    querySelector() {
      return null;
    },
    createElement() {
      return { style: {}, setAttribute() {} };
    },
    head: {
      appendChild() {}
    },
    body: {
      appendChild() {}
    }
  },
  localStorage: {
    getItem() {
      return null;
    },
    setItem() {},
    removeItem() {}
  },
  alert() {},
  confirm() {
    return false;
  },
  setTimeout(fn) {
    if (typeof fn === 'function') fn();
  }
};

vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('js/prices.js', 'utf8'), sandbox, { filename: 'js/prices.js' });
vm.runInContext(fs.readFileSync('js/cart.js', 'utf8'), sandbox, { filename: 'js/cart.js' });

const calculateBundlePricingSummary = sandbox.window.cartDebug.calculateBundlePricingSummary;

function item(name, quantity, variant = '100g') {
  return {
    name,
    variant,
    quantity,
    priceText: `₹${sandbox.window.VardanPrices.getPrice(name, variant)}`,
    price: sandbox.window.VardanPrices.getPrice(name, variant)
  };
}

function soap(name, quantity) {
  return item(name, quantity, '100g');
}

function summarize(cartItems) {
  return calculateBundlePricingSummary(cartItems);
}

{
  const summary = summarize([
    soap('Shea Butter Soap', 1),
    soap('Triphala Charcoal Soap', 1),
    soap('Citrus Loofah Soap', 1),
    soap('Goat Milk Soap', 1),
    soap('Chandan Glow Soap', 1)
  ]);

  assert.strictEqual(summary.appliedBundles.length, 1);
  assert.strictEqual(summary.regularSubtotal, 1145);
  assert.strictEqual(summary.bundleSavings, 446);
  assert.strictEqual(summary.subtotalAfterBundles, 699);
}

{
  const summary = summarize([
    soap('Shea Butter Soap', 6)
  ]);

  assert.strictEqual(summary.appliedBundles.length, 1);
  assert.strictEqual(summary.regularSubtotal, 1494);
  assert.strictEqual(summary.bundleSavings, 546);
  assert.strictEqual(summary.subtotalAfterBundles, 948);
}

{
  const summary = summarize([
    soap('Shea Butter Soap', 10)
  ]);

  assert.strictEqual(summary.appliedBundles.length, 2);
  assert.strictEqual(summary.regularSubtotal, 2490);
  assert.strictEqual(summary.bundleSavings, 1092);
  assert.strictEqual(summary.subtotalAfterBundles, 1398);
}

{
  const summary = summarize([
    {
      ...soap('Shea Butter Soap', 4),
      unitAddedAt: [
        '2026-09-19T10:00:00.000Z',
        '2026-09-19T10:01:00.000Z',
        '2026-09-19T10:05:00.000Z',
        '2026-09-19T10:06:00.000Z'
      ]
    },
    {
      ...soap('Triphala Charcoal Soap', 2),
      unitAddedAt: [
        '2026-09-19T10:02:00.000Z',
        '2026-09-19T10:03:00.000Z'
      ]
    }
  ]);

  assert.strictEqual(summary.appliedBundles.length, 1);
  assert.strictEqual(summary.regularSubtotal, 1394);
  assert.strictEqual(summary.appliedBundles[0].regularTotal, 1145);
  assert.strictEqual(summary.bundleSavings, 446);
  assert.strictEqual(summary.subtotalAfterBundles, 948);
}

{
  const summary = summarize([
    soap('Shea Butter Soap', 4),
    item('Rose Lip Balm', 1, '15g')
  ]);

  assert.strictEqual(summary.appliedBundles.length, 0);
  assert.strictEqual(summary.regularSubtotal, 1245);
  assert.strictEqual(summary.bundleSavings, 0);
  assert.strictEqual(summary.subtotalAfterBundles, 1245);
}

console.log('cart bundle pricing tests passed');
