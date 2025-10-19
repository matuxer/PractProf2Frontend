# 🏪 Frontend Ferretería - Sitio Web Simple

Este es un proyecto frontend moderno que usa **HTML, CSS y JavaScript** con **Tailwind CSS** para crear un sitio web de ferretería rápido y responsive.

## 🎯 ¿Qué es Tailwind CSS?

**Tailwind CSS** es una herramienta que te permite crear páginas web bonitas sin escribir CSS desde cero. En lugar de escribir:

```css
.boton-azul {
  background-color: blue;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}
```

Con Tailwind usas clases predefinidas directamente en el HTML:

```html
<button class="bg-blue-500 text-white px-6 py-3 rounded-lg">Mi Botón</button>
```

**Ventajas:**
- ✅ **Más rápido** - No escribes CSS personalizado
- ✅ **Responsive automático** - Funciona en móviles y desktop
- ✅ **Consistente** - Todos los elementos siguen el mismo diseño
- ✅ **Moderno** - Diseños profesionales sin ser diseñador

---

## 🚀 Instalación y Uso Rápido

### 1. Requisitos previos
- **Node.js** (descargar de [nodejs.org](https://nodejs.org))
- **Git** (opcional, para colaborar)
- **Editor de código** (recomendado: [VS Code](https://code.visualstudio.com))

### 2. Instalar el proyecto
```bash
# Abrir terminal en la carpeta del proyecto
cd ferreteria/frontend

# Instalar las herramientas necesarias
npm install
```

### 3. Iniciar el proyecto
```bash
# Un solo comando que hace todo
npm run dev
```

Después de ejecutar `npm run dev`, abre tu navegador en:
**http://localhost:8080**

¡Ya tienes tu sitio web funcionando! 🎉

---

## 📂 Estructura del Proyecto (Fácil de Entender)

```
ferreteria/frontend/
├── src/                    # 📝 Aquí trabajas (archivos fuente)
│   ├── pages/             # 📄 Páginas HTML del sitio
│   │   ├── index.html     # Página principal
│   │   ├── about.html     # Página "Acerca de"
│   │   └── page-*.html    # Otras páginas
│   ├── components/        # 🧩 Piezas reutilizables
│   │   ├── header.html    # Encabezado del sitio
│   │   └── footer.html    # Pie de página
│   ├── js/               # ⚡ Archivos JavaScript
│   │   ├── main.js       # Script principal
│   │   └── pages-list.js # Lista de páginas
│   └── styles/           # 🎨 Estilos CSS
│       └── tailwind.css  # Configuración de Tailwind
├── public/               # 🌐 Sitio web final (se genera automáticamente)
└── package.json          # 📦 Configuración del proyecto
```

**Regla importante:** 
- ✅ **SÍ edita archivos en `src/`** - Aquí haces tus cambios
- ❌ **NO edites archivos en `public/`** - Se generan automáticamente

---

## 🛠️ Comandos Disponibles

### Para Desarrollo (día a día)
```bash
npm run dev
```
**Esto hace todo automáticamente:**
- Compila Tailwind CSS
- Copia tus páginas HTML
- Copia los componentes (header, footer)
- Copia los archivos JavaScript
- Inicia un servidor web local
- **Recarga automáticamente** cuando cambias algo

### Para Producción (subir al hosting)
```bash
npm run build
```
Prepara todos los archivos optimizados en la carpeta `public/` listos para subir a internet.

### Solo el servidor (si ya compilaste)
```bash
npm run serve
```

---

## 🎨 Cómo Usar Tailwind CSS

### Clases Básicas Útiles

**Colores:**
```html
<div class="bg-blue-500">Fondo azul</div>
<p class="text-red-600">Texto rojo</p>
<button class="bg-green-500 text-white">Botón verde</button>
```

**Espaciado:**
```html
<div class="p-4">Padding pequeño</div>
<div class="p-8">Padding grande</div>
<div class="mx-auto">Centrado horizontalmente</div>
```

**Responsive (se adapta a móviles):**
```html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- En móvil: ancho completo -->
  <!-- En tablet: mitad del ancho -->
  <!-- En desktop: un tercio del ancho -->
</div>
```

**Flexbox (para alinear elementos):**
```html
<div class="flex items-center justify-between">
  <span>Izquierda</span>
  <span>Derecha</span>
</div>
```

### 📚 Recursos para Aprender Tailwind

- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Documentación oficial
- [Tailwind Cheat Sheet](https://tailwindcomponents.com/cheatsheet/) - Lista de clases
- [Tailwind Play](https://play.tailwindcss.com/) - Prueba código online

---

## 🔧 Cómo Hacer Cambios

### 1. Cambiar el contenido de una página
1. Abre el archivo en `src/pages/` (ej: `src/pages/index.html`)
2. Modifica el HTML
3. Guarda el archivo
4. ¡El navegador se actualiza automáticamente!

### 2. Cambiar el header o footer
1. Edita `src/components/header.html` o `src/components/footer.html`
2. Los cambios se aplican a **todas las páginas** automáticamente

### 3. Añadir estilos personalizados
1. Edita `src/styles/tailwind.css`
2. Usa clases de Tailwind en tus archivos HTML

### 4. Añadir nueva página
1. Crea un archivo en `src/pages/` (ej: `productos.html`)
2. El archivo se copia automáticamente a `public/`
3. Accede en el navegador: `http://localhost:8080/productos.html`

---

## 🌐 Desplegar el Sitio Web

Cuando estés listo para subir tu sitio a internet:

1. **Compilar para producción:**
   ```bash
   npm run build
   ```

2. **Subir la carpeta `public/`** a tu servicio de hosting:
   - [Netlify](https://netlify.com) (gratis, fácil)
   - [Vercel](https://vercel.com) (gratis, rápido)
   - [GitHub Pages](https://pages.github.com) (gratis con GitHub)

---

## 🆘 Problemas Comunes

**❌ "npm no se reconoce como comando"**
- Solución: Instala Node.js desde [nodejs.org](https://nodejs.org)

**❌ "Puerto 8080 ya está en uso"**
- Solución: Cambia el puerto en `package.json`, línea `serve` a `-p 3000`

**❌ "Los cambios no se ven en el navegador"**
- Solución: Asegúrate de que `npm run dev` esté corriendo
- Refresca el navegador con Ctrl+F5

**❌ "Las clases de Tailwind no funcionan"**
- Solución: Verifica que `npm run dev` esté corriendo correctamente

---

**¡Listo para crear un sitio web increíble! 🚀**
