// especialista-detalle.js - Cargar y mostrar detalles del especialista

const API_URL = 'http://localhost:3001';

// Obtener el ID del especialista de la URL
function getEspecialistaIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
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

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

// Renderizar un feedback
function renderFeedback(feedback) {
    return `
        <div class="border-b border-gray-200 pb-6 last:border-b-0">
            <div class="flex items-start justify-between mb-3">
                <div>
                    <h4 class="font-semibold text-gray-800">
                        ${feedback.cliente.nombre} ${feedback.cliente.apellido}
                    </h4>
                    <p class="text-sm text-gray-500">
                        <i class="far fa-calendar mr-1"></i>
                        ${formatDate(feedback.fecha)}
                    </p>
                </div>
                <div class="flex items-center">
                    ${generateStars(feedback.clasificacion)}
                    <span class="ml-2 text-sm text-gray-600">${feedback.clasificacion}/5</span>
                </div>
            </div>
            <p class="text-gray-700">${feedback.comentario}</p>
        </div>
    `;
}

// Cargar datos del especialista
async function loadEspecialista() {
    const especialistaId = getEspecialistaIdFromURL();
    
    if (!especialistaId) {
        showError();
        return;
    }

    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const contentState = document.getElementById('especialista-content');

    try {
        const response = await fetch(`${API_URL}/especialistas/${especialistaId}`);
        
        if (!response.ok) {
            throw new Error('Especialista no encontrado');
        }

        const especialista = await response.json();
        
        // Ocultar loading y mostrar contenido
        loadingState.classList.add('hidden');
        contentState.classList.remove('hidden');

        // Renderizar información del especialista
        renderEspecialistaInfo(especialista);
        
        // Renderizar feedbacks
        renderFeedbacks(especialista.feedbacksRecibidos || []);

    } catch (error) {
        console.error('Error al cargar especialista:', error);
        showError();
    }
}

// Renderizar información del especialista
function renderEspecialistaInfo(especialista) {
    // Imagen
    const imgElement = document.getElementById('especialista-img');
    imgElement.src = `http://localhost:3001${especialista.perfilImgUrl}`;
    imgElement.alt = `${especialista.nombre} ${especialista.apellido}`;

    // Nombre
    document.getElementById('especialista-nombre').textContent = 
        `${especialista.nombre} ${especialista.apellido}`;

    // Oficio
    document.getElementById('especialista-oficio').innerHTML = 
        `<i class="fas fa-briefcase mr-2 text-primary"></i>${especialista.oficio}`;

    // Rating
    document.getElementById('especialista-rating').innerHTML = `
        ${generateStars(especialista.puntuacion)}
        <span class="ml-2 text-gray-600 font-semibold">${especialista.puntuacion}/5</span>
    `;

    // Disponibilidad
    const disponibilidadHTML = especialista.disponibilidad 
        ? '<span class="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium"><i class="fas fa-check-circle mr-1"></i>Disponible</span>'
        : '<span class="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium"><i class="fas fa-times-circle mr-1"></i>No disponible</span>';
    
    document.getElementById('especialista-disponibilidad').innerHTML = disponibilidadHTML;

    // Total de feedbacks
    const totalFeedbacks = especialista.feedbacksRecibidos?.length || 0;
    document.getElementById('total-feedbacks').textContent = totalFeedbacks;
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

// Verificar si el usuario está logueado y mostrar botón correspondiente
function updateFeedbackButton() {
    const token = localStorage.getItem('token');
    const addFeedbackBtn = document.getElementById('add-feedback-btn');
    const loginToFeedbackBtn = document.getElementById('login-to-feedback-btn');

    if (token) {
        // Usuario logueado - mostrar botón de agregar feedback
        addFeedbackBtn.classList.remove('hidden');
        loginToFeedbackBtn.classList.add('hidden');
    } else {
        // Usuario no logueado - mostrar botón de login
        addFeedbackBtn.classList.add('hidden');
        loginToFeedbackBtn.classList.remove('hidden');
    }
}

// Cargar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadEspecialista();
    updateFeedbackButton();
});
