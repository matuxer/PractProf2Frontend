// header-session-inline.js - Manejo de sesión en el header (después de cargar componentes)

// Función para actualizar la UI del header según el estado de autenticación
function updateHeaderUI() {
  console.log('Verificando sesión...');
  const token = localStorage.getItem('token');
  const usuarioJson = localStorage.getItem('usuario');
  
  console.log('Token:', token);
  console.log('Usuario JSON:', usuarioJson);
  
  const authButtonsDesktop = document.getElementById('auth-buttons-desktop');
  const userInfoDesktop = document.getElementById('user-info-desktop');
  const userNameDesktop = document.getElementById('user-name-desktop');
  const logoutBtnDesktop = document.getElementById('logout-btn-desktop');
  
  const authButtonsMobile = document.getElementById('auth-buttons-mobile');
  const userInfoMobile = document.getElementById('user-info-mobile');
  const userNameMobile = document.getElementById('user-name-mobile');
  const logoutBtnMobile = document.getElementById('logout-btn-mobile');
  
  if (token && usuarioJson) {
    try {
      const usuario = JSON.parse(usuarioJson);
      console.log('Usuario parseado:', usuario);
      
      // Usuario autenticado - mostrar info de usuario
      if (authButtonsDesktop) {
        authButtonsDesktop.classList.add('hidden');
      }
      if (userInfoDesktop) {
        userInfoDesktop.classList.remove('hidden');
        userInfoDesktop.classList.add('flex');
      }
      if (userNameDesktop) {
        userNameDesktop.textContent = usuario.nombre;
      }
      
      if (authButtonsMobile) {
        authButtonsMobile.classList.add('hidden');
      }
      if (userInfoMobile) {
        userInfoMobile.classList.remove('hidden');
        userInfoMobile.classList.add('flex');
      }
      if (userNameMobile) {
        userNameMobile.textContent = usuario.nombre;
      }
      
      console.log('UI actualizada para usuario autenticado');
    } catch (error) {
      console.error('Error al parsear usuario:', error);
      // Si hay error, mostrar botones de login
      if (authButtonsDesktop) authButtonsDesktop.classList.remove('hidden');
      if (userInfoDesktop) userInfoDesktop.classList.add('hidden');
      
      if (authButtonsMobile) authButtonsMobile.classList.remove('hidden');
      if (userInfoMobile) userInfoMobile.classList.add('hidden');
    }
  } else {
    console.log('No hay sesión activa');
    // No autenticado - mostrar botones de login/register
    if (authButtonsDesktop) authButtonsDesktop.classList.remove('hidden');
    if (userInfoDesktop) userInfoDesktop.classList.add('hidden');
    
    if (authButtonsMobile) authButtonsMobile.classList.remove('hidden');
    if (userInfoMobile) userInfoMobile.classList.add('hidden');
  }
  
  // Función de logout
  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
  }
  
  // Event listeners para botones de logout
  if (logoutBtnDesktop) {
    logoutBtnDesktop.addEventListener('click', handleLogout);
  }
  if (logoutBtnMobile) {
    logoutBtnMobile.addEventListener('click', handleLogout);
  }
}

// Esperar a que los componentes estén cargados
window.addEventListener('componentsLoaded', updateHeaderUI);

// También ejecutar en DOMContentLoaded como fallback
document.addEventListener('DOMContentLoaded', function() {
  // Pequeño delay como fallback si el evento no se dispara
  setTimeout(updateHeaderUI, 150);
});
