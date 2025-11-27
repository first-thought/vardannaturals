# 🎉 Deals & Promotions Display Guide

Complete guide to adding promotional banners, badges, and popups to Vardan Naturals website.

---

## 📋 Table of Contents

1. [Announcement Bar (Top Banner)](#1-announcement-bar-top-banner)
2. [Hero Banner (Main Image Banner)](#2-hero-banner-main-image-banner)
3. [Product Sale Badges](#3-product-sale-badges)
4. [Modal Popup](#4-modal-popup)

---

## 1. Announcement Bar (Top Banner)

### 📍 Location
Appears at the very top of the page, above the header navigation.

### ✅ Best For
- Flash sales
- Discount codes
- Free shipping announcements
- Limited time offers

### 📝 Implementation

#### Step 1: Add HTML
Add this code **BEFORE** your `<header>` tag in `index.html`:

```html
<!-- Announcement Bar -->
<div class="announcement-bar" id="announcementBar">
  <p>
    🎉 <strong>Diwali Sale:</strong> Get 20% OFF on all products! Use code: DIWALI20 | 
    <a href="products.html">Shop Now →</a>
  </p>
  <button class="close-announcement" onclick="closeAnnouncement()">&times;</button>
</div>
```

#### Step 2: Add CSS
Create or add to `css/announcement.css`:

```css
/* Announcement Bar Styles */
.announcement-bar {
  background: linear-gradient(135deg, #2c5f2d 0%, #4a7c59 100%);
  color: white;
  text-align: center;
  padding: 0.8rem 2rem;
  font-size: 0.95rem;
  position: relative;
  z-index: 1001;
  animation: slideDown 0.5s ease;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.announcement-bar p {
  margin: 0;
  font-weight: 400;
  letter-spacing: 0.3px;
}

.announcement-bar strong {
  font-weight: 700;
}

.announcement-bar a {
  color: white;
  text-decoration: underline;
  font-weight: 600;
  margin-left: 1rem;
  transition: color 0.3s;
}

.announcement-bar a:hover {
  color: #fee140;
}

.close-announcement {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: opacity 0.3s;
}

.close-announcement:hover {
  opacity: 0.7;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .announcement-bar {
    padding: 1rem 3rem 1rem 1rem;
    font-size: 0.85rem;
  }
  
  .close-announcement {
    right: 0.5rem;
  }
}
```

#### Step 3: Add JavaScript
Add to `js/main.js` or create `js/announcement.js`:

```javascript
// Close announcement bar
function closeAnnouncement() {
  const bar = document.getElementById('announcementBar');
  bar.style.animation = 'slideUp 0.3s ease';
  
  setTimeout(() => {
    bar.style.display = 'none';
    // Remember user closed it (optional)
    sessionStorage.setItem('announcementClosed', 'true');
  }, 300);
}

// Optional: Keep closed during session
window.addEventListener('DOMContentLoaded', function() {
  if (sessionStorage.getItem('announcementClosed')) {
    document.getElementById('announcementBar').style.display = 'none';
  }
});
```

Add slideUp animation to CSS:

```css
@keyframes slideUp {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}
```

#### Step 4: Link CSS and JS
Add to your `<head>`:
```html
<link href="css/announcement.css" rel="stylesheet">
```

Add before closing `</body>`:
```html
<script src="js/announcement.js"></script>
```

### 🎨 Customization Options

**Change Background Color:**
```css

background: linear-gradient(135deg, #ff6b6b 0%, #ff4444 100%); /* Red */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* Purple */
background: #2c5f2d; /* Solid green */
```

**Change Text:**
- Edit the `<p>` content in HTML
- Update emoji, text, and link as needed

---

## 2. Hero Banner (Main Image Banner)

### 📍 Location
Large banner image on homepage, below header and hero section.

### ✅ Best For
- Major seasonal sales
- New product launches
- Brand campaigns
- High-impact promotions

### 📝 Implementation

#### Step 1: Create Banner Image
- **Size:** 1920x600px (or 1400x500px)
- **Format:** JPG or PNG
- **Design:** Use Canva, Photoshop, or online tools
- **Save as:** `images/diwali-sale-banner.jpg`

#### Step 2: Add HTML
Replace or add after hero section in `index.html`:

```html
<!-- Promotional Banner -->
<section class="promo-banner-section" style="width: 100%; padding: 0; margin: 0;">
  <div class="promo-banner-wrapper" style="position: relative; max-height: 600px; overflow: hidden;">
    
    <!-- Banner Image -->
    <img alt="Diwali Sale - Up to 30% OFF" 
         src="images/diwali-sale-banner.jpg"
         style="width: 100%; height: auto; display: block; max-height: 600px; object-fit: cover;"/>
    
    <!-- Overlay Content (Optional - for text over image) -->
    <div class="promo-overlay" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: white; z-index: 10; width: 90%; max-width: 800px;">
      <h2 style="font-size: 3.5rem; margin-bottom: 1rem; text-shadow: 2px 2px 8px rgba(0,0,0,0.7); font-weight: 300; letter-spacing: 3px;">
        Diwali Mega Sale! 🎊
      </h2>
      <p style="font-size: 1.8rem; margin-bottom: 2rem; text-shadow: 2px 2px 6px rgba(0,0,0,0.7); font-weight: 400;">
        Up to 30% OFF on Selected Products
      </p>
      <a href="products.html" style="display: inline-block; background: #2c5f2d; color: white; padding: 1.2rem 3rem; border-radius: 50px; font-size: 1.2rem; font-weight: 600; text-decoration: none; box-shadow: 0 6px 20px rgba(44, 95, 45, 0.4); transition: all 0.3s;">
        Shop Now →
      </a>
    </div>
  </div>
</section>
```

#### Step 3: Make it Responsive (Optional CSS)
Add to your CSS:

```css
/* Promo Banner Responsive */
@media (max-width: 768px) {
  .promo-overlay h2 {
    font-size: 2rem !important;
  }
  
  .promo-overlay p {
    font-size: 1.2rem !important;
  }
  
  .promo-overlay a {
    padding: 1rem 2rem !important;
    font-size: 1rem !important;
  }
}
```

### 🎨 Design Tips

**For DIY Banner in Canva:**
1. Use template size: 1920x600px
2. Add your product images
3. Use bold, readable fonts
4. Include:
    - Sale percentage (e.g., "30% OFF")
    - Time limit (e.g., "Limited Time Only")
    - Call to action (e.g., "Shop Now")
5. Use your brand colors (#2c5f2d green)

**Or use text overlay only** (no design needed):
- Just use a solid color image
- Let the HTML overlay text do the work

---

## 3. Product Sale Badges

### 📍 Location
Top-right corner of product cards (featured products, category pages).

### ✅ Best For
- Highlighting discounted items
- Showing sale percentage
- "New" or "Bestseller" labels
- Seasonal offers

### 📝 Implementation

#### Step 1: Add CSS
Add to `css/category.css`:

```css
/* Product Sale Badge */
.product-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ff4444;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  z-index: 3;
  box-shadow: 0 4px 12px rgba(255, 68, 68, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Badge Variants */
.product-badge.sale {
  background: #ff4444;
}

.product-badge.new {
  background: #4facfe;
}

.product-badge.bestseller {
  background: #ffd700;
  color: #2c5f2d;
}

/* For Featured Products Carousel */
.featured-products .featured-product-card {
  position: relative; /* Important! */
}
```

#### Step 2: Add Badge to Products

**For Featured Products (index.html):**

```html
<div class="featured-product-card">
  <!-- Add badge here -->
  <div class="product-badge sale">-20%</div>
  
  <div class="featured-product-image">
    <img src="images/kumkumadi-tailam.png" alt="Kumkumadi Tailam">
  </div>
  <div class="featured-product-info">
    <h3>Kumkumadi Tailam</h3>
    <p>Miraculous beauty elixir with Kashmiri saffron</p>
    <div class="featured-product-price">₹699</div>
    <a href="products/skin-care.html" class="featured-product-link">Shop Skin Care →</a>
  </div>
</div>
```

**For Category Page Products:**

```html
<div class="product-item">
  <!-- Add badge here -->
  <div class="product-badge sale">SALE</div>
  
  <div class="product-image">
    <img src="../images/shea-butter-soap.jpg" alt="Shea Butter Soap"/>
  </div>
  <div class="product-details">
    <!-- ... rest of product -->
  </div>
</div>
```

### 🎨 Badge Variations

```html
<!-- Sale Badge -->
<div class="product-badge sale">-30%</div>
<div class="product-badge sale">SALE</div>

<!-- New Product Badge -->
<div class="product-badge new">NEW</div>

<!-- Bestseller Badge -->
<div class="product-badge bestseller">BESTSELLER</div>

<!-- Custom Text -->
<div class="product-badge">LIMITED</div>
```

---

## 4. Modal Popup

### 📍 Location
Center of screen, appears on page load.

### ✅ Best For
- First-time visitor discounts
- Email signup offers
- Major announcements
- Exclusive deals

### 📝 Implementation

#### Step 1: Add HTML
Add **before closing `</body>` tag** in `index.html`:

```html
<!-- Deal Modal Popup -->
<div id="dealModal" class="deal-modal">
  <div class="deal-modal-content">
    <span class="close-modal" onclick="closeDealModal()">&times;</span>
    
    <!-- Modal Icon (optional) -->
    <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
    
    <h2 style="color: #2c5f2d; font-size: 2.5rem; margin-bottom: 1rem;">Limited Time Offer!</h2>
    
    <p style="font-size: 1.3rem; margin: 1.5rem 0; color: #3a3a3a;">
      Get <strong style="color: #ff4444;">20% OFF</strong> on your first order
    </p>
    
    <p style="color: #6a6a6a; margin-bottom: 2rem;">
      Use code: <strong style="color: #2c5f2d; font-size: 1.3rem; background: #f5f3f0; padding: 0.3rem 1rem; border-radius: 8px;">FIRST20</strong>
    </p>
    
    <a href="products.html" class="deal-modal-btn">Shop Now →</a>
    
    <p style="font-size: 0.9rem; color: #8a8a8a; margin-top: 1.5rem;">
      *Valid for new customers only. Expires in 48 hours.
    </p>
  </div>
</div>
```

#### Step 2: Add CSS
Create or add to `css/modal.css`:

```css
/* Deal Modal Styles */
.deal-modal {
  display: none;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
}

.deal-modal-content {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  max-width: 550px;
  width: 90%;
  position: relative;
  animation: modalSlideDown 0.4s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

@keyframes modalSlideDown {
  from {
    transform: translateY(-100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.close-modal {
  position: absolute;
  right: 1.5rem;
  top: 1rem;
  font-size: 2.5rem;
  cursor: pointer;
  color: #6a6a6a;
  transition: color 0.3s;
  line-height: 1;
}

.close-modal:hover {
  color: #2c5f2d;
}

.deal-modal-btn {
  display: inline-block;
  background: #2c5f2d;
  color: white;
  padding: 1.2rem 3rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 1rem;
  transition: all 0.3s;
  box-shadow: 0 6px 20px rgba(44, 95, 45, 0.3);
}

.deal-modal-btn:hover {
  background: #1f4620;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(44, 95, 45, 0.4);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .deal-modal-content {
    padding: 2rem 1.5rem;
  }
  
  .deal-modal-content h2 {
    font-size: 2rem !important;
  }
  
  .deal-modal-content p {
    font-size: 1.1rem !important;
  }
}
```

#### Step 3: Add JavaScript
Add to `js/main.js` or create `js/modal.js`:

```javascript
// Show modal on page load (once per session)
window.addEventListener('DOMContentLoaded', function() {
  // Check if modal was already shown in this session
  if (!sessionStorage.getItem('dealModalShown')) {
    // Show modal after 1 second delay
    setTimeout(function() {
      document.getElementById('dealModal').style.display = 'flex';
    }, 1000);
    
    // Mark as shown for this session
    sessionStorage.setItem('dealModalShown', 'true');
  }
});

// Close modal function
function closeDealModal() {
  const modal = document.getElementById('dealModal');
  modal.style.animation = 'modalSlideUp 0.3s ease';
  
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

// Close modal when clicking outside
document.getElementById('dealModal')?.addEventListener('click', function(e) {
  if (e.target === this) {
    closeDealModal();
  }
});
```

Add slideUp animation to CSS:

```css
@keyframes modalSlideUp {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100px);
    opacity: 0;
  }
}
```

#### Step 4: Link CSS and JS
Add to `<head>`:
```html
<link href="css/modal.css" rel="stylesheet">
```

Add before closing `</body>`:
```html
<script src="js/modal.js"></script>
```

### ⚙️ Customization Options

**Show Modal on Every Visit:**
Remove the sessionStorage check:
```javascript
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    document.getElementById('dealModal').style.display = 'flex';
  }, 1000);
});
```

**Show Only to New Visitors:**
Use localStorage instead:
```javascript
if (!localStorage.getItem('dealModalShown')) {
  // Show modal
  localStorage.setItem('dealModalShown', 'true');
}
```

**Change Delay:**
```javascript
setTimeout(function() {
  // Show modal
}, 2000); // 2 seconds instead of 1
```

---

## 📊 Recommended Usage Strategy

### For Regular Sales (10-20% OFF):
- ✅ Announcement Bar
- ✅ Product Badges

### For Major Sales (Diwali, New Year, 30%+ OFF):
- ✅ Announcement Bar
- ✅ Hero Banner
- ✅ Product Badges
- ✅ Modal Popup (first-time visitors)

### For Product Launches:
- ✅ Hero Banner
- ✅ "NEW" Badges

---

## 🎨 Color Scheme Reference

```css
/* Brand Colors */
Primary Green: #2c5f2d
Light Green: #4a7c59
Sale Red: #ff4444
New Blue: #4facfe
Gold: #ffd700

/* Gradients */
Green: linear-gradient(135deg, #2c5f2d 0%, #4a7c59 100%)
Red: linear-gradient(135deg, #ff6b6b 0%, #ff4444 100%)
```

---

## 🚀 Quick Start Checklist

### To Add a Sale Promotion:

- [ ] Update announcement bar text with sale details
- [ ] Create/update hero banner image (if major sale)
- [ ] Add badges to discounted products
- [ ] Update modal popup with current offer
- [ ] Test on mobile and desktop
- [ ] Set end date reminders to remove promotions

---

## 📝 Notes

- **Session Storage:** Keeps data only for current browser session
- **Local Storage:** Keeps data permanently (until cleared)
- **Remove Promotions:** Comment out or delete HTML when sale ends
- **Test Before Launch:** Always preview changes on mobile devices

---

## 💡 Pro Tips

1. **Urgency Works:** Add countdown timers or "Limited Time" text
2. **Clear CTAs:** Use action words like "Shop Now", "Claim Offer"
3. **Mobile First:** Test everything on mobile - most traffic is mobile
4. **A/B Test:** Try different colors, text, and placements
5. **Analytics:** Track which promotions drive most sales

---

## 🆘 Troubleshooting

**Modal not appearing?**
- Check console for JavaScript errors
- Verify `id="dealModal"` matches script
- Clear sessionStorage: `sessionStorage.clear()`

**Badge not showing?**
- Ensure parent container has `position: relative`
- Check z-index conflicts
- Verify CSS is loaded

**Banner not responsive?**
- Add max-width and mobile media queries
- Test with browser dev tools (F12)

---

**Created for Vardan Naturals**  
**Last Updated:** 2025
