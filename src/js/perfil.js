// perfil.js - Página de perfil del cliente

const API_URL = 'http://localhost:3001';

// Obtener datos del usuario desde localStorage
function getUserData() {
    const usuarioStr = localStorage.getItem('usuario');
    if (!usuarioStr) return null;
    
    try {
        return JSON.parse(usuarioStr);
    } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
    }
}

// Verificar si el usuario está logueado
function checkAuth() {
    const token = localStorage.getItem('token');
    const usuario = getUserData();
    
    if (!token || !usuario) {
        showError();
        return false;
    }
    
    return true;
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

// Formatear precio
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// Generar iniciales del nombre
function getInitials(nombre, apellido) {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
}

// Generar estrellas según la puntuación
function generateStars(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHTML += '<i class="fas fa-star text-yellow-400"></i>';
        } else {
            starsHTML += '<i class="far fa-star text-gray-300"></i>';
        }
    }
    return starsHTML;
}

// Cargar datos del perfil
async function loadProfile() {
    if (!checkAuth()) {
        return;
    }

    const usuario = getUserData();
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const contentState = document.getElementById('profile-content');

    try {
        const response = await fetch(`${API_URL}/clientes/${usuario.id}`);
        
        if (!response.ok) {
            throw new Error('No se pudo cargar el perfil');
        }

        const cliente = await response.json();
        
        // Ocultar loading y mostrar contenido
        loadingState.classList.add('hidden');
        contentState.classList.remove('hidden');

        // Renderizar información del perfil
        renderProfileInfo(cliente);
        
        // Renderizar compras
        renderCompras(cliente.compras || []);
        
        // Renderizar feedbacks
        renderFeedbacks(cliente.feedbacksEscritos || []);

    } catch (error) {
        console.error('Error al cargar perfil:', error);
        showError();
    }
}

// Renderizar información del perfil
function renderProfileInfo(cliente) {
    // Iniciales
    document.getElementById('user-initials').textContent = 
        getInitials(cliente.nombre, cliente.apellido);

    // Nombre
    document.getElementById('user-name').textContent = 
        `${cliente.nombre} ${cliente.apellido}`;

    // Email
    document.getElementById('user-email').innerHTML = 
        `<i class="fas fa-envelope mr-2"></i>${cliente.correo}`;

    // Teléfono
    document.getElementById('user-phone').innerHTML = 
        `<i class="fas fa-phone mr-2"></i>${cliente.telefono || 'No especificado'}`;

    // Puntos de recompensa
    document.getElementById('reward-points').textContent = cliente.puntosRecompensa || 0;

    // Dirección
    document.getElementById('user-address').innerHTML = 
        `<i class="fas fa-home mr-2 text-primary"></i>${cliente.domicilio || 'No especificada'}`;

    document.getElementById('user-location').innerHTML = 
        `<i class="fas fa-map-pin mr-2 text-primary"></i>${cliente.localidad || ''}, ${cliente.provincia || ''}, ${cliente.pais || ''}`;
}

// Renderizar una compra
function renderCompra(compra) {
    const itemsHTML = compra.items.map(item => {
        const imgUrl = item.producto.imgUrl.startsWith('http') 
            ? item.producto.imgUrl 
            : `${API_URL}${item.producto.imgUrl}`;
        
        return `
        <div class="flex items-center gap-4 py-2">
            <img src="${imgUrl}" 
                 alt="${item.producto.nombre}" 
                 class="w-16 h-16 object-cover rounded">
            <div class="flex-grow">
                <p class="font-medium text-gray-800">${item.producto.nombre}</p>
                <p class="text-sm text-gray-500">Cantidad: ${item.cantidad} × ${formatPrice(item.producto.precioUnitario)}</p>
            </div>
            <div class="text-right">
                <p class="font-semibold text-gray-800">${formatPrice(item.precioTotal)}</p>
            </div>
        </div>
        `;
    }).join('');

    return `
        <div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="font-bold text-gray-800 text-lg">Pedido #${compra.id}</h3>
                    <p class="text-sm text-gray-500">
                        <i class="far fa-calendar mr-1"></i>
                        ${formatDate(compra.fecha)}
                    </p>
                </div>
                <div class="text-right">
                    <p class="text-sm text-gray-600">Total</p>
                    <p class="text-2xl font-bold text-primary">${formatPrice(compra.total)}</p>
                    ${compra.descuento > 0 ? `<p class="text-xs text-green-600">Descuento: ${formatPrice(compra.descuento)}</p>` : ''}
                </div>
            </div>
            
            <div class="border-t border-gray-200 pt-4 space-y-2">
                ${itemsHTML}
            </div>
            
            <div class="mt-4 pt-4 border-t border-gray-200 text-right">
                <p class="text-sm text-gray-600">
                    ${compra.items.length} producto${compra.items.length !== 1 ? 's' : ''}
                </p>
            </div>
        </div>
    `;
}

