// Función para cargar componentes HTML
async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    } catch (error) {
        console.error(`Error cargando ${file}:`, error);
    }
}

// Cargar todos los componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('header-placeholder', '../components/header.html');
    await loadComponent('footer-placeholder', '../components/footer.html');
    
    // Inicializar el toggle del menú móvil después de cargar los componentes
    initMobileMenu();
});

// Función para inicializar el menú móvil
function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });
    } else {
        console.error('No se encontró el botón hamburger o el menú móvil');
    }
}
