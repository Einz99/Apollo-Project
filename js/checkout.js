const cartItemList = document.getElementById('items')
const total = document.getElementById('total')


let TotalAmount = 0;
let cartItems = [];
let CartFromPrevious = sessionStorage.getItem('cartItems')
let previousItems = CartFromPrevious ? JSON.parse(CartFromPrevious) : [];
cartItems=previousItems;
console.log(cartItems)

const updateCartItemList = () => {
    cartItemList.innerHTML = '';
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item', 'individual-cart-item');
        cartItem.innerHTML = `
            <span class="quantity">${item.quantity} | ${item.name}</span>
            <span class="cart-item-price">P${(item.price * item.quantity).toFixed(2)}</span>
            <button class="QuantityBtn plus"><i class="fa-solid fa-plus"></i></button>
            <button class="QuantityBtn minus"><i class="fa-solid fa-minus"></i></button>
        `;
        cartItemList.append(cartItem);

      
        cartItem.querySelector('.plus').addEventListener('click', () => {
            item.quantity++;
            updateCartItemList(); 
        });

        // Add event listener to the minus button
        cartItem.querySelector('.minus').addEventListener('click', () => {
            item.quantity--;
            if (item.quantity < 1) {
                const confirmation = document.getElementById('confirm');
                confirmation.classList.add('active');
                const yes = document.getElementById('yes');
                const no = document.getElementById('no');

                
                yes.outerHTML = yes.outerHTML;
                no.outerHTML = no.outerHTML;

              
                document.getElementById('yes').addEventListener('click', () => {
                    cartItems = cartItems.filter((_, itemIndex) => itemIndex !== index);
                    confirmation.classList.remove('active');
                    updateCartItemList(); 
                });
                document.getElementById('no').addEventListener('click', () => {
                    confirmation.classList.remove('active');
                    item.quantity = 1; 
                    updateCartItemList(); 
                });
            } else {
                updateCartItemList();  
            }
        });
    })
    var totalhtml = `<p>Total: </p><p>${calculateTotalAmount()}</p>`

    total.innerHTML = totalhtml

};

const calculateTotalAmount = () => {
    let totalAmount = 0;
    cartItems.forEach(item => {
        totalAmount += item.price * item.quantity;
    });
    return totalAmount.toFixed(2);  // Returns the total amount with 2 decimal places
};

updateCartItemList()

const payment = document.getElementById('payment')
payment.innerHTML = `<h2>Calculation</h2><br><div class=pay>
                            <p>Total:</p><p>${calculateTotalAmount()}</p>
                            </div><br>
                            <div class=pay>
                            <p>Tax:</p><p>${(calculateTotalAmount() * 0.10).toFixed(2)}</p>
                            </div><br>
                            <div class=pay>
                            <p>Shipping Fee:</p><p>${(calculateTotalAmount() * 0.30).toFixed(2)}</p>
                            </div><br>
                            <div class=pay>
                            <p>Total:</p><p>${(calculateTotalAmount() * 1.4).toFixed(2)}</p>
                            </div><br>  
                            Select Payment Method
                            <select>
                            <option>GCash</option>
                            <option>Card</option>
                            </select>
                            <br>
                            <br>
                            <button type=submit class="paying" id="paying">Pay</button
                            `

const paying = document.getElementById('paying')
paying.addEventListener('click', () => {
    sessionStorage.clear()
    cartItems = []
    updateCartItemList()
})

const back = document.getElementById('back')
back.addEventListener('click', () => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    history.back();
})