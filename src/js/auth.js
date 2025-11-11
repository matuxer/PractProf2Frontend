// auth.js - Manejo de autenticación

const API_URL = 'http://localhost:3001';

/**
 * Maneja el inicio de sesión
 */
export async function handleLogin(correo, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, password })
  });

  const data = await response.json();

  console.log('Token recibido:', data.token);

  if (response.ok && data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.cliente));
    return { success: true, data };
  } else {
    return { success: false, message: data.message || 'Error al iniciar sesión' };
  }
}

/**
 * Maneja el registro de usuario
 */
export async function handleRegister(userData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  const data = await response.json();

  console.log('Token recibido:', data.token);

  if (response.ok && data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.cliente));
    return { success: true, data };
  } else {
    return { success: false, message: data.message || 'Error al registrarse' };
  }
}

/**
 * Cierra la sesión del usuario
 */
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = 'index.html';
}

/**
 * Verifica si hay una sesión activa
 */
export function isAuthenticated() {
  return localStorage.getItem('token') !== null;
}

/**
 * Obtiene la información del usuario autenticado
 */
export function getUser() {
  const userJson = localStorage.getItem('usuario');
  return userJson ? JSON.parse(userJson) : null;
}

/**
 * Obtiene el token de autenticación
 */
export function getToken() {
  return localStorage.getItem('token');
}
