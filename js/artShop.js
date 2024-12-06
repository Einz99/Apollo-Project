document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');

    let cartItems = [];
    let TotalAmount = 0;
    let CartFromPrevious = sessionStorage.getItem('cartItems')
    let previousItems = CartFromPrevious ? JSON.parse(CartFromPrevious) : [];
    cartItems=previousItems;
    

    const attachAddToCartEventListeners = () => {
        const newAddToCartButtons = document.querySelectorAll('.add-to-cart');
        newAddToCartButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const item = {
                    name: document.querySelectorAll('.card .card--title')[index].textContent,
                    price: parseFloat(document.querySelectorAll('.price')[index].textContent.slice(1)),
                    quantity: 1,
                };

                const existingItem = cartItems.find(
                    (cartItem) => cartItem.name === item.name,
                );
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cartItems.push(item);
                }
                
                TotalAmount += item.price;
                swal("Item Successfully Added to Cart", "", "success");
                updateCartUI();
            });
        });
    };

    const updateCartUI = () => {
        updateCartItemCount(cartItems.length);
        updateCartItemList();
        updateCartTotal();
    };

    const updateCartItemCount = (count) => {
        cartItemCount.textContent = count;
    };

    const updateCartItemList = () => {
        cartItemList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-item');
            cartItem.innerHTML = `
                <span>${item.quantity} | ${item.name}</span>
                <span class="cart-item-price">P${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item" data-index="${index}"><i class="fa-solid fa-times"></i></button>
            `;
            cartItemList.append(cartItem);
        });

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                removeItemFromCart(index);
            });
        });
    };

    const removeItemFromCart = (index) => {
        const removedItem = cartItems.splice(index, 1)[0];
        TotalAmount -= removedItem.price * removedItem.quantity;
        updateCartUI();
    };

    const updateCartTotal = () => {
        cartTotal.textContent = `P${TotalAmount.toFixed(2)}`;
    };

    cartIcon.addEventListener('click', () => {
        sidebar.classList.add('open');
    });

    const closeButton = document.querySelector('.sidebar-close');
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });


    const scontainer = document.querySelector('#container');

    const getJsonData = async () => {
        const res = await fetch('../../json/shops.json');
        const data = await res.json();
        return data;
    }
    
    const displaySwipes = async (cat) => {
        const payload = await getJsonData();
        console.log(cat)
        Artist = sessionStorage.getItem('FromArtist')
        let displayData = payload.ArtistProduct
        .filter((eventData) => {
        if (eventData.ProdCat === cat && eventData.ArtName === Artist) {
            return eventData
        }
        }).map((object) => {
        const { ArtName, ProdPic, ProdName, ProdPrice, ProdCat } = object;
    
        return `
            <swiper-slide class="card">
            <img src="${ProdPic}" alt="">
            <h3 class="card--title">${ArtName} - ${ProdName}</h3>
            <div class="card--price">
            <div class="price">P${ProdPrice}</div>
            <i class="fa-solid fa-plus add-to-cart"></i>
            </div>
            </swiper-slide>
        `
        }).join("");
    
        scontainer.innerHTML = displayData;
        attachAddToCartEventListeners();
    }
    displaySwipes(1)

    cartItems.forEach(item => {
        TotalAmount += item.price * item.quantity
    }); 
    updateCartUI();

    const Merch = document.querySelector('#Merch');
    Merch.addEventListener('click', () => displaySwipes(1));

    const Album = document.querySelector('#Album');
    Album.addEventListener('click', () => displaySwipes(3));

    const Wardrobe = document.querySelector('#Wardrobe');
    Wardrobe.addEventListener('click', () => displaySwipes(2));

    const Events = document.querySelector('#Event');
    Events.addEventListener('click', () => displaySwipes(4));

    const back = document.querySelector('.backShop')
    back.addEventListener('click', () => {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems))
        window.location.href = "shop.html"
    })
});
