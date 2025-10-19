// Cargador de componentes parciales (header, footer, etc.)
document.addEventListener("DOMContentLoaded", () => {
  // Cargar header
  const headerElement = document.getElementById("site-header");
  if (headerElement) {
    fetch("/components/header.html")
      .then(response => response.text())
      .then(html => {
        headerElement.innerHTML = html;
      })
      .catch(error => console.error("Error cargando header:", error));
  }

  // Cargar footer
  const footerElement = document.getElementById("site-footer");
  if (footerElement) {
    fetch("/components/footer.html")
      .then(response => response.text())
      .then(html => {
        footerElement.innerHTML = html;
      })
      .catch(error => console.error("Error cargando footer:", error));
  }
});