// Central site configuration used by layout, category navigation, and checkout.
window.VARDAN_SITE = {
  brandName: 'Vardan Naturals',
  tagline: 'from nature, with care',
  whatsappNumber: '918077775729',
  // Paste the deployed Google Apps Script Web App URL here to enable sheet logging.
  orderSheetWebAppUrl: 'https://script.google.com/macros/s/AKfycbzMxkwSxYnWwF_tYS7T3rUF1ByKDjOYR6nN2F1zdVi8Sghi8FtGZ2a4gjr50ZRU-2o1/exec',
  navItems: [
    { label: 'Home', href: 'index.html#home' },
    { label: 'About', href: 'index.html#about' },
    { label: 'Contact', href: 'index.html#contact' },
    { label: 'Cart', href: 'cart.html', cart: true }
  ],
  productCategories: [
    {
      label: 'All Categories',
      href: 'products.html',
      description: 'Browse the full Vardan Naturals collection',
      icon: 'fas fa-border-all',
      className: 'all-products'
    },
    {
      label: 'Curated Combos',
      href: 'products/combos.html',
      description: 'Curated bundles, gift sets and special-value self-care pairings',
      icon: 'fas fa-gift',
      className: 'combos'
    },
    {
      label: 'Bath & Body Rituals',
      href: 'products/body-hand-wash.html',
      description: 'Liquid cleansers for bath and hand-care rituals',
      icon: 'fas fa-pump-soap',
      className: 'body-hand-wash'
    },
    {
      label: 'Body Wellness Oils',
      href: 'products/body-wellness-oils.html',
      description: 'Ayurvedic massage oils for joint pain and muscle stiffness',
      icon: 'fas fa-spa',
      className: 'pain-relief'
    },
    {
      label: 'Hair Care Excellence',
      href: 'products/hair-care.html',
      description: 'Natural hair oils for healthy, shiny, and strong hair',
      icon: 'fas fa-wind',
      className: 'hair-care'
    },
    {
      label: 'Radiant Skin Care',
      href: 'products/skin-care.html',
      description: 'Radiant skin essentials with natural ingredients',
      icon: 'fas fa-star',
      className: 'skin-care'
    },
    {
      label: 'Artisan Soaps',
      href: 'products/soaps.html',
      description: 'Handcrafted soaps with natural ingredients',
      icon: 'fas fa-hand-sparkles',
      className: 'soaps'
    },
    {
      label: 'Bath Salts',
      href: 'products/bath-salts.html',
      description: 'Therapeutic bath salts for relaxation and skin nourishment',
      icon: 'fas fa-bath',
      className: 'bath-salts'
    },
    {
      label: 'Wellness & Specialty Care',
      href: 'products/wellness.html',
      description: 'Specialized products for holistic health and wellness',
      icon: 'fas fa-heart',
      className: 'wellness'
    },
    {
      label: 'Herbal Tea Collection',
      href: 'products/herbal-tea.html',
      description: 'Wellness teas for digestion, immunity, and relaxation',
      icon: 'fas fa-mug-hot',
      className: 'herbal-tea'
    },
    {
      label: 'Wellness Tools',
      href: 'products/tools.html',
      description: 'Traditional wellness tools for Ayurvedic practices',
      icon: 'fas fa-toolbox',
      className: 'tools'
    }
  ]
};
