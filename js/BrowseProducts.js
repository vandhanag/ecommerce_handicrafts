document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));
            const productId = Date.now(); // Unique ID for the product (could be replaced with actual ID if available)
            
            // Create product object
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1,
                image: button.previousElementSibling.src // Assuming image is the previous sibling of the button
            };
            
            // Get existing cart from localStorage or initialize empty array
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Check if product already exists in cart
            const existingProductIndex = cart.findIndex(item => item.name === productName);
            if (existingProductIndex > -1) {
                // Update quantity if product already in cart
                cart[existingProductIndex].quantity += 1;
            } else {
                // Add new product to cart
                cart.push(product);
            }
            
            // Save updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart summary
            updateCartSummary();
        });
    });

    function updateCartSummary() {
        const productCount = document.getElementById('product-count');
        const totalCost = document.getElementById('total-cost');
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalItems = 0;
        let totalAmount = 0;

        cart.forEach(item => {
            totalItems += item.quantity;
            totalAmount += item.price * item.quantity;
        });

        productCount.textContent = totalItems;
        totalCost.textContent = totalAmount.toFixed(2);
    }

    // Initial call to update cart summary
    updateCartSummary();
});
