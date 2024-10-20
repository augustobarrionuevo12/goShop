document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();

            const productId = button.getAttribute('data-product-id');
            const quantity = 1; // Puedes hacer que sea dinámico si tienes campos de cantidad

            // Obtener o crear el cartId
            const cartId = await getOrCreateCartId();

            if (!cartId) {
                console.error('Carrito no especificado');
                return;
            }

            try {
                const response = await fetch('/carts/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ cartId, productId, quantity })
                });

                const data = await response.json();
                if (response.ok) {
                    console.log('Producto agregado:', data);
                    // Aquí podrías actualizar la UI con un mensaje de éxito
                } else {
                    console.error('Error:', data.message);
                }
            } catch (error) {
                console.error('Error al agregar producto al carrito:', error);
            }
        });
    });
});

// Función para obtener o crear el cartId
async function getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
        try {
            const response = await fetch('/carts/create', { method: 'POST' });
            const data = await response.json();
            if (response.ok) {
                cartId = data.cartId;
                localStorage.setItem('cartId', cartId);
            } else {
                console.error('Error al crear carrito:', data.message);
            }
        } catch (error) {
            console.error('Error en la solicitud de creación del carrito:', error);
        }
    }
    return cartId;
}
