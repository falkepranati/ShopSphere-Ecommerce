const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 2499, oldPrice: 3299, rating: 4.8, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80", description: "Enjoy clear sound, comfortable ear cushions and wireless freedom." },
  { id: 2, name: "Smart Watch", category: "Electronics", price: 3299, oldPrice: 4299, rating: 4.7, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80", description: "A stylish smartwatch for your everyday activities." },
  { id: 3, name: "Bluetooth Speaker", category: "Electronics", price: 1799, oldPrice: 2299, rating: 4.6, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80", description: "Bring your favourite music to life with rich sound." },
  { id: 4, name: "Digital Camera", category: "Electronics", price: 8999, oldPrice: 10999, rating: 4.9, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80", description: "Capture beautiful moments with this stylish camera." },
  { id: 5, name: "Classic Sneakers", category: "Fashion", price: 2199, oldPrice: 2799, rating: 4.8, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80", description: "Comfortable everyday sneakers with a modern look." },
  { id: 6, name: "Travel Backpack", category: "Fashion", price: 1599, oldPrice: 1999, rating: 4.5, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80", description: "A practical backpack for travel, work and daily use." },
  { id: 7, name: "Cotton T-Shirt", category: "Fashion", price: 799, oldPrice: 1099, rating: 4.4, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80", description: "A soft and comfortable t-shirt for everyday styling." },
  { id: 8, name: "Stylish Sunglasses", category: "Accessories", price: 999, oldPrice: 1399, rating: 4.6, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80", description: "Complete your look with these stylish sunglasses." },
  { id: 9, name: "Classic Wrist Watch", category: "Accessories", price: 1899, oldPrice: 2499, rating: 4.7, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80", description: "A timeless accessory for casual and formal outfits." },
  { id: 10, name: "Modern Desk Lamp", category: "Home", price: 1299, oldPrice: 1699, rating: 4.5, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80", description: "Add a warm and stylish touch to your workspace." },
  { id: 11, name: "Decorative Vase", category: "Home", price: 699, oldPrice: 999, rating: 4.3, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=80", description: "A decorative vase to give your home a fresh look." },
  { id: 12, name: "Soft Cushion", category: "Home", price: 599, oldPrice: 799, rating: 4.4, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=700&q=80", description: "Add comfort and style to your favourite space." }
];

const $ = id => document.getElementById(id);

const productGrid = $("productGrid");
const searchInput = $("searchInput");
const filterBar = $("filterBar");
const sortSelect = $("sortSelect");
const productTotal = $("productTotal");

const cartButton = $("cartButton");
const cartCount = $("cartCount");
const cartOverlay = $("cartOverlay");
const cartDrawer = $("cartDrawer");
const closeCart = $("closeCart");
const cartItems = $("cartItems");
const cartSubtotal = $("cartSubtotal");
const checkoutButton = $("checkoutButton");
const continueShopping = $("continueShopping");

const productModal = $("productModal");
const productDetails = $("productDetails");
const closeProductModal = $("closeProductModal");

const wishlistButton = $("wishlistButton");
const wishlistCount = $("wishlistCount");
const wishlistModal = $("wishlistModal");
const wishlistItems = $("wishlistItems");
const closeWishlistModal = $("closeWishlistModal");

const checkoutModal = $("checkoutModal");
const closeModal = $("closeModal");
const checkoutForm = $("checkoutForm");
const checkoutTotal = $("checkoutTotal");
const checkoutMessage = $("checkoutMessage");

const toastContainer = $("toastContainer");

const CART_KEY = "shopsphere-cart";
const WISHLIST_KEY = "shopsphere-wishlist";

let selectedCategory = "All Products";
let cart = loadArray(CART_KEY);
let wishlist = loadArray(WISHLIST_KEY);

function loadArray(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

cart = cart.filter(item =>
  products.some(product => product.id === Number(item.id)) &&
  Number.isInteger(item.quantity) &&
  item.quantity > 0
).map(item => ({
  id: Number(item.id),
  quantity: item.quantity
}));

wishlist = [...new Set(wishlist.map(Number))]
  .filter(id => products.some(product => product.id === id));

function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function saveWishlist() {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => toast.remove(), 2600);
}

// PRODUCT DISPLAY

function displayProducts() {
  const searchText = searchInput.value.toLowerCase().trim();

  let filtered = products.filter(product => {
    const categoryMatch =
      selectedCategory === "All Products" ||
      product.category === selectedCategory;

    const searchMatch =
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText);

    return categoryMatch && searchMatch;
  });

  const sortValue = sortSelect.value;

  if (sortValue === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === "high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortValue === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  productTotal.textContent =
    `${filtered.length} Product${filtered.length !== 1 ? "s" : ""}`;

  if (!filtered.length) {
    productGrid.innerHTML = `
      <p class="no-products">No products found. Try another search.</p>
    `;
    return;
  }

  productGrid.innerHTML = filtered.map(product => {
    const discount = Math.round(
      (1 - product.price / product.oldPrice) * 100
    );

    const isFavourite = wishlist.includes(product.id);

    return `
      <article class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">

          <span class="discount-badge">${discount}% OFF</span>

          <button
            class="wishlist-heart ${isFavourite ? "active" : ""}"
            data-action="wishlist"
            data-id="${product.id}"
            aria-label="Add ${product.name} to wishlist"
            aria-pressed="${isFavourite}"
          >${isFavourite ? "♥" : "♡"}</button>
        </div>

        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3>${product.name}</h3>

          <div class="product-rating">★ ${product.rating} / 5</div>

          <div class="price-row">
            <span class="product-price">${formatPrice(product.price)}</span>
            <span class="old-price">${formatPrice(product.oldPrice)}</span>
          </div>

          <div class="product-actions">
            <button class="view-details" data-action="details" data-id="${product.id}">
              View Details
            </button>

            <button class="add-cart" data-action="add" data-id="${product.id}">
              Add to Cart
            </button>

            <button class="buy-now" data-action="buy" data-id="${product.id}">
              Buy Now →
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  productGrid.querySelectorAll(".product-image img").forEach(img => {
    img.addEventListener("error", () => {
      img.style.display = "none";
    }, { once: true });
  });
}

searchInput.addEventListener("input", displayProducts);
sortSelect.addEventListener("change", displayProducts);

filterBar.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  selectedCategory = button.dataset.category;

  filterBar.querySelectorAll("button").forEach(btn => {
    btn.classList.toggle("active", btn === button);
  });

  displayProducts();
});

// PRODUCT CARD ACTIONS

productGrid.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "add") {
    addToCart(id);
  }

  if (action === "buy") {
    addToCart(id);
    openCart();
  }

  if (action === "details") {
    showProductDetails(id);
  }

  if (action === "wishlist") {
    toggleWishlist(id);
  }
});

// CART FUNCTIONS

function addToCart(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }

  saveCart();
  renderCart();
  showToast(product.name + " added to your cart!");
}

function renderCart() {
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  cartCount.textContent = quantity;
  cartSubtotal.textContent = formatPrice(subtotal);
  checkoutButton.disabled = cart.length === 0;

  if (!cart.length) {
    cartItems.innerHTML = `
      <p class="empty-cart">Your cart is empty. Start exploring!</p>
    `;
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return "";

    return `
      <div class="cart-item">
        <img class="cart-item-image" src="${product.image}" alt="${product.name}">

        <div class="cart-item-info">
          <h4>${product.name}</h4>
          <p>${formatPrice(product.price)}</p>

          <div class="quantity-controls">
            <button data-action="decrease" data-id="${product.id}" aria-label="Decrease quantity">−</button>
            <span>${item.quantity}</span>
            <button data-action="increase" data-id="${product.id}" aria-label="Increase quantity">+</button>
          </div>
        </div>

        <button class="remove-item" data-action="remove" data-id="${product.id}">
          Remove
        </button>
      </div>
    `;
  }).join("");
}

cartItems.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;
  const item = cart.find(entry => entry.id === id);

  if (!item) return;

  if (action === "increase") {
    item.quantity++;
  }

  if (action === "decrease") {
    item.quantity--;

    if (item.quantity <= 0) {
      cart = cart.filter(entry => entry.id !== id);
    }
  }

  if (action === "remove") {
    cart = cart.filter(entry => entry.id !== id);
    showToast("Product removed from cart.");
  }

  saveCart();
  renderCart();
});

// CART OPEN / CLOSE

function openCart() {
  cartOverlay.classList.add("open");
  cartDrawer.classList.add("open");
}

function hideCart() {
  cartOverlay.classList.remove("open");
  cartDrawer.classList.remove("open");
}

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", hideCart);
cartOverlay.addEventListener("click", hideCart);
continueShopping.addEventListener("click", hideCart);

// PRODUCT DETAILS

function showProductDetails(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;

  const discount = Math.round(
    (1 - product.price / product.oldPrice) * 100
  );

  productDetails.innerHTML = `
    <div class="product-detail-layout">
      <img class="product-detail-image" src="${product.image}" alt="${product.name}">

      <div class="product-detail-info">
        <span class="product-category">${product.category}</span>
        <h2>${product.name}</h2>
        <div class="product-rating">★ ${product.rating} / 5</div>
        <p>${product.description}</p>

        <div class="detail-price">
          ${formatPrice(product.price)}
          <span class="old-price">${formatPrice(product.oldPrice)}</span>
        </div>

        <p class="product-category">${discount}% discount</p>

        <div class="detail-actions">
          <button class="primary-button" id="detailAddButton">Add to Cart</button>
          <button class="view-details" id="detailWishlistButton">♡ Wishlist</button>
        </div>
      </div>
    </div>
  `;

  productModal.classList.add("open");

  $("detailAddButton").addEventListener("click", () => {
    addToCart(id);
  });

  $("detailWishlistButton").addEventListener("click", () => {
    toggleWishlist(id);
    $("detailWishlistButton").textContent =
      wishlist.includes(id) ? "♥ Wishlisted" : "♡ Wishlist";
  });
}

function hideProductDetails() {
  productModal.classList.remove("open");
}

closeProductModal.addEventListener("click", hideProductDetails);

productModal.addEventListener("click", event => {
  if (event.target === productModal) hideProductDetails();
});

// WISHLIST

function toggleWishlist(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;

  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(item => item !== id);
    showToast("Removed from wishlist.");
  } else {
    wishlist.push(id);
    showToast("Added to wishlist!");
  }

  saveWishlist();
  renderWishlist();
  displayProducts();
}

function renderWishlist() {
  wishlistCount.textContent = wishlist.length;

  if (!wishlist.length) {
    wishlistItems.innerHTML = `
      <p class="empty-cart">Your wishlist is empty.</p>
    `;
    return;
  }

  wishlistItems.innerHTML = wishlist.map(id => {
    const product = products.find(item => item.id === id);
    if (!product) return "";

    return `
      <div class="wishlist-row">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <strong>${product.name}</strong>
          <span>${formatPrice(product.price)}</span>
        </div>
        <button data-action="remove-wishlist" data-id="${id}">Remove</button>
      </div>
    `;
  }).join("");
}

wishlistItems.addEventListener("click", event => {
  const button = event.target.closest("[data-action='remove-wishlist']");
  if (!button) return;

  const id = Number(button.dataset.id);
  wishlist = wishlist.filter(item => item !== id);

  saveWishlist();
  renderWishlist();
  displayProducts();
  showToast("Removed from wishlist.");
});

wishlistButton.addEventListener("click", () => {
  renderWishlist();
  wishlistModal.classList.add("open");
});

closeWishlistModal.addEventListener("click", () => {
  wishlistModal.classList.remove("open");
});

wishlistModal.addEventListener("click", event => {
  if (event.target === wishlistModal) {
    wishlistModal.classList.remove("open");
  }
});

// CHECKOUT

checkoutButton.addEventListener("click", () => {
  if (!cart.length) return;

  const subtotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  checkoutTotal.textContent = formatPrice(subtotal);
  checkoutMessage.textContent = "";
  checkoutForm.reset();

  hideCart();
  checkoutModal.classList.add("open");
});

function hideCheckout() {
  checkoutModal.classList.remove("open");
}

closeModal.addEventListener("click", hideCheckout);

checkoutModal.addEventListener("click", event => {
  if (event.target === checkoutModal) hideCheckout();
});

checkoutForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!cart.length) return;

  const name = $("customerName").value.trim();

  if (!name) return;

  checkoutMessage.textContent =
    `Thank you, ${name}! Your demo order has been placed successfully.`;

  cart = [];
  saveCart();
  renderCart();
  checkoutForm.reset();

  showToast("Demo order completed successfully!");
});

// KEYBOARD SUPPORT

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    hideCart();
    hideCheckout();
    hideProductDetails();
    wishlistModal.classList.remove("open");
  }
});

// INITIAL DISPLAY

$("year").textContent = new Date().getFullYear();

displayProducts();
renderCart();
renderWishlist();