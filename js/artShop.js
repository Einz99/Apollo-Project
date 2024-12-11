const addToCartButtons = document.querySelectorAll('.addtocart');
const cartItemCount = document.querySelector('.media-icons span');

let cartItems = [];
let CartFromPrevious = sessionStorage.getItem('cartItems')
let previousItems = CartFromPrevious ? JSON.parse(CartFromPrevious) : [];
cartItems=previousItems;
let Items = 0;
let totalItems;

const getJsonData = async () => {
    const res = await fetch('../../../json/shops.json');
    const data = await res.json();
    return data;
}

const filterByArtist = async (artistName) => {
    const payload = await getJsonData();

    // Filter products by ArtName
    const filteredProducts = payload.ArtistProduct.filter(product => product.ArtName === artistName);
    totalItems = filteredProducts.length;
    // Split filtered products into chunks of 6 items per group
    const chunkArray = (array, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const productChunks = chunkArray(filteredProducts, 6);

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

    // Populate the items-container with filtered products
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
    let cartCount = cartItems.length; // Initialize cart count based on previous items

    // Update the cart count in the UI
    cartItemCount.textContent = cartCount;

    // Reload previous items to the cart if any
    if (cartItems.length > 0) {
        console.log("Restoring previous cart items:", cartItems);
    }

    const addToCartButtons = document.querySelectorAll(".addtocart");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const item = event.target.closest(".item");
            const itemName = item.querySelector(".itemDesc").textContent.trim();
            const itemPrice = itemName.match(/P(\d+)/)[1]; // Extract price from text
            console.log(`Added to cart: ${itemName} with price P${itemPrice}`);

            // Add the item and its price to the cart array
            cartItems.push({ name: itemName, price: itemPrice });

            // Increment cart count and update the span
            cartCount++;
            cartItemCount.textContent = cartCount;

            // Save updated cart items to sessionStorage
            sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        });
    });
};

// Call the function to display products

let artistName = sessionStorage.getItem('FromArtist');

filterByArtist(artistName)

const container = document.querySelector('.swipe-container');
const slides = document.querySelectorAll('.swipe');
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

