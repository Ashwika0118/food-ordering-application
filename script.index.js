// Mock Data for Categories & Food Items
const categoriesData = [
    { id: 'all', name: 'All', icon: 'fa-burger' },
    { id: 'burger', name: 'Burgers', icon: 'fa-burger' },
    { id: 'pizza', name: 'Pizza', icon: 'fa-pizza-slice' },
    { id: 'sushi', name: 'Sushi', icon: 'fa-fish' },
    { id: 'dessert', name: 'Desserts', icon: 'fa-ice-cream' },
    { id: 'drinks', name: 'Drinks', icon: 'fa-cup-straw' }
];

const foodData = [
    {
        id: 1,
        title: 'Classic Cheeseburger',
        category: 'burger',
        price: 8.99,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
        description: 'Juicy beef patty with melted cheddar cheese, fresh lettuce, and special sauce.'
    },
    {
        id: 2,
        title: 'Pepperoni Supreme Pizza',
        category: 'pizza',
        price: 14.99,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80',
        description: 'Loaded with double pepperoni, mozzarella cheese, and rich tomato herb sauce.'
    },
    {
        id: 3,
        title: 'Salmon Sushi Roll',
        category: 'sushi',
        price: 12.50,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80',
        description: 'Fresh Atlantic salmon wrapped around seasoned sushi rice and nori.'
    },
    {
        id: 4,
        title: 'Bacon Double Burger',
        category: 'burger',
        price: 10.99,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=500&q=80',
        description: 'Double beef patties with crispy smoky bacon and melted Swiss cheese.'
    },
    {
        id: 5,
        title: 'Margherita Pizza',
        category: 'pizza',
        price: 11.99,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=500&q=80',
        description: 'Traditional Italian pizza with fresh mozzarella, tomatoes, and basil leaves.'
    },
    {
        id: 6,
        title: 'Chocolate Lava Cake',
        category: 'dessert',
        price: 6.99,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80',
        description: 'Warm chocolate cake with a gooey molten chocolate center served with vanilla ice cream.'
    },
    {
        id: 7,
        title: 'Strawberry Milkshake',
        category: 'drinks',
        price: 4.99,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80',
        description: 'Rich and creamy strawberry shake topped with whipped cream and fresh strawberries.'
    },
    {
        id: 8,
        title: 'Dragon Roll Sushi',
        category: 'sushi',
        price: 15.99,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=500&q=80',
        description: 'Eel and cucumber inside, topped with sliced avocado and sweet eel sauce.'
    }
];

// App State
let cart = [];
let activeCategory = 'all';
let searchQuery = '';
let currentSort = 'default';

// DOM Elements
const categoriesContainer = document.getElementById('categoriesContainer');
const foodGrid = document.getElementById('foodGrid');
const sectionTitle = document.getElementById('sectionTitle');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

const cartToggleBtn = document.getElementById('cartToggleBtn');
const cartOverlay = document.getElementById('cartOverlay');
const cartDrawer = document.getElementById('cartDrawer');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartCount = document.getElementById('cartCount');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const emptyCartMsg = document.getElementById('emptyCartMsg');
const cartFooter = document.getElementById('cartFooter');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

const modalOverlay = document.getElementById('modalOverlay');
const modalCloseBtn = document.getElementById('modalCloseBtn');

// Initialize App
function init() {
    renderCategories();
    renderFoodItems();
    setupEventListeners();
}

// Render Categories
function renderCategories() {
    categoriesContainer.innerHTML = categoriesData.map(cat => `
        <div class="category-card ${activeCategory === cat.id ? 'active' : ''}" onclick="selectCategory('${cat.id}')">
            <i class="fa-solid ${cat.icon}"></i>
            <span>${cat.name}</span>
        </div>
    `).join('');
}

// Select Category Filter
function selectCategory(catId) {
    activeCategory = catId;
    const catObj = categoriesData.find(c => c.id === catId);
    sectionTitle.innerText = catId === 'all' ? 'Featured Dishes' : `${catObj.name} Selection`;
    renderCategories();
    renderFoodItems();
}

// Render Food Items with Filter & Sort
function renderFoodItems() {
    let filtered = foodData.filter(item => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Sorting logic
    if (currentSort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    if (filtered.length === 0) {
        foodGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #a4b0be; padding: 40px;">No delicious items found matching your criteria.</p>`;
        return;
    }

    foodGrid.innerHTML = filtered.map(item => `
        <div class="food-card">
            <div class="food-img-container">
                <img src="${item.image}" alt="${item.title}">
                <div class="food-rating">
                    <i class="fa-solid fa-star"></i> ${item.rating}
                </div>
            </div>
            <div class="food-details">
                <h3 class="food-title">${item.title}</h3>
                <p class="food-desc">${item.description}</p>
                <div class="food-footer">
                    <span class="food-price">$${item.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add Item to Cart
function addToCart(itemId) {
    const item = foodData.find(f => f.id === itemId);
    const existing = cart.find(c => c.id === itemId);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    updateCartUI();
    openCart();
}

// Update Cart UI & Calculations
function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.innerText = totalCount;

    if (cart.length === 0) {
        emptyCartMsg.style.display = 'block';
        cartFooter.style.display = 'none';
        cartItemsContainer.innerHTML = '';
        cartItemsContainer.appendChild(emptyCartMsg);
        return;
    }

    emptyCartMsg.style.display = 'none';
    cartFooter.style.display = 'block';

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item-card">
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `).join('');

    const subtotalVal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const deliveryFeeVal = subtotalVal > 0 ? 2.99 : 0;
    const totalVal = subtotalVal + deliveryFeeVal;

    cartSubtotal.innerText = `$${subtotalVal.toFixed(2)}`;
    document.getElementById('deliveryFee').innerText = `$${deliveryFeeVal.toFixed(2)}`;
    cartTotal.innerText = `$${totalVal.toFixed(2)}`;
}

// Change Quantity in Cart
function changeQty(itemId, delta) {
    const item = cart.find(c => c.id === itemId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(c => c.id !== itemId);
    }
    updateCartUI();
}

// Remove Item from Cart
function removeFromCart(itemId) {
    cart = cart.filter(c => c.id !== itemId);
    updateCartUI();
}

// Cart Drawer Open/Close Controls
function openCart() {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
}

function closeCart() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// Event Listeners Setup
function setupEventListeners() {
    cartToggleBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderFoodItems();
    });

    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderFoodItems();
    });

    checkoutBtn.addEventListener('click', () => {
        closeCart();
        modalOverlay.classList.add('active');
        cart = [];
        updateCartUI();
    });

    modalCloseBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });
}

// Run on load
window.addEventListener('DOMContentLoaded', init);