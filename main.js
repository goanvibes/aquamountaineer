document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. THEME TOGGLE (with localStorage)
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply saved theme on load
  if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
      } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
      }
    });
  }

  // ==========================================
  // 2. MOBILE MENU & YEAR
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // ==========================================
  // 3. DYNAMIC PRODUCT RENDERING
  // ==========================================
  const products = window.AQUA_PRODUCTS || [];
  
  function createProductCard(product) {
    const priceDisplay = product.price > 0 
      ? `₹${product.price.toLocaleString('en-IN')} <span style="font-size:0.8em;font-weight:normal;color:var(--dim)">${product.unit}</span>` 
      : `Quote based`;
      
    const visual = product.image 
      ? `<img src="${product.image}" alt="${product.name}" loading="lazy">` 
      : `<div class="emoji">${product.emoji}</div>`;

    return `
      <article class="card product-card" data-animate>
        <div class="product-visual">${visual}</div>
        <div class="product-body">
          <div class="product-meta">
            <span class="tag">${product.badge}</span>
            <span class="price">${priceDisplay}</span>
          </div>
          <div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <ul class="product-details-list">
              ${product.careRequired ? `<li><strong>Care:</strong> ${product.careRequired}</li>` : ''}
              ${product.environment ? `<li><strong>Environment:</strong> ${product.environment}</li>` : ''}
            </ul>
          </div>
          <div class="product-actions">
            <button class="btn" onclick="addToCart('${product.id}')">Add to Quote</button>
          </div>
        </div>
      </article>
    `;
  }

  // Render on Homepage (Featured max 4)
  const homeGrid = document.getElementById('productGrid');
  if (homeGrid) {
    const featured = products.slice(0, 4).map(createProductCard).join('');
    homeGrid.innerHTML = featured;
  }

  // Render on Shop Page (With Filters)
  const shopGrid = document.getElementById('shopGrid');
  const catFilter = document.getElementById('categoryFilter');
  if (shopGrid) {
    const renderShop = (filter = 'all') => {
      const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
      if (filtered.length === 0) {
        shopGrid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1">No products found in this category.</div>`;
      } else {
        shopGrid.innerHTML = filtered.map(createProductCard).join('');
        observeAnimations(); // Re-trigger fade-ins
      }
    };
    
    renderShop(); // Initial render
    
    if (catFilter) {
      catFilter.addEventListener('change', (e) => renderShop(e.target.value));
    }
  }

  // ==========================================
  // 4. WHATSAPP CART SYSTEM
  // ==========================================
  let cart = JSON.parse(localStorage.getItem('aqua_cart')) || [];
  const PHONE_NUMBER = "919823302608"; // Business owner number

  function updateCartUI() {
    // Update bubble counts
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
      el.textContent = totalItems;
      el.style.display = totalItems > 0 ? 'grid' : 'none';
    });

    // Update cart drawer
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="empty-state">Your quote basket is empty. Add products to request pricing and stock.</div>';
      cartTotalEl.textContent = '₹0';
      return;
    }

    let html = '';
    let visibleTotal = 0;
    let hasQuoteItems = false;

    cart.forEach(cartItem => {
      const product = products.find(p => p.id === cartItem.id);
      if (!product) return;
      
      if (product.price > 0) visibleTotal += (product.price * cartItem.qty);
      else hasQuoteItems = true;

      html += `
        <div class="cart-item">
          <div>
            <h3>${product.name}</h3>
            <span>${product.price > 0 ? '₹' + product.price.toLocaleString('en-IN') : 'Quote needed'}</span>
            <div class="qty">
              <button onclick="updateQty('${product.id}', -1)">-</button>
              <span>${cartItem.qty}</span>
              <button onclick="updateQty('${product.id}', 1)">+</button>
            </div>
          </div>
          <button class="remove" onclick="removeFromCart('${product.id}')">Remove</button>
        </div>
      `;
    });

    cartItemsContainer.innerHTML = html;
    
    let totalText = visibleTotal > 0 ? `₹${visibleTotal.toLocaleString('en-IN')}` : '';
    if (hasQuoteItems) totalText += totalText ? ' + Quotes' : 'Quote Based';
    cartTotalEl.textContent = totalText;
  }

  window.addToCart = (id) => {
    const existing = cart.find(item => item.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id, qty: 1 });
    
    localStorage.setItem('aqua_cart', JSON.stringify(cart));
    updateCartUI();
    document.querySelector('.cart-drawer').classList.add('open');
  };

  window.updateQty = (id, delta) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
      localStorage.setItem('aqua_cart', JSON.stringify(cart));
      updateCartUI();
    }
  };

  window.removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('aqua_cart', JSON.stringify(cart));
    updateCartUI();
  };

  // Cart Drawer Toggles
  document.querySelectorAll('[data-open-cart]').forEach(btn => {
    btn.addEventListener('click', () => document.querySelector('.cart-drawer').classList.add('open'));
  });
  document.querySelectorAll('[data-close-cart]').forEach(btn => {
    btn.addEventListener('click', () => document.querySelector('.cart-drawer').classList.remove('open'));
  });

  // Clear Cart
  const clearCartBtn = document.getElementById('clearCart');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      cart = [];
      localStorage.removeItem('aqua_cart');
      updateCartUI();
    });
  }

  // Send WhatsApp Message
  const sendCartBtn = document.getElementById('sendCart');
  if (sendCartBtn) {
    sendCartBtn.addEventListener('click', () => {
      if (cart.length === 0) return alert("Basket is empty!");
      
      let message = "🌊 *Aqua Mountaineer Order Inquiry*\n\nHello! I would like to request stock availability and a quote for the following items:\n\n";
      
      cart.forEach((cartItem, index) => {
        const p = products.find(prod => prod.id === cartItem.id);
        if (p) {
          message += `${index + 1}. *${p.name}* (Qty: ${cartItem.qty})\n`;
        }
      });

      const notes = document.getElementById('cartNotes').value;
      if (notes.trim() !== "") {
        message += `\n*Additional Notes / Setup Details:*\n${notes}\n`;
      }

      message += "\nPlease let me know the total pricing and when I can pick this up. Thank you!";
      
      const whatsappURL = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, '_blank');
    });
  }

  // Quick Action Messages
  window.quickMessage = (type) => {
    let msg = "";
    if (type === 'stock') msg = "Hello Aqua Mountaineer! What live fish do you currently have in stock?";
    if (type === 'setup') msg = "Hello! I am looking to get some advice on a new aquarium setup. Can you help me figure out what I need?";
    if (type === 'location') msg = "Hi, could you send me the Google Maps pin for your shop in St. Inez?";
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Maps Link
  document.querySelectorAll('[data-map-link]').forEach(link => {
    link.href = "https://maps.google.com/?q=Aqua+Mountaineer+Panaji+Goa";
  });

  // ==========================================
  // 5. SCROLL ANIMATIONS
  // ==========================================
  function observeAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => {
      el.classList.remove('visible'); // Reset for re-renders
      observer.observe(el);
    });
  }
  
  observeAnimations();
  updateCartUI(); // Initial cart render
});