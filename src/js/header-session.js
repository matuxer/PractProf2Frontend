// header-session.js - Manejo de sesión en el header
import { isAuthenticated, getUser, logout } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const authButtonsDesktop = document.getElementById('auth-buttons-desktop');
  const userInfoDesktop = document.getElementById('user-info-desktop');
  const userNameDesktop = document.getElementById('user-name-desktop');
  const logoutBtnDesktop = document.getElementById('logout-btn-desktop');
  
  const authButtonsMobile = document.getElementById('auth-buttons-mobile');
  const userInfoMobile = document.getElementById('user-info-mobile');
  const userNameMobile = document.getElementById('user-name-mobile');
  const logoutBtnMobile = document.getElementById('logout-btn-mobile');
  
  if (isAuthenticated()) {
    const usuario = getUser();
    
    // Usuario autenticado - mostrar info de usuario
    authButtonsDesktop.classList.add('hidden');
    userInfoDesktop.classList.remove('hidden');
    userInfoDesktop.classList.add('flex');
    userNameDesktop.textContent = usuario.nombre;
    
    authButtonsMobile.classList.add('hidden');
    userInfoMobile.classList.remove('hidden');
    userInfoMobile.classList.add('flex');
    userNameMobile.textContent = usuario.nombre;
  } else {
    // No autenticado - mostrar botones de login/register
    authButtonsDesktop.classList.remove('hidden');
    userInfoDesktop.classList.add('hidden');
    
    authButtonsMobile.classList.remove('hidden');
    userInfoMobile.classList.add('hidden');
  }
  
  // Event listeners para botones de logout
  logoutBtnDesktop.addEventListener('click', logout);
  logoutBtnMobile.addEventListener('click', logout);
});
