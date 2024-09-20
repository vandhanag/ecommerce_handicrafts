document.addEventListener('DOMContentLoaded', () => {
    const deliveryCharge = 10.00;

    // Load cart from localStorage or set an empty array if not available
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    function displayCartItems() {
        const cartTableBody = document.getElementById('cart-items');
        cartTableBody.innerHTML = ''; // Clear existing items

        let total = 0;

        cartItems.forEach(item => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;"></td>
                <td>${item.name}</td>
                <td class="quantity-controls">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="delete-btn" onclick="removeProduct(${item.id})">Remove</button></td>
            `;
            
            cartTableBody.appendChild(row);
            
            total += item.price * item.quantity;
        });

        document.getElementById('total-price').textContent = `Total Price: $${total.toFixed(2)}`;
    }

    function increaseQuantity(productId) {
        const item = cartItems.find(item => item.id === productId);
        if (item) {
            item.quantity += 1;
            saveCart();
            displayCartItems();
        }
    }

    function decreaseQuantity(productId) {
        const item = cartItems.find(item => item.id === productId);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            saveCart();
            displayCartItems();
        } else if (item && item.quantity === 1) {
            removeProduct(productId);
        }
    }

    function removeProduct(productId) {
        const index = cartItems.findIndex(item => item.id === productId);
        if (index !== -1) {
            cartItems.splice(index, 1);
            saveCart();
            displayCartItems();
        }
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cartItems)); // Save the cart to localStorage
    }

    function placeOrder() {
        const deliveryAddress = document.getElementById('delivery-address').value;
        const paymentType = document.getElementById('payment-type').value;

        if (!deliveryAddress) {
            alert('Please enter a delivery address.');
            return;
        }

        const totalCartPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const totalPriceWithDelivery = totalCartPrice + deliveryCharge;

        document.getElementById('order-confirmation').innerHTML = `
            <h2>Order Placed Successfully!</h2>
            <p>Your order has been placed.</p>
            <p>Delivery Address: ${deliveryAddress}</p>
            <p>Payment Method: ${paymentType}</p>
            <p>Total Cost: $${totalPriceWithDelivery.toFixed(2)}</p>
        `;

        document.getElementById('order-confirmation').style.display = 'block';

        // Clear the cart after placing the order
        localStorage.removeItem('cart');
    }

    // Initial call to display cart items
    displayCartItems();

    document.querySelector('.place-order').addEventListener('click', placeOrder);
});
