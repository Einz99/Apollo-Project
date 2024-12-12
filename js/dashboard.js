document.addEventListener('DOMContentLoaded', function() {

    // Populate the HTML
    const orders = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    const orderList = document.querySelector('.ordern');

    if (orderList) {
        orders.forEach(order => {
            const orderItem = document.createElement('li');
            orderItem.innerHTML = `
                <ul>
                    <p class="ordern">${order.name}</p>
                    <p class="price">P${order.price}</p>
                </ul>
            `;
            orderList.appendChild(orderItem);
        });
    } else {
        console.error("Order list element not found!");
    }
});