// Renderizar compras
function renderCompras(compras) {
    const comprasList = document.getElementById('compras-list');
    const noCompras = document.getElementById('no-compras');

    if (!compras || compras.length === 0) {
        noCompras.classList.remove('hidden');
        comprasList.classList.add('hidden');
        return;
    }

    noCompras.classList.add('hidden');
    comprasList.classList.remove('hidden');

    // Ordenar por fecha (más recientes primero)
    const sortedCompras = [...compras].sort((a, b) => 
        new Date(b.fecha) - new Date(a.fecha)
    );

    comprasList.innerHTML = sortedCompras.map(renderCompra).join('');
}

// Renderizar un feedback
function renderFeedback(feedback) {
    const imgUrl = feedback.especialista.perfilImgUrl.startsWith('http') 
        ? feedback.especialista.perfilImgUrl 
        : `${API_URL}${feedback.especialista.perfilImgUrl}`;
    
    return `
        <div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div class="flex items-start gap-4">
                <img src="${imgUrl}" 
                     alt="${feedback.especialista.nombre} ${feedback.especialista.apellido}" 
                     class="w-16 h-16 rounded-full object-cover border-2 border-primary">
                
                <div class="flex-grow">
                    <div class="flex items-start justify-between mb-2">
                        <div>
                            <h4 class="font-semibold text-gray-800">
                                <a href="especialista-detalle.html?id=${feedback.especialista.id}" 
                                   class="hover:text-primary transition-colors">
                                    ${feedback.especialista.nombre} ${feedback.especialista.apellido}
                                </a>
                            </h4>
                            <p class="text-sm text-gray-500">
                                <i class="fas fa-briefcase mr-1"></i>${feedback.especialista.oficio}
                            </p>
                        </div>
                        <div class="text-right">
                            <div class="flex items-center mb-1">
                                ${generateStars(feedback.clasificacion)}
                            </div>
                            <p class="text-xs text-gray-500">
                                ${formatDate(feedback.fecha)}
                            </p>
                        </div>
                    </div>
                    
                    <p class="text-gray-700 mt-3">${feedback.comentario}</p>
                </div>
            </div>
        </div>
    `;
}

// Renderizar feedbacks
function renderFeedbacks(feedbacks) {
    const feedbacksList = document.getElementById('feedbacks-list');
    const noFeedbacks = document.getElementById('no-feedbacks');

    if (!feedbacks || feedbacks.length === 0) {
        noFeedbacks.classList.remove('hidden');
        feedbacksList.classList.add('hidden');
        return;
    }

    noFeedbacks.classList.add('hidden');
    feedbacksList.classList.remove('hidden');

    // Ordenar por fecha (más recientes primero)
    const sortedFeedbacks = [...feedbacks].sort((a, b) => 
        new Date(b.fecha) - new Date(a.fecha)
    );

    feedbacksList.innerHTML = sortedFeedbacks.map(renderFeedback).join('');
}

// Mostrar estado de error
function showError() {
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('error-state').classList.remove('hidden');
}

// Manejo de tabs
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.id.replace('tab-', '');
            
            // Remover active de todos los tabs
            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'border-primary', 'text-primary');
                btn.classList.add('border-transparent', 'text-gray-500');
            });
            
            // Activar el tab clickeado
            this.classList.add('active', 'border-primary', 'text-primary');
            this.classList.remove('border-transparent', 'text-gray-500');
            
            // Ocultar todos los contenidos
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // Mostrar el contenido correspondiente
            document.getElementById(`content-${tabId}`).classList.remove('hidden');
        });
    });
}

// Cargar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    loadProfile();
});
