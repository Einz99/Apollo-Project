const displayCartItems = () => {
    // Retrieve cart items from sessionStorage
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    
    // Find the container where the cart list will be displayed
    const itemsContainer = document.querySelector('.items');
    
    if (!itemsContainer) {
        console.error('Cart container element not found.');
        return;
    }

    // Initialize variables for total quantity and total price
    let totalQuantity = 0;
    let totalPrice = 0;

    // Generate HTML for each item in the cart
    const cartHTML = cartItems.map(item => {
        totalQuantity += item.quantity; // Add item quantity to total
        totalPrice += item.quantity * item.price; // Add item total price to grand total

        return `
            <div class="cart-item">
                <span>${item.quantity}x - ${item.name}</span>
                <span>P${(item.quantity * item.price).toLocaleString()}</span>
            </div>
        `;
    }).join('');

    // Add the summary section for total quantity and price
    const summaryHTML = `
        <div class="cart-summary">
            <div>______________________________</div>
            <div><span>Quantity: </span><span>${totalQuantity}x</span></div>
            <div><span>Total: </span><span>P${totalPrice.toLocaleString()}</span></div>
        </div>
    `;

    // Update the cart container with the generated HTML
    itemsContainer.innerHTML = `<h1>Orders</h1>` + cartHTML + summaryHTML;
};

// Example: Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});