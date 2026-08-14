// Renders shared site chrome from js/site-config.js.
(function () {
  const site = window.VARDAN_SITE;
  if (!site) return;

  const isNested = window.location.pathname.includes('/products/');
  const prefix = isNested ? '../' : '';

  function localHref(href) {
    if (/^(https?:)?\/\//.test(href) || href.startsWith('#')) return href;
    if (isNested && href.startsWith('products/')) return href.replace('products/', '');
    return `${prefix}${href}`;
  }

  function renderHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    const categoryLinks = site.productCategories
      .map(category => `<a href="${localHref(category.href)}">${category.label}</a>`)
      .join('');

    header.innerHTML = `
      <nav>
        <div class="logo">
          <div class="logo-placeholder">
            <img alt="${site.brandName} Logo" class="logo-image" src="${prefix}images/vardan-naturals-logo.png">
          </div>
          <span>${site.brandName}</span>
        </div>
        <ul class="nav-links">
          <li><a href="${localHref('index.html#home')}">Home</a></li>
          <li class="dropdown">
            <a href="${localHref('products.html')}" class="dropdown-toggle">Products ▾</a>
            <div class="dropdown-content">${categoryLinks}</div>
          </li>
          <li><a href="${localHref('index.html#about')}">About</a></li>
          <li><a href="${localHref('index.html#contact')}">Contact</a></li>
          <li><a href="${localHref('cart.html')}" class="cart-link-nav">🛒 Cart (<span id="navCartCount">0</span>)</a></li>
        </ul>
      </nav>
    `;
  }

  function renderFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    footer.innerHTML = `
      <p>© 2025 First Thought Technology. All rights reserved.</p>
      <p style="margin-top: 0.8rem; font-style: italic; opacity: 0.9;">Made with ❤️</p>
    `;
  }

  function renderCategoryGrid() {
    const grid = document.querySelector('[data-category-grid]');
    if (!grid) return;

    grid.innerHTML = site.productCategories
      .filter(category => category.href !== 'products.html')
      .map(category => `
        <a class="category-card" href="${localHref(category.href)}">
          <div class="category-card-inner">
            <div class="category-image ${category.className}">
              <i class="${category.icon}"></i>
            </div>
            <div class="category-content">
              <h3 class="category-title">${category.label}</h3>
              <p class="category-description">${category.description}</p>
              <span class="category-link-text">Explore Products →</span>
            </div>
          </div>
        </a>
      `)
      .join('');
  }

  function injectAppMetadata() {
    const head = document.head;
    if (!head) return;

    const entries = [
      ['link', { rel: 'manifest', href: `${prefix}manifest.webmanifest` }],
      ['link', { rel: 'icon', type: 'image/png', href: `${prefix}images/app-icon-192.png` }],
      ['link', { rel: 'apple-touch-icon', href: `${prefix}images/app-icon-192.png` }],
      ['meta', { name: 'theme-color', content: '#2c5f2d' }],
      ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
      ['meta', { name: 'apple-mobile-web-app-title', content: site.brandName }]
    ];

    entries.forEach(([tag, attrs]) => {
      const selector = tag === 'meta'
        ? `${tag}[name="${attrs.name}"]`
        : `${tag}[rel="${attrs.rel}"]`;
      if (head.querySelector(selector)) return;

      const element = document.createElement(tag);
      Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
      head.appendChild(element);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectAppMetadata();
    renderHeader();
    renderFooter();
    renderCategoryGrid();
  });
})();
