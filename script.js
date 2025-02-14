// Product data
const products = [
    {
        id: 1,
        name: "Classic Automatic Umbrella",
        price: 150.00, // Updated price
        category: "automatic",
        image: "1.jpg",
        features: ["Auto Open/Close", "Windproof", "Water-Repellent"]
    },
    {
        id: 2,
        name: "Premium Golf Umbrella",
        price: 170.00, // Updated price
        category: "golf",
        image: "2.jpg",
        features: ["Extra Large Canopy", "Storm-Proof", "UV Protection"]
    },
    {
        id: 3,
        name: "Compact Travel Umbrella",
        price: 200.00, // Updated price
        category: "compact",
        image: "3.jpg",
        features: ["Lightweight", "Foldable", "Quick-Dry"]
    },
    {
        id: 4,
        name: "Deluxe Automatic Umbrella",
        price: 260.00, // Updated price
        category: "automatic",
        image: "4.jpg",
        features: ["One-Touch Open", "Ergonomic Handle", "Reinforced Frame"]
    },
    {
        id: 5,
        name: "Professional Golf Umbrella",
        price: 120.00, // Updated price
        category: "golf",
        image: "5.jpg",
        features: ["68-Inch Coverage", "Fiberglass Frame", "Double Canopy"]
    },
    {
        id: 6,
        name: "Mini Compact Umbrella",
        price: 150.00, // Updated price
        category: "compact",
        image: "6.jpg",
        features: ["Ultra Compact", "8 Ribs", "Slip-Resistant Handle"]
    }
];

let cart = [];
let currentFilter = 'all';

// Function to format price in PHP with commas
function formatPrice(price) {
    return `₱${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Display products
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div> <!-- Converted to PHP with commas -->
                <div class="product-features">
                    ${product.features.map(feature => `
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Filter products
function filterProducts(category) {
    currentFilter = category;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    displayProducts();
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

// Update cart
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div> <!-- Converted to PHP with commas -->
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total); // Converted to PHP with commas

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = itemCount;
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        cart = cart.filter(item => item.id !== productId);
    } else {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
        }
    }
    updateCart();
}

// Toggle cart sidebar
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase!');
    cart = [];
    updateCart();
    toggleCart();
}

// Initialize
displayProducts();