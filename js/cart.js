// js/cart.js - Enhanced Cart for Separate Page

let cart = [];

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('vardanCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  updateCartCount();
  return cart;
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('vardanCart', JSON.stringify(cart));
  updateCartCount();
}

// Add to Cart
function addToCart(productName, price, variant = '', imageSrc = '') {
  const numPrice = parseFloat(price.replace(/[^0-9.]/g, ''));

  const existingIndex = cart.findIndex(item =>
    item.name === productName && item.variant === variant
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
    showNotification('Quantity updated in cart!');
  } else {
    cart.push({
      name: productName,
      price: numPrice,
      priceText: price,
      variant: variant,
      quantity: 1,
      image: imageSrc
    });
    showNotification('Added to cart! ✓');
  }

  saveCart();

  // If on cart page, re-render
  if (window.location.pathname.includes('cart.html')) {
    renderCartPage();
  }
}

// Update quantity
function updateQuantity(index, change) {
  if (cart[index]) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
      removeFromCart(index);
    } else {
      saveCart();
      renderCartPage();
    }
  }
}

// Remove from cart
function removeFromCart(index) {
  if (confirm('Remove this item from cart?')) {
    cart.splice(index, 1);
    saveCart();
    renderCartPage();
    showNotification('Item removed');
  }
}

// Clear cart
function clearCart() {
  if (confirm('Clear all items from cart?')) {
    cart = [];
    saveCart();
    renderCartPage();
    showNotification('Cart cleared');
  }
}

// Update cart count in navigation
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countElements = document.querySelectorAll('#navCartCount, #cartCount');
  countElements.forEach(el => {
    if (el) el.textContent = totalItems;
  });
}

// Calculate total
function calculateTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Render cart page
function renderCartPage() {
  const container = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('totalAmount');

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
            <div class="cart-empty-state">
                <div class="cart-empty-icon">🛍️</div>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <a href="index.html#products" class="shop-now-btn">
                    🌿 Start Shopping
                </a>
            </div>
        `;

    if (subtotalEl) subtotalEl.textContent = '₹0';
    if (totalEl) totalEl.textContent = '₹0';

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.disabled = true;

    return;
  }

  // Render cart items
  container.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            ${item.image ?
    `<img src="${item.image}" class="cart-item-image" alt="${item.name}">` :
    '<div class="cart-item-image" style="display: flex; align-items: center; justify-content: center; font-size: 3rem;">🌿</div>'
  }
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                ${item.variant ? `<div class="cart-item-variant">Variant: ${item.variant}</div>` : ''}
                <div class="cart-item-price">${item.priceText}</div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">−</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${index})" title="Remove item">🗑️</button>
                </div>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 1.3rem; font-weight: 600; color: #2c5f2d;">
                    ₹${(item.price * item.quantity).toFixed(0)}
                </div>
                <div style="font-size: 0.85rem; color: #8a8a8a; margin-top: 0.3rem;">
                    ₹${item.price} × ${item.quantity}
                </div>
            </div>
        </div>
    `).join('');

  // Update totals
  const total = calculateTotal();
  if (subtotalEl) subtotalEl.textContent = `₹${total.toFixed(0)}`;
  if (totalEl) totalEl.textContent = `₹${total.toFixed(0)}`;

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.disabled = false;
}

// Checkout via WhatsApp
function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const phoneNumber = '919559041204';
  let message = `🛒 *New Order from Vardan Naturals Website*\n\n`;

  cart.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    if (item.variant) message += `   Variant: ${item.variant}\n`;
    message += `   Price: ${item.priceText}\n`;
    message += `   Quantity: ${item.quantity}\n`;
    message += `   Subtotal: ₹${(item.price * item.quantity).toFixed(0)}\n\n`;
  });

  const total = calculateTotal();
  message += `───────────────\n`;
  message += `*Total Amount: ₹${total.toFixed(0)}*\n\n`;
  message += `Please confirm availability and delivery details. Thank you! 🙏`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');

  setTimeout(() => {
    if (confirm('Order sent! Would you like to clear your cart?')) {
      clearCart();
    }
  }, 1500);
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: #2c5f2d;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-weight: 500;
    `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2500);
}

// Initialize
loadCart();
