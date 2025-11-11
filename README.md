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
- **Git** (para clonar el repositorio)
- **Editor de código** (recomendado: [VS Code](https://code.visualstudio.com))

### 2. Clonar e instalar el proyecto
```bash
# Clonar el repositorio
git clone https://github.com/matuxer/PractProf2Frontend.git
cd PractProf2Frontend

# Instalar dependencias
npm install

# Generar archivos necesarios (PRIMERA VEZ solamente)
npm run build
```

### 3. Iniciar el proyecto en modo desarrollo
```bash
# Inicia el servidor con watch automático
npm run dev
```

Después de ejecutar `npm run dev`, abre tu navegador en:
**http://localhost:8080**

¡Ya tienes tu sitio web funcionando! 🎉

> **Nota importante:** La carpeta `public/` se genera automáticamente y NO se versiona en Git. Solo trabajas en la carpeta `src/`.

---

## 📂 Estructura del Proyecto (Fácil de Entender)

```
ferreteria/frontend/
├── src/                    # 📝 Aquí trabajas (archivos fuente)
│   ├── pages/             # 📄 Páginas HTML del sitio
│   │   ├── index.html     # Página principal
│   │   ├── tienda.html    # Página de tienda
│   │   └── *.html         # Otras páginas
│   ├── components/        # 🧩 Componentes reutilizables
│   │   ├── header.html    # Encabezado del sitio
│   │   └── footer.html    # Pie de página
│   ├── js/               # ⚡ Archivos JavaScript
│   │   ├── script.js     # Script principal
│   │   └── loadComponents.js # Carga de componentes
│   ├── static/           # 🖼️ Imágenes y recursos estáticos
│   │   └── images/       # Todas las imágenes del sitio
│   └── styles/           # 🎨 Estilos CSS
│       ├── tailwind.css  # Configuración de Tailwind
│       └── custom.css    # Estilos personalizados
├── public/               # 🌐 Sitio web final (GENERADO AUTOMÁTICAMENTE - NO EDITAR)
├── package.json          # 📦 Configuración del proyecto
└── .gitignore            # 🚫 Archivos ignorados por Git (incluye public/)
```

**Reglas importantes:** 
- ✅ **SÍ edita archivos en `src/`** - Aquí haces todos tus cambios
- ❌ **NO edites archivos en `public/`** - Se generan automáticamente
- 📝 **`public/` NO está en Git** - Solo se genera localmente o en build

---

## 🛠️ Comandos Disponibles

### Para Desarrollo (día a día)
```bash
npm run dev
```
**Esto hace todo automáticamente:**
- Compila Tailwind CSS en tiempo real
- Observa cambios en `src/` y los copia a `public/`
- Copia archivos HTML, componentes, JS, imágenes y Swiper
- Inicia un servidor web local en `http://localhost:8080`
- **Recarga automáticamente** cuando cambias algo en `src/`

### Para Build Inicial o Producción
```bash
npm run build
```
**Genera todos los archivos optimizados en `public/`:**
- Compila y minifica el CSS de Tailwind
- Copia todos los archivos de `src/` a `public/`
- Incluye archivos de Swiper para el carrusel
- Listo para desplegar en servidor web

### Solo compilar CSS
```bash
npm run build:css
```

### Solo copiar archivos
```bash
npm run build:copy
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

## 🔄 Flujo de Trabajo con Git (Para Equipos)

### Estructura de Branches
- **`main`** - Rama principal **PROTEGIDA** (solo administradores)
- **`develop`** - Rama de desarrollo (aquí van todos los Pull Requests)
- **Ramas de tareas** - Una rama por cada tarea específica

### Convención de Nombres de Tareas
Las tareas siguen este formato: **FERRF-XX** (FERRETERIA FRONT N°XX)

Ejemplos:
- `FERRF-18` - Tarea #18 del frontend de ferretería
- `FERRF-25` - Tarea #25 del frontend de ferretería

### 🚀 Cómo Trabajar en una Tarea

**1. Crear rama desde develop:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/FERRF-18-pagina-productos
```

**2. Hacer cambios y commits:**
```bash
# Hacer tus cambios en el código
git add .
git commit -m "[FERRF-18] Añade página de productos con grid responsive"
```

**3. Subir y crear Pull Request:**
```bash
git push -u origin feature/FERRF-18-pagina-productos
```
Luego crear PR hacia **`develop`** (NO hacia `main`)

**4. Después del merge, limpiar:**
```bash
git checkout develop
git pull origin develop
git branch -d feature/FERRF-18-pagina-productos
```

### 📋 Convenciones de Commits
```bash
git commit -m "[FERRF-XX] Descripción clara de lo que hace"
```

**Ejemplos:**
- `[FERRF-18] Añade página de productos con filtros`
- `[FERRF-19] Corrige responsive del header en móviles`
- `[FERRF-20] Actualiza colores según diseño nuevo`

### 🔒 Pull Requests
- **Target:** Siempre hacia `develop` (main está protegido)
- **Título:** `[FERRF-XX] Descripción de la tarea`
- **Descripción:** Explicar qué se cambió y cómo probarlo

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
