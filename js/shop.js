const addToCartButtons = document.querySelectorAll('.addtocart');
const cartItemCount = document.querySelector('.media-icons span');

    let cartItems = [];
    let CartFromPrevious = sessionStorage.getItem('cartItems')
    let previousItems = CartFromPrevious ? JSON.parse(CartFromPrevious) : [];
    cartItems=previousItems;
    let Items = 0;
    let totalItems;

    const getJsonData = async () => {
        const res = await fetch('../../json/shops.json');
        const data = await res.json();
        return data;
    }
    const displayProducts = async () => {
        const payload = await getJsonData();
    
        // Split products into chunks of 6 items per group
        const chunkArray = (array, chunkSize) => {
            const chunks = [];
            for (let i = 0; i < array.length; i += chunkSize) {
                chunks.push(array.slice(i, i + chunkSize));
            }
            return chunks;
        };
        totalItems = payload.ArtistProduct.length;
    
        const productChunks = chunkArray(payload.ArtistProduct, 6);
    
        // Generate HTML for each chunk
        let displayData = productChunks.map((chunk) => {
            const items = chunk.map((object) => {
                const { ArtName, ProdPic, ProdName, ProdPrice } = object;
    
                return `
                    <div class="item">
                        <div class="itemImg">
                            <img src="${ProdPic}" alt="${ProdName}">
                            <div class="addtocart"><i class="fa-solid fa-cart-shopping"></i></div>
                        </div>
                        <div class="itemDesc">${ArtName} - ${ProdName} <br> P${ProdPrice}</div>
                    </div>
                `;
            }).join("");
    
            return `<div class="items">${items}</div>`;
        }).join("");
    
        // Populate the items-container
        const itemsContainer = document.querySelector(".items-container");
        itemsContainer.innerHTML = displayData;
    
        attachAddToCartEventListeners();
    };

// Attach event listeners for add-to-cart buttons
const attachAddToCartEventListeners = () => {
    const cartItemCount = document.querySelector('.media-icons span');

    // Retrieve previous cart items from sessionStorage
    let CartFromPrevious = sessionStorage.getItem('cartItems');
    let previousItems = CartFromPrevious ? JSON.parse(CartFromPrevious) : [];
    let cartItems = previousItems;

    // Update the cart count in the UI based on the total quantity
    const updateCartCount = () => {
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartItemCount.textContent = totalQuantity;
    };

    updateCartCount(); // Initialize the count on load

    const addToCartButtons = document.querySelectorAll(".addtocart");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const item = event.target.closest(".item");
            const itemName = item.querySelector(".itemDesc").textContent.trim();
            const itemPrice = parseFloat(itemName.match(/P(\d+)/)[1]); // Extract price from text

            // Check if the item is already in the cart
            const existingItem = cartItems.find(cartItem => cartItem.name === itemName);

            if (existingItem) {
                // If item exists, increment its quantity
                existingItem.quantity++;
            } else {
                // If item doesn't exist, add it with quantity 1
                cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            // Update cart count and save updated cart to sessionStorage
            updateCartCount();
            sessionStorage.setItem('cartItems', JSON.stringify(cartItems));

            console.log(`Added to cart: ${itemName} | Price: P${itemPrice}`);
        });
    });
};
    
    // Call the function to display products
    displayProducts();

const container = document.querySelector('.swipe-container');
const slides = document.querySelectorAll('.swipe');
const circles = document.querySelectorAll('.circle');
const prodItems = document.querySelector('.items-container');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let currentIndex = 0;
let prodIndex = 0;

// Function to center the active slide
function updateActiveSlide(index) {
    // Remove the "active" class from all slides
    slides.forEach((slide) => slide.classList.remove('active'));

    // Add the "active" class to the selected slide
    slides[index].classList.add('active');

    offset = 120 - (60 * index);
    container.style.transform = `translateX(${offset}vw)`;
}

// Click event to select a slide
slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
        currentIndex = index;
        updateActiveSlide(currentIndex);
    });
});

circles.forEach((circle, index) => {
    circle.addEventListener('click', () => {
        currentIndex = index;
        updateActiveSlide(currentIndex);
    });
});

function switchItemList(index)
{   
    offset = 7.5 - (135 * index);
    prodItems.style.transform = `translateX(${offset}vw)`;
}

prev.addEventListener('click', () => {
    if (prodIndex > 0) 
    {
        --prodIndex;
        switchItemList(prodIndex)
    }
});
next.addEventListener('click', () => {
    if (prodIndex !== Math.floor(totalItems/6))
    {
        ++prodIndex;
        switchItemList(prodIndex);
    }
});

// Initialize the first slide as active
updateActiveSlide(currentIndex);
switchItemList(prodIndex);

