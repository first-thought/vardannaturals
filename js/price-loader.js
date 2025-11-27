/**
 * Vardan Naturals - Dynamic Price Loader
 * Automatically loads and displays prices from prices.js on all pages
 * NO MORE HARDCODED PRICES IN HTML!
 * Last Updated: 2025
 */

// ============================================================================
// PRICE LOADER - Runs on Page Load
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('💰 Loading dynamic prices...');

  // Wait a moment for prices.js to load
  if (typeof PRODUCT_PRICES === 'undefined') {
    console.error('❌ prices.js not loaded! Make sure it loads before price-loader.js');
    return;
  }

  loadAllPrices();
  console.log('✅ All prices loaded dynamically');
});

// ============================================================================
// MAIN PRICE LOADING FUNCTION
// ============================================================================

function loadAllPrices() {
  // Load prices in different sections
  loadFeaturedProductPrices();
  loadCategoryProductPrices();
  loadProductPagePrices();
}

// ============================================================================
// FEATURED PRODUCTS (Homepage Carousel)
// ============================================================================

function loadFeaturedProductPrices() {
  // Find all featured product cards
  const featuredCards = document.querySelectorAll('.featured-product-card');

  featuredCards.forEach(card => {
    const productName = card.querySelector('.featured-product-info h3')?.textContent.trim();
    if (!productName) return;

    const priceElement = card.querySelector('.featured-product-price');
    if (!priceElement) return;

    // Get price from centralized system
    const price = getFormattedPrice(productName);
    if (price) {
      priceElement.textContent = price;
      priceElement.setAttribute('data-price-loaded', 'true');
    }
  });
}

// ============================================================================
// CATEGORY PAGE PRODUCTS
// ============================================================================

function loadCategoryProductPrices() {
  const productItems = document.querySelectorAll('.products-container .product-item');

  productItems.forEach(item => {
    const productName = item.querySelector('.product-name')?.textContent.trim();
    if (!productName) return;

    // Check if product has variants (dropdown)
    const variantSelect = item.querySelector('.variant-select');

    if (variantSelect) {
      loadVariantPrices(productName, item, variantSelect);
    } else {
      loadSimpleProductPrice(productName, item);
    }
  });
}

/**
 * Load prices for products WITH variants (dropdown)
 */
function loadVariantPrices(productName, productItem, selectElement) {
  const variants = getProductVariants(productName);
  if (!variants) {
    console.warn(`No variants found for: ${productName}`);
    return;
  }

  // Update display price
  const priceDisplay = productItem.querySelector('.product-price');
  if (priceDisplay) {
    priceDisplay.textContent = formatPriceDisplay(productName);
    priceDisplay.setAttribute('data-price-loaded', 'true');
  }

  // Update select options
  const options = selectElement.querySelectorAll('option');
  options.forEach(option => {
    const variant = option.value;
    const price = variants[variant];

    if (price !== undefined) {
      // Update data attribute for cart system
      option.setAttribute('data-price', `₹${price}`);

      // Update option text
      option.textContent = `${variant} — ₹${price}`;
    }
  });

  selectElement.setAttribute('data-price-loaded', 'true');
}

/**
 * Load price for products WITHOUT variants (simple products)
 */
function loadSimpleProductPrice(productName, productItem) {
  const variants = getProductVariants(productName);
  if (!variants) {
    console.warn(`No price found for: ${productName}`);
    return;
  }

  // Get first (and only) variant
  const variantKey = Object.keys(variants)[0];
  const price = variants[variantKey];

  // Update display price
  const priceDisplay = productItem.querySelector('.product-price');
  if (priceDisplay) {
    if (variantKey === 'default') {
      priceDisplay.textContent = `₹${price}`;
    } else {
      priceDisplay.textContent = `₹${price} (${variantKey})`;
    }
    priceDisplay.setAttribute('data-price-loaded', 'true');
  }

  // Update button data attribute
  const addButton = productItem.querySelector('.add-to-cart-btn');
  if (addButton) {
    addButton.setAttribute('data-price', `₹${price}`);

    // Also set the variant value if not already set
    if (!addButton.getAttribute('value')) {
      addButton.setAttribute('value', variantKey);
    }
  }
}

// ============================================================================
// PRODUCT-SPECIFIC PAGES (if you have individual product pages in future)
// ============================================================================

