// especialista-detalle.js - Cargar y mostrar detalles del especialista

const API_URL = 'http://localhost:3001';

// Variables globales
let currentEspecialistaId = null;
let selectedRating = 0;

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

    // Guardar ID del especialista actual
    currentEspecialistaId = parseInt(especialistaId);

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
        
        // Agregar evento click para abrir modal
        addFeedbackBtn.addEventListener('click', openFeedbackModal);
    } else {
        // Usuario no logueado - mostrar botón de login
        addFeedbackBtn.classList.add('hidden');
        loginToFeedbackBtn.classList.remove('hidden');
    }
}

// Abrir modal de feedback
function openFeedbackModal() {
    const modal = document.getElementById('feedback-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    resetFeedbackForm();
}

// Cerrar modal de feedback
function closeFeedbackModal() {
    const modal = document.getElementById('feedback-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    resetFeedbackForm();
}

// Resetear formulario
function resetFeedbackForm() {
    selectedRating = 0;
    document.getElementById('feedback-form').reset();
    document.getElementById('clasificacion-input').value = '0';
    document.getElementById('rating-value').textContent = '0/5';
    document.getElementById('char-count').textContent = '0';
    
    // Resetear estrellas
    const stars = document.querySelectorAll('#star-rating i');
    stars.forEach(star => {
        star.classList.remove('fas', 'text-yellow-400');
        star.classList.add('far');
    });
    
    // Ocultar error
    document.getElementById('feedback-error').classList.add('hidden');
}

// Manejar selección de estrellas
function setupStarRating() {
    const stars = document.querySelectorAll('#star-rating i');
    const ratingValue = document.getElementById('rating-value');
    const clasificacionInput = document.getElementById('clasificacion-input');
    
    stars.forEach(star => {
        // Hover effect
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });
        
        // Click para seleccionar
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-rating'));
            clasificacionInput.value = selectedRating;
            ratingValue.textContent = `${selectedRating}/5`;
            highlightStars(selectedRating);
        });
    });
    
    // Restaurar selección al salir del hover
    const starContainer = document.getElementById('star-rating');
    starContainer.addEventListener('mouseleave', function() {
        if (selectedRating > 0) {
            highlightStars(selectedRating);
        } else {
            highlightStars(0);
        }
    });
}

// Resaltar estrellas
function highlightStars(rating) {
    const stars = document.querySelectorAll('#star-rating i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas', 'text-yellow-400');
        } else {
            star.classList.remove('fas', 'text-yellow-400');
            star.classList.add('far');
        }
    });
}

// Contador de caracteres
function setupCharCounter() {
    const comentarioInput = document.getElementById('comentario-input');
    const charCount = document.getElementById('char-count');
    
    comentarioInput.addEventListener('input', function() {
        charCount.textContent = this.value.length;
    });
}

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

// Enviar feedback
async function submitFeedback(event) {
    event.preventDefault();
    
    const usuario = getUserData();
    if (!usuario || !usuario.id) {
        showFeedbackError('No se pudo obtener la información del usuario');
        return;
    }
    
    const clasificacion = parseInt(document.getElementById('clasificacion-input').value);
    const comentario = document.getElementById('comentario-input').value.trim();
    
    // Validaciones
    if (clasificacion < 1 || clasificacion > 5) {
        showFeedbackError('Por favor selecciona una clasificación de 1 a 5 estrellas');
        return;
    }
    
    if (!comentario) {
        showFeedbackError('Por favor escribe un comentario');
        return;
    }
    
    if (comentario.length > 255) {
        showFeedbackError('El comentario no puede exceder 255 caracteres');
        return;
    }
    
    const submitBtn = document.getElementById('submit-feedback-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
    
    try {
        const response = await fetch(`${API_URL}/feedbacks/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clienteId: usuario.id,
                especialistaId: currentEspecialistaId,
                clasificacion: clasificacion,
                comentario: comentario
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Error al enviar el feedback');
        }
        
        const feedback = await response.json();
        
        // Cerrar modal
        closeFeedbackModal();
        
        // Mostrar mensaje de éxito
        showSuccessMessage('¡Feedback enviado correctamente!');
        
        // Recargar datos del especialista para mostrar el nuevo feedback
        setTimeout(() => {
            loadEspecialista();
        }, 1500);
        
    } catch (error) {
        console.error('Error al enviar feedback:', error);
        showFeedbackError(error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Enviar';
    }
}

// Mostrar error en el modal
function showFeedbackError(message) {
    const errorDiv = document.getElementById('feedback-error');
    const errorText = document.getElementById('feedback-error-text');
    errorText.textContent = message;
    errorDiv.classList.remove('hidden');
}

// Mostrar mensaje de éxito
function showSuccessMessage(message) {
    const existingMessage = document.querySelector('.success-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'success-toast fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3';
    toast.innerHTML = `
        <i class="fas fa-check-circle text-xl"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Setup de eventos del modal
function setupModalEvents() {
    const modal = document.getElementById('feedback-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const cancelBtn = document.getElementById('cancel-feedback-btn');
    const form = document.getElementById('feedback-form');
    
    // Cerrar modal con botón X
    closeBtn.addEventListener('click', closeFeedbackModal);
    
    // Cerrar modal con botón Cancelar
    cancelBtn.addEventListener('click', closeFeedbackModal);
    
    // Cerrar modal al hacer click fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeFeedbackModal();
        }
    });
    
    // Submit del formulario
    form.addEventListener('submit', submitFeedback);
}

// Cargar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadEspecialista();
    updateFeedbackButton();
    setupStarRating();
    setupCharCounter();
    setupModalEvents();
});
