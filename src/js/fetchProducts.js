// Script para obtener productos desde el backend
const API_URL = 'http://localhost:3001/productos';

/**
 * Obtiene los productos desde el backend
 */
async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const productos = await response.json();
    return productos;
    
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});
