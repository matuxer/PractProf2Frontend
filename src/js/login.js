// login.js - Lógica del formulario de login
import { handleLogin } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginMessage = document.getElementById('login-message');
  
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const btnText = document.getElementById('login-btn-text');
    const spinner = document.getElementById('login-spinner');
    
    // Mostrar loader
    btnText.textContent = 'Iniciando sesión...';
    spinner.classList.remove('hidden');
    submitBtn.disabled = true;
    
    try {
      const result = await handleLogin(email, password);
      
      if (result.success) {
        // Login exitoso
        showMessage('¡Inicio de sesión exitoso!', 'success');
        
        // Redirigir a la página principal después de 1 segundo
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      } else {
        // Error en login
        showMessage(result.message, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showMessage('Error de conexión con el servidor', 'error');
    } finally {
      // Ocultar loader
      btnText.textContent = 'Iniciar Sesión';
      spinner.classList.add('hidden');
      submitBtn.disabled = false;
    }
  });
  
  // Función helper para mostrar mensajes
  function showMessage(message, type) {
    loginMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');
    
    if (type === 'success') {
      loginMessage.classList.add('bg-green-100', 'text-green-700');
    } else if (type === 'error') {
      loginMessage.classList.add('bg-red-100', 'text-red-700');
    }
    
    loginMessage.textContent = message;
    loginMessage.classList.remove('hidden');
  }
});