function loadProductPagePrices() {
  // Check if we're on a specific product page
  const productTitle = document.querySelector('.product-detail-title, .product-page-title');
  if (!productTitle) return;

  const productName = productTitle.textContent.trim();
  const variants = getProductVariants(productName);

  if (!variants) return;

  // Load price display
  const priceElement = document.querySelector('.product-detail-price, .product-page-price');
  if (priceElement) {
    priceElement.textContent = formatPriceDisplay(productName);
  }

  // Load variant options if present
  const variantSelect = document.querySelector('.product-variant-select');
  if (variantSelect) {
    const options = variantSelect.querySelectorAll('option');
    options.forEach(option => {
      const variant = option.value;
      const price = variants[variant];

      if (price !== undefined) {
        option.setAttribute('data-price', `₹${price}`);
        option.textContent = `${variant} — ₹${price}`;
      }
    });
  }
}

// ============================================================================
// SALE BADGE MANAGEMENT
// ============================================================================

/**
 * Automatically add sale badges to products on sale
 */
function addSaleBadges() {
  if (!SALE_CONFIG || !SALE_CONFIG.enabled) return;

  const productItems = document.querySelectorAll('.product-item, .featured-product-card');

  productItems.forEach(item => {
    const productName = item.querySelector('.product-name, .featured-product-info h3')?.textContent.trim();
    if (!productName) return;

    // Check if product is on sale
    if (isOnSale(productName)) {
      // Check if badge already exists
      if (item.querySelector('.product-badge')) return;

      // Get discount percentage
      const variants = getProductVariants(productName);
      const firstVariant = Object.keys(variants)[0];
      const discount = getSaleDiscount(productName, firstVariant);

      // Create and add badge
      const badge = document.createElement('div');
      badge.className = 'product-badge sale';
      badge.textContent = discount ? `-${discount}%` : 'SALE';

      // Find image container to position badge
      const imageContainer = item.querySelector('.product-image, .featured-product-image');
      if (imageContainer) {
        imageContainer.style.position = 'relative';
        imageContainer.appendChild(badge);
      }
    }
  });
}

// ============================================================================
// PRICE UPDATE MONITORING
// ============================================================================

/**
 * Highlight products with price differences (for testing/admin)
 */
function highlightPriceUpdates(showAlert = false) {
  const updates = [];

  // Check all products for differences between HTML and prices.js
  document.querySelectorAll('.product-item, .featured-product-card').forEach(item => {
    const productName = item.querySelector('.product-name, .featured-product-info h3')?.textContent.trim();
    if (!productName) return;

    const htmlPrice = item.querySelector('.product-price')?.textContent;
    const systemPrice = formatPriceDisplay(productName);

    if (htmlPrice && systemPrice && htmlPrice !== systemPrice) {
      updates.push({
        product: productName,
        htmlPrice: htmlPrice,
        systemPrice: systemPrice
      });

      // Add visual indicator
      const priceElement = item.querySelector('.product-price');
      if (priceElement) {
        priceElement.style.background = '#fff3cd';
        priceElement.style.padding = '0.3rem 0.6rem';
        priceElement.style.borderRadius = '4px';
        priceElement.title = `Updated from ${htmlPrice} to ${systemPrice}`;
      }
    }
  });

  if (updates.length > 0 && showAlert) {
    console.table(updates);
    console.log(`⚠️ Found ${updates.length} price differences between HTML and prices.js`);
  }

  return updates;
}

// ============================================================================
// REAL-TIME PRICE UPDATES (for admin/development)
// ============================================================================

/**
 * Watch for price changes and update display in real-time
 * Useful during development
 */
function enableLivePriceUpdates() {
  // Create a proxy to watch PRODUCT_PRICES changes
  if (typeof Proxy === 'undefined') {
    console.warn('Browser does not support Proxy - live updates disabled');
    return;
  }

  const originalPrices = window.PRODUCT_PRICES;

  window.PRODUCT_PRICES = new Proxy(originalPrices, {
    set(target, property, value) {
      target[property] = value;
      console.log(`💰 Price updated for: ${property}`);
      loadAllPrices(); // Reload all prices
      return true;
    }
  });

  console.log('🔴 Live price updates ENABLED');
}

// ============================================================================
// VERIFICATION & DEBUGGING TOOLS
// ============================================================================

/**
 * Verify all products have prices loaded correctly
 */
