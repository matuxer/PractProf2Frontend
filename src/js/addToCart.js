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

// Modal HTML (solo se agrega una vez)
function ensureQuantityModal() {
  if (document.getElementById('quantity-modal')) return;
  const modal = document.createElement('div');
  modal.id = 'quantity-modal';
  modal.innerHTML = `
    <div class="fixed inset-0 bg-black bg-opacity-40 items-center justify-center z-50 hidden" id="quantity-modal-backdrop" style="display:none;">
      <div class="bg-white rounded-lg shadow-lg p-6 w-80 relative">
        <button id="close-quantity-modal" class="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
        <h2 class="text-lg font-semibold mb-4">¿Cuántos quieres agregar?</h2>
        <input type="number" id="quantity-input" class="border rounded w-full py-2 px-3 mb-4" min="1" value="1" />
        <button id="confirm-quantity-btn" class="bg-primary text-white px-4 py-2 rounded w-full">Agregar al carrito</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function showQuantityModal(product, onConfirm) {
  ensureQuantityModal();
  const backdrop = document.getElementById('quantity-modal-backdrop');
  const input = document.getElementById('quantity-input');
  input.value = 1;
  backdrop.classList.remove('hidden');
  backdrop.style.display = 'flex';

  function closeModal() {
  backdrop.classList.add('hidden');
  backdrop.style.display = 'none';
    document.getElementById('confirm-quantity-btn').removeEventListener('click', confirmHandler);
    document.getElementById('close-quantity-modal').removeEventListener('click', closeModal);
  }
  function confirmHandler() {
    let quantity = parseInt(input.value, 10);
    if (isNaN(quantity) || quantity < 1) quantity = 1;
    closeModal();
    onConfirm(quantity);
  }
  document.getElementById('confirm-quantity-btn').addEventListener('click', confirmHandler);
  document.getElementById('close-quantity-modal').addEventListener('click', closeModal);
}

document.addEventListener('click', function(e) {
  // Soporta tanto botones con clase add-to-cart-btn como los que tengan texto "Agregar al Carrito"
  let btn = e.target.closest('.add-to-cart-btn, button');
  if (btn && (btn.classList.contains('add-to-cart-btn') || btn.textContent.trim().toLowerCase().includes('agregar al carrito'))) {
    // Obtener datos del producto
    const productId = btn.getAttribute('data-id') || btn.dataset.id;
    const productName = btn.getAttribute('data-name') || btn.dataset.name || btn.getAttribute('data-title');
    const productPrice = parseFloat(btn.getAttribute('data-price') || btn.dataset.price);
    const productImage = btn.getAttribute('data-image') || btn.dataset.image;
    // Si no hay datos, intentar buscar en el DOM
    let name = productName, price = productPrice, image = productImage;
    if (!name || !price || !image) {
      // Buscar en el card padre
      const card = btn.closest('.swiper-slide, .product-card, .bg-white');
      if (card) {
        name = name || card.querySelector('a, .product-title')?.textContent?.trim();
        price = price || parseFloat(card.querySelector('.text-primary, .product-price')?.textContent?.replace(/[^\d.]/g, ''));
        image = image || card.querySelector('img')?.src;
      }
    }
    const product = {
      id: productId || name,
      name: name,
      price: price,
      image: image
    };
    showQuantityModal(product, function(quantity) {
      addToCart({ ...product, quantity });
      // Notificación simple
      if (window.Toastify) {
        Toastify({ text: 'Producto agregado al carrito', duration: 2000, gravity: 'top', position: 'right', backgroundColor: '#16a34a' }).showToast();
      } else {
        // Fallback
        const notif = document.createElement('div');
        notif.textContent = 'Producto agregado al carrito';
        notif.style = 'position:fixed;top:20px;right:20px;background:#16a34a;color:#fff;padding:10px 20px;border-radius:6px;z-index:9999;';
        document.body.appendChild(notif);
        setTimeout(()=>notif.remove(), 1500);
      }
    });
  }
});
