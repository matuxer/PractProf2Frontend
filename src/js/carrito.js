// carrito.js - Manejo del carrito en localStorage y renderizado en carrito.html

function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  setCart(cart);
}

function updateCartQuantity(productId, quantity) {
  let cart = getCart();
  cart = cart.map(item => item.id === productId ? { ...item, quantity } : item);
  setCart(cart);
}

function renderCart() {
  const cart = getCart();
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  let subtotal = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<tr><td colspan="4" class="text-center py-8">El carrito está vacío.</td></tr>';
    document.querySelector('.summary-subtotal').textContent = '$0.00';
    document.querySelector('.summary-total').textContent = '$0.00';
    return;
  }

  cart.forEach(product => {
    const total = product.price * product.quantity;
    subtotal += total;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="px-1 py-4">
        <div class="flex items-center flex-col sm:flex-row text-center sm:text-left">
          <img class="h-16 w-16 md:h-24 md:w-24 sm:mr-8 mb-4 sm:mb-0" src="${product.image}" alt="Product image">
          <p class="text-sm md:text-base md:font-semibold">${product.name}</p>
        </div>
      </td>
      <td class="px-1 py-4 text-center">$${product.price.toFixed(2)}</td>
      <td class="px-1 py-4 text-center">
        <div class="flex items-center justify-center">
          <button class="cart-decrement border border-primary bg-primary text-white hover:bg-transparent hover:text-primary rounded-full w-10 h-10 flex items-center justify-center" data-id="${product.id}">-</button>
          <p class="quantity text-center w-8">${product.quantity}</p>
          <button class="cart-increment border border-primary bg-primary text-white hover:bg-transparent hover:text-primary rounded-full w-10 h-10 flex items-center justify-center" data-id="${product.id}">+</button>
        </div>
      </td>
      <td class="px-1 py-4 text-right">$${total.toFixed(2)} <button class="remove-from-cart text-red-500 ml-2" data-id="${product.id}"><i class="fas fa-trash"></i></button></td>
    `;
    cartItems.appendChild(row);
  });

  document.querySelector('.summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
  // Taxes and shipping are static for now
  const taxes = subtotal * 0.1;
  const total = subtotal + taxes;
  document.querySelector('.summary-total').textContent = `$${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function() {
  renderCart();

  document.getElementById('cart-items').addEventListener('click', function(e) {
    if (e.target.classList.contains('cart-increment')) {
      const id = e.target.getAttribute('data-id');
      let cart = getCart();
      cart = cart.map(item => item.id == id ? { ...item, quantity: item.quantity + 1 } : item);
      setCart(cart);
      renderCart();
    }
    if (e.target.classList.contains('cart-decrement')) {
      const id = e.target.getAttribute('data-id');
      let cart = getCart();
      cart = cart.map(item => item.id == id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item);
      setCart(cart);
      renderCart();
    }
    if (e.target.classList.contains('remove-from-cart') || e.target.closest('.remove-from-cart')) {
      const id = e.target.getAttribute('data-id') || e.target.closest('.remove-from-cart').getAttribute('data-id');
      removeFromCart(id);
      renderCart();
    }
  });

  // Vaciar carrito
  const emptyBtn = document.querySelector('button:contains("Empty Cart")');
  if (emptyBtn) {
    emptyBtn.addEventListener('click', function() {
      setCart([]);
      renderCart();
    });
  }
});
