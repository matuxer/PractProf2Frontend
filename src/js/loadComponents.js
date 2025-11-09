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
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-placeholder', '../components/header.html');
    loadComponent('mobile-menu-placeholder', '../components/mobileDropdownMenu.html');
    loadComponent('footer-placeholder', '../components/footer.html');
});
