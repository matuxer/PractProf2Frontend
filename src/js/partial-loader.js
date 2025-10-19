// Carga header/footer desde /components/*.html y los inyecta en la página.
// Requiere que al hacer build copies src/components -> public/components
async function loadPartial(selectorId, url) {
  const el = document.getElementById(selectorId);
  if (!el) return;
  try {
    const res = await fetch(url);
    if (!res.ok) return;
    el.innerHTML = await res.text();
  } catch (e) {
    // silencioso en dev si no encuentra el archivo
    console.warn("No se pudo cargar partial:", url, e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPartial("site-header", "/components/header.html");
  loadPartial("site-footer", "/components/footer.html");
});
