// carrito.js - Manejo del carrito en localStorage y renderizado en carrito.html

const API_URL = 'http://localhost:3001';

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

function isUserLoggedIn() {
  return localStorage.getItem('token') !== null;
}

function getUserData() {
  const userJson = localStorage.getItem('usuario');
  return userJson ? JSON.parse(userJson) : null;
}

async function finalizarCompra() {
  const cart = getCart();
  const usuario = getUserData();
  
  if (!usuario || !usuario.id) {
    showMessage('Error: No se pudo obtener la información del usuario', 'error');
    return;
  }
  
  if (cart.length === 0) {
    showMessage('El carrito está vacío', 'error');
    return;
  }
  
  // Preparar los items según el formato de la API
  const items = cart.map(item => ({
    productoId: parseInt(item.id),
    cantidad: item.quantity,
    precioUnitario: parseFloat(item.price)
  }));
  
  const requestBody = {
    clienteId: usuario.id,
    descuento: 0.00,
    items: items
  };
  
  // Mostrar loading en el botón
  const checkoutBtn = document.getElementById('checkout-btn-logged');
  const btnText = document.getElementById('checkout-btn-text');
  const spinner = document.getElementById('checkout-spinner');
  
  if (checkoutBtn) checkoutBtn.disabled = true;
  if (btnText) btnText.textContent = 'Procesando...';
  if (spinner) spinner.classList.remove('hidden');
  
  try {
    const response = await fetch(`${API_URL}/compra/finalizar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Error al finalizar la compra');
    }
    
    // Compra exitosa
    showMessage('¡Compra realizada exitosamente!', 'success');
    
    // Limpiar el carrito
    setCart([]);
    
    // Esperar un poco para que vea el mensaje y luego redirigir o recargar
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    
  } catch (error) {
    console.error('Error al finalizar compra:', error);
    showMessage(error.message || 'Error al procesar la compra. Por favor, intenta nuevamente.', 'error');
    
    // Restaurar el botón
    if (checkoutBtn) checkoutBtn.disabled = false;
    if (btnText) btnText.textContent = 'Finalizar compra';
    if (spinner) spinner.classList.add('hidden');
  }
}

function showMessage(message, type) {
  // Buscar si ya existe un contenedor de mensajes, si no, crearlo
  let messageContainer = document.getElementById('cart-message');
  
  if (!messageContainer) {
    messageContainer = document.createElement('div');
    messageContainer.id = 'cart-message';
    messageContainer.className = 'fixed top-20 right-4 z-50 max-w-md';
    document.body.appendChild(messageContainer);
  }
  
  const bgColor = type === 'success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700';
  const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
  
  messageContainer.innerHTML = `
    <div class="${bgColor} border-l-4 p-4 rounded shadow-lg">
      <div class="flex items-center">
        <i class="fas ${icon} mr-2"></i>
        <p class="font-medium">${message}</p>
      </div>
    </div>
  `;
  
  // Auto-ocultar después de 5 segundos
  setTimeout(() => {
    messageContainer.innerHTML = '';
  }, 5000);
}

function updateCheckoutButton() {
  const cart = getCart();
  const checkoutBtnLogged = document.getElementById('checkout-btn-logged');
  const checkoutBtnNotLogged = document.getElementById('checkout-btn-not-logged');
  
  // Si el carrito está vacío, ocultar ambos botones
  if (cart.length === 0) {
    if (checkoutBtnLogged) checkoutBtnLogged.classList.add('hidden');
    if (checkoutBtnNotLogged) checkoutBtnNotLogged.classList.add('hidden');
    return;
  }
  
  // Si hay items en el carrito, mostrar el botón apropiado
  if (isUserLoggedIn()) {
    // Usuario logueado - mostrar botón de finalizar compra
    if (checkoutBtnLogged) {
      checkoutBtnLogged.classList.remove('hidden');
      checkoutBtnLogged.classList.add('block');
    }
    if (checkoutBtnNotLogged) {
      checkoutBtnNotLogged.classList.add('hidden');
    }
  } else {
    // Usuario NO logueado - mostrar mensaje y botón de login
    if (checkoutBtnLogged) {
      checkoutBtnLogged.classList.add('hidden');
    }
    if (checkoutBtnNotLogged) {
      checkoutBtnNotLogged.classList.remove('hidden');
      checkoutBtnNotLogged.classList.add('block');
    }
  }
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
    updateCheckoutButton();
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
  
  // Actualizar botón de checkout según autenticación
  updateCheckoutButton();
  
  // Re-agregar el event listener después de actualizar el botón
  attachCheckoutListener();
}

function attachCheckoutListener() {
  const checkoutBtn = document.getElementById('checkout-btn-logged');
  
  if (checkoutBtn) {
    // Remover listener anterior si existe
    checkoutBtn.removeEventListener('click', handleCheckoutClick);
    // Agregar nuevo listener
    checkoutBtn.addEventListener('click', handleCheckoutClick);
  }
}

function handleCheckoutClick(e) {
  e.preventDefault();
  finalizarCompra();
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
