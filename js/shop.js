const addToCartButtons = document.querySelectorAll('.addtocart');
const cartItemCount = document.querySelector('.media-icons span');

    let cartItems = [];
    let CartFromPrevious = sessionStorage.getItem('cartItems')
    let previousItems = CartFromPrevious ? JSON.parse(CartFromPrevious) : [];
    cartItems=previousItems;

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
        const addToCartButtons = document.querySelectorAll(".addtocart");
        addToCartButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const item = event.target.closest(".item");
                const itemName = item.querySelector(".itemDesc").textContent.trim();
                console.log(`Added to cart: ${itemName}`);
                // Add your cart logic here
            });
        });
    };
    
    // Call the function to display products
    displayProducts();
    




















const container = document.querySelector('.swipe-container');
const slides = document.querySelectorAll('.swipe');
const circles = document.querySelectorAll('.circle');
const Items = document.querySelectorAll('.items');
const prodItems = document.querySelector('.items-container');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let currentIndex = 1;
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
    if (index < 1) {
        prev.classList.add('disable');
    }
    else
    {
        prev.classList.remove('disable');
    }
    if(index === Items.length-1){
        next.classList.add('disable');
    }
    else
    {
        next.classList.remove('disable');
    }
    offset = 7.5 - (135 * index);
    prodItems.style.transform = `translateX(${offset}vw)`;
}

prev.addEventListener('click', () => {
    if (prodItems === 0) 
    {return}
    --prodIndex;
    switchItemList(prodIndex);
});
next.addEventListener('click', () => {
    if (prodItems === Items.length - 1)
    {return}
    ++prodIndex;
    switchItemList(prodIndex);
});

// Initialize the first slide as active
updateActiveSlide(currentIndex);
switchItemList(prodIndex);

