// addToCart.js - Lógica para agregar productos al carrito con prompt de cantidad

function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
  let cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += product.quantity;
  } else {
    cart.push(product);
  }
  setCart(cart);
}

// Delegar evento para todos los botones "Add to Cart"
document.addEventListener('click', function(e) {
  if (e.target && e.target.matches('.add-to-cart-btn')) {
    const btn = e.target;
    const productId = btn.getAttribute('data-id');
    const productName = btn.getAttribute('data-name');
    const productPrice = parseFloat(btn.getAttribute('data-price'));
    const productImage = btn.getAttribute('data-image');
    let quantity = parseInt(prompt('¿Cuántos quieres agregar?', '1'), 10);
    if (isNaN(quantity) || quantity < 1) quantity = 1;
    addToCart({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity
    });
    alert('Producto agregado al carrito');
  }
});
