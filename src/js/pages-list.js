// pages-list.js
// Lista de páginas que deseas mostrar en el listado.
// Actualiza esta lista cuando agregues nuevas páginas en src/pages/.
// Cada entrada: { title, url, excerpt (opcional), date (opcional) }
const PAGES = [
  { title: "Home", url: "/index.html", excerpt: "Página principal" },
  { title: "About", url: "/about.html", excerpt: "Sobre el proyecto" },
  {
    title: "Products",
    url: "/products/index.html",
    excerpt: "Listado de productos",
  },
  {
    title: "Página ejemplo 1",
    url: "/page-1.html",
    excerpt: "Contenido de ejemplo 1",
  },
  {
    title: "Página ejemplo 2",
    url: "/page-2.html",
    excerpt: "Contenido de ejemplo 2",
  },
  {
    title: "Página ejemplo 3",
    url: "/page-3.html",
    excerpt: "Contenido de ejemplo 3",
  },
  {
    title: "Página ejemplo 4",
    url: "/page-4.html",
    excerpt: "Contenido de ejemplo 4",
  },
  {
    title: "Página ejemplo 5",
    url: "/page-5.html",
    excerpt: "Contenido de ejemplo 5",
  },
  {
    title: "Página ejemplo 6",
    url: "/page-6.html",
    excerpt: "Contenido de ejemplo 6",
  },
  {
    title: "Página ejemplo 7",
    url: "/page-7.html",
    excerpt: "Contenido de ejemplo 7",
  },
];

// Configuración de paginado
const ITEMS_PER_PAGE = 4;

function renderPageItem(page) {
  return `
    <article class="bg-white shadow rounded p-4">
      <h3 class="text-lg font-semibold"><a class="text-blue-600 hover:underline" href="${
        page.url
      }">${page.title}</a></h3>
      <p class="text-sm text-gray-600 mt-1">${page.excerpt || ""}</p>
    </article>
  `;
}

function renderPagination(currentPage, totalPages) {
  const nav = document.createElement("div");
  nav.className = "flex items-center gap-2";

  const prev = document.createElement("button");
  prev.className = "px-3 py-1 bg-gray-200 rounded";
  prev.textContent = "Anterior";
  prev.disabled = currentPage <= 1;
  prev.onclick = () => goToPage(currentPage - 1);

  const next = document.createElement("button");
  next.className = "px-3 py-1 bg-gray-200 rounded";
  next.textContent = "Siguiente";
  next.disabled = currentPage >= totalPages;
  next.onclick = () => goToPage(currentPage + 1);

  nav.appendChild(prev);

  // mostrar algunos botones de página (puedes ajustar)
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let i = start; i <= end; i++) {
    const btn = document.createElement("button");
    btn.className =
      i === currentPage
        ? "px-3 py-1 bg-blue-600 text-white rounded"
        : "px-3 py-1 bg-gray-100 rounded";
    btn.textContent = i;
    btn.onclick = () => goToPage(i);
    nav.appendChild(btn);
  }

  nav.appendChild(next);
  return nav;
}

function goToPage(pageNum) {
  const totalPages = Math.ceil(PAGES.length / ITEMS_PER_PAGE);
  if (pageNum < 1) pageNum = 1;
  if (pageNum > totalPages) pageNum = totalPages;

  const start = (pageNum - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const slice = PAGES.slice(start, end);

  const listEl = document.getElementById("pages-list");
  listEl.innerHTML = slice.map(renderPageItem).join("");

  const pagContainer = document.getElementById("pages-pagination");
  pagContainer.innerHTML = "";
  pagContainer.appendChild(renderPagination(pageNum, totalPages));
}

document.addEventListener("DOMContentLoaded", () => {
  goToPage(1);
});