function verifyAllPrices() {
  const results = {
    total: 0,
    loaded: 0,
    missing: [],
    errors: []
  };

  // Check featured products
  document.querySelectorAll('.featured-product-card').forEach(card => {
    results.total++;
    const productName = card.querySelector('.featured-product-info h3')?.textContent.trim();
    const priceElement = card.querySelector('.featured-product-price');

    if (priceElement?.getAttribute('data-price-loaded') === 'true') {
      results.loaded++;
    } else {
      results.missing.push(`Featured: ${productName}`);
    }
  });

  // Check category products
  document.querySelectorAll('.products-container .product-item').forEach(item => {
    results.total++;
    const productName = item.querySelector('.product-name')?.textContent.trim();
    const priceElement = item.querySelector('.product-price');

    if (priceElement?.getAttribute('data-price-loaded') === 'true') {
      results.loaded++;
    } else {
      results.missing.push(`Product: ${productName}`);
    }
  });

  // Report results
  console.log('📊 Price Loading Verification:');
  console.log(`✅ Loaded: ${results.loaded}/${results.total}`);

  if (results.missing.length > 0) {
    console.warn('⚠️ Missing prices:', results.missing);
  }

  return results;
}

/**
 * Export price data as CSV for backup/reference
 */
function exportPricesToCSV() {
  let csv = 'Product Name,Variant,Price\n';

  for (const [product, variants] of Object.entries(PRODUCT_PRICES)) {
    for (const [variant, price] of Object.entries(variants)) {
      csv += `"${product}","${variant}",${price}\n`;
    }
  }

  // Download CSV
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `vardan-prices-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();

  console.log('📥 Price list exported to CSV');
}

// ============================================================================
// ADMIN PANEL (for easy price management)
// ============================================================================

/**
 * Show floating admin panel for price management
 * Only enable in development or for admins
 */
function showAdminPanel() {
  // Check if already exists
  if (document.getElementById('price-admin-panel')) return;

  const panel = document.createElement('div');
  panel.id = 'price-admin-panel';
  panel.innerHTML = `
    <div style="position: fixed; bottom: 20px; right: 20px; background: white; padding: 1rem; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.2); z-index: 10000; font-family: monospace; font-size: 12px;">
      <div style="font-weight: bold; margin-bottom: 0.5rem; color: #2c5f2d;">💰 Price Admin</div>
      <button onclick="loadAllPrices()" style="display: block; width: 100%; margin: 0.3rem 0; padding: 0.5rem; border: none; background: #2c5f2d; color: white; border-radius: 5px; cursor: pointer;">🔄 Reload Prices</button>
      <button onclick="verifyAllPrices()" style="display: block; width: 100%; margin: 0.3rem 0; padding: 0.5rem; border: none; background: #4a7c59; color: white; border-radius: 5px; cursor: pointer;">✓ Verify Prices</button>
      <button onclick="highlightPriceUpdates(true)" style="display: block; width: 100%; margin: 0.3rem 0; padding: 0.5rem; border: none; background: #ffc107; color: black; border-radius: 5px; cursor: pointer;">⚠ Check Updates</button>
      <button onclick="exportPricesToCSV()" style="display: block; width: 100%; margin: 0.3rem 0; padding: 0.5rem; border: none; background: #17a2b8; color: white; border-radius: 5px; cursor: pointer;">📥 Export CSV</button>
      <button onclick="addSaleBadges()" style="display: block; width: 100%; margin: 0.3rem 0; padding: 0.5rem; border: none; background: #ff4444; color: white; border-radius: 5px; cursor: pointer;">🏷️ Add Sale Badges</button>
      <button onclick="document.getElementById('price-admin-panel').remove()" style="display: block; width: 100%; margin: 0.3rem 0; padding: 0.5rem; border: none; background: #6c757d; color: white; border-radius: 5px; cursor: pointer;">✕ Close</button>
    </div>
  `;

  document.body.appendChild(panel);
}

// ============================================================================
// MAKE FUNCTIONS GLOBALLY AVAILABLE
// ============================================================================

window.PriceLoader = {
  loadAllPrices,
  verifyAllPrices,
  highlightPriceUpdates,
  exportPricesToCSV,
  addSaleBadges,
  enableLivePriceUpdates,
  showAdminPanel
};

// ============================================================================
// CONSOLE HELPERS
// ============================================================================

console.log('💰 Dynamic Price Loader Ready');
console.log('🔧 Use PriceLoader.showAdminPanel() for price management tools');
console.log('📊 Use PriceLoader.verifyAllPrices() to check if all prices loaded');

// Automatically add sale badges if sales are active
if (SALE_CONFIG?.enabled) {
  setTimeout(() => {
    addSaleBadges();
    console.log('🎉 Sale badges added automatically');
  }, 100);
}
