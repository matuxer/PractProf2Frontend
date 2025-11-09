// Helper para renderizar cards de especialistas desde el template HTML
async function loadEspecialistaTemplate() {
  const response = await fetch('/components/especialistaCard.html');
  return await response.text();
}

function renderEspecialista(especialista, template) {
  // Generar array de estrellas para el rating
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(especialista.puntuacion));
  
  // Agregar prefijo de URL del backend si no está presente
  const perfilImgUrl = especialista.perfilImgUrl.startsWith('http') 
    ? especialista.perfilImgUrl 
    : `http://localhost:3001${especialista.perfilImgUrl}`;
  
  // Reemplazar placeholders básicos
  let html = template
    .replace(/{{perfilImgUrl}}/g, perfilImgUrl)
    .replace(/{{nombre}}/g, especialista.nombre)
    .replace(/{{apellido}}/g, especialista.apellido)
    .replace(/{{oficioNombre}}/g, especialista.oficio.nombre)
    .replace(/{{oficioCategoria}}/g, especialista.oficio.categoria)
    .replace(/{{puntuacion}}/g, especialista.puntuacion);
  
  // Manejar disponibilidad (condicionales)
  if (especialista.disponibilidad) {
    html = html.replace(/{{#if disponibilidad}}[\s\S]*?{{else}}[\s\S]*?{{\/if}}/g, (match) => {
      return match.split('{{else}}')[0].replace('{{#if disponibilidad}}', '');
    });
  } else {
    html = html.replace(/{{#if disponibilidad}}[\s\S]*?{{else}}[\s\S]*?{{\/if}}/g, (match) => {
      const elsePart = match.split('{{else}}')[1];
      return elsePart.replace('{{/if}}', '');
    });
  }
  
  // Manejar estrellas (loop)
  const starHTML = stars.map(() => '<i class="fas fa-star text-yellow-400"></i>').join('');
  html = html.replace(/{{#each stars}}[\s\S]*?{{\/each}}/g, starHTML);
  
  return html;
}

// Función para renderizar múltiples especialistas en un contenedor
async function renderEspecialistas(especialistas, containerId) {
  const template = await loadEspecialistaTemplate();
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }
  
  const htmlCards = especialistas.map(esp => renderEspecialista(esp, template)).join('');
  container.innerHTML = htmlCards;
}
