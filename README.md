# Grat Denise · Café

Sitio personal de **Grat Denise**, barista. Es una sola página, sin dependencias de instalación ni paso de compilación, lista para publicar en GitHub Pages.

---

## 1. Concepto

**"Del grano a la taza, probando en el camino."**

La página cuenta el recorrido del café, del cafeto a la taza, y lo usa como metáfora del recorrido profesional de Denise: algo que madura, cambia con el calor y la práctica, y termina en una taza para disfrutar.

Se apoya en el manual de marca:

- **Esencia:** una barista que estudia, prueba, se equivoca y comparte lo que descubre. No es una gurú.
- **Sensación buscada:** curiosidad, ganas de probar y entusiasmo.
- **Estética:** calma, orden, artesanía y profesionalismo. La mezcla es industrial y artesanal: verde profundo, madera, papel, café.
- **Voz:** cercana y rioplatense, con frases como "con este café me funcionó", "esto todavía lo estoy estudiando" o "si le querés poner azúcar, también está bien".
- **Llamado a la acción:** "Charlemos de café". Invita a una conversación, no a "seguime".

---

## 2. Estructura de la página

| # | Sección | Qué hace | Efecto |
|---|---------|----------|--------|
| 1 | **Hero** (`#hero`) | Título, presentación y botón "Charlemos de café" | Parallax por capas (sol, montañas, colinas con cafetal, ramas con cerezas) que responde al scroll y al mouse |
| 2 | **Perfil / Recorrido 3D** (`#perfil`) | Cinco bloques de texto del perfil, con la animación 3D de fondo | Three.js controlado por el scroll: cafeto → cae la cereza → café verde → tostado → taza |
| 3 | **Cursos y certificados** (`#cursos`) | Fichas tipo recetario con año, institución y estado | Fichas de papel con cinta, levemente giradas, que se enderezan al pasar el mouse |
| 4 | **Trabajemos juntos** (`#servicios`) | Seis servicios numerados | Tarjetas con un brillo que sigue al cursor |
| 5 | **Contacto** | Cierre "Charlemos de café." en papel, con el V60 animado | Gotas cayendo (SVG + CSS) |
| — | **Ventana "Charlemos de café"** | Botón de Instagram y formulario (nombre, correo, tipo de proyecto, mensaje) | Envía el mensaje directo desde la web (FormSubmit, o Formspree si se configura) |

### Etapas del recorrido 3D

| Etapa | Objeto en 3D | Texto del perfil |
|-------|--------------|------------------|
| 01 · El cafeto | Arbusto con hojas, cerezas maduras y verdes | "Todo empieza mucho antes de la barra." (origen, trazabilidad) |
| 02 · La cereza | La cereza se suelta, cae y la cámara la sigue | "Soy Denise" (presentación) |
| 03 · Café verde | La cereza se vuelve transparente y aparecen dos semillas verdes | "El café verde todavía no sabe a café." (aprendizaje) |
| 04 · El tueste | Los granos pasan de verde a amarillo, canela y marrón, crecen un 18 % y aparecen chispas de calor | "Calor, paciencia y muchos intentos." (el error como proceso) |
| 05 · La taza | Los granos caen en una taza que sube; el café se llena con latte art y vapor | "Y al final, una taza para disfrutar como quieras." + botón |

---

## 3. Tipografías

Todas son de **Google Fonts** y tienen licencia libre (SIL Open Font License).

| Fuente | Pesos | Uso |
|--------|-------|-----|
| **Young Serif** | 400 | Títulos (h1, h2, h3), logo, títulos de cursos y servicios |
| **Figtree** | 400, 500, 600, 700 | Texto corrido, navegación, botones, formulario |
| **JetBrains Mono** | 400, 600 | Datos técnicos (18 g → 36 g, 93 °C), etiquetas, años, números de servicios, indicador de etapas |
| **Caveat** | 500, 700 | Notas manuscritas: "desde la finca hasta la taza", "mi recetario de formación", sellos de estado, "bajá ↓" |

Se cargan con esta línea, que ya está en `index.html`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Young+Serif&display=swap">
```

---

## 4. Colores

### Paleta base (variables CSS en `css/styles.css`)

| Variable | Hex | Uso |
|----------|-----|-----|
| `--bg` | `#122019` | Fondo general de la página y del recorrido 3D |
| `--panel` | `#172A20` | Tarjetas de "Trabajemos juntos" |
| `--fg` | `#ECE7DA` | Texto principal sobre fondo oscuro |
| `--sage` | `#A9C6A0` | Acento verde: textos manuscritos, etiquetas, etapa activa, brillo de tarjetas, foco |
| `--wood` | `#C08756` | Acento madera: números de servicios, notas, café en las ilustraciones |
| `--cherry` | `#B5412F` | Cerezas, mensajes de error |
| `--paper` | `#E8E2D3` | Fichas de cursos, bloque de contacto, botones, ventana del formulario |
| `--ink` | `#1B1A16` | Texto y botones sobre papel |
| `--mute` | `#A3AA9C` | Texto secundario |
| `--line` | `rgba(236,231,218,.14)` | Bordes y divisores |

### Por sección

**Hero (parallax)**
| Elemento | Color |
|----------|-------|
| Cielo (degradado) | `#203A2C` → `#18301F` → `#122019` |
| Sol / luz | `rgba(233,196,140,.55)` |
| Montañas | `#294836` |
| Colinas | `#1E3829` · arbustos `#2E5A41` |
| Suelo frontal | `#0F1C15` |
| Ramas | `#3D2A1C` |
| Hojas | `#2F6B47`, `#3E8A5C` |
| Cerezas | maduras `#B5412F`, muy maduras `#8E2F22`, verdes `#7FA34E` |

**Recorrido 3D (Three.js)**
| Elemento | Color |
|----------|-------|
| Hojas | `#1E4A30`, `#2A5C3B` |
| Tronco y ramas | `#4A3222` |
| Cerezas | `#B5412F`, `#8E2F22`, `#7FA34E`, `#C95A2E` |
| Grano: verde → amarillo → canela → medio → oscuro | `#5E7A40` → `#9C8C44` → `#84502C` → `#4E2C18` → `#331C10` |
| Porcelana | `#EDE9E1` |
| Crema del espresso (degradado) | `#D8A574` → `#A9683A` → `#6E3C1F` → `#3E220F` |
| Latte art | `rgba(246,236,218,.95)` |
| Chispas del tueste | `#FFA057` |
| Polvo ambiente | `#D9C9A0` |
| Luces | principal `#FFE0BD`, contraluz `#A9C6A0`, calor `#FF9A4A` |
| Halo de fondo (cambia por etapa) | verde `rgba(169,198,160,…)` → cálido `rgba(205,130,70,…)` |
| Velo para leer el texto | `rgba(18,32,25,.5)` en el centro → `.18` en los bordes |

**Cursos y certificados**
| Elemento | Color |
|----------|-------|
| Ficha | `#E8E2D3` |
| Cinta | `rgba(169,198,160,.75)` |
| Año | `#6B6556` · texto `#5E5A4E` |
| Sello "completado" | `#2F5E43` |
| Sello "en curso" | `#9A5A2C` |
| Sello "próximo" | `#7A7466` |

**Trabajemos juntos**: tarjeta `#172A20`, borde `--line`, brillo `rgba(169,198,160,.18)`, número `#C08756`.

**Contacto**: fondo `#E8E2D3`, frase manuscrita `#2F5E43`, botón `#1B1A16` con texto `#E8E2D3`, V60 `#1B1A16` con café `#B07A4C`.

**Ventana del formulario**: fondo `#E8E2D3`, acento `#1E3A2B`, líneas `#CBC3AF`, texto `#1B1A16` / `#5E5A4E`, error `#B5412F`.

---

## 5. Assets

Todo está hecho en código, así que no hay imágenes externas. Las ilustraciones van incluidas dentro de `index.html`, y en `assets/svg/` hay copias sueltas para usar en redes, presentaciones o Figma.

| Archivo | Qué es |
|---------|--------|
| `assets/svg/favicon.svg` | Ícono del sitio: grano de café sobre verde |
| `assets/svg/hero-montanas.svg` | Capa de fondo del parallax |
| `assets/svg/hero-colinas.svg` | Capa media: colinas con cafetal |
| `assets/svg/hero-ramas-cerezas.svg` | Capa frontal: ramas, hojas y cerezas |
| `assets/svg/v60.svg` | Ilustración del V60 (bloque de contacto) |
| `assets/svg/taza.svg` | Taza con vapor; se muestra si el navegador no soporta 3D |

Los modelos 3D (cafeto, cereza, granos, taza, plato) se generan por código en `js/main.js` con geometrías de Three.js. No hay archivos `.glb` que cargar.

---

## 6. Tecnologías

| Tecnología | Para qué |
|------------|----------|
| **HTML5** | Estructura semántica, accesible (aria, foco visible, `prefers-reduced-motion`) |
| **CSS3** | Variables, Grid/Flexbox, `position: sticky`, `backdrop-filter`, animaciones SVG |
| **JavaScript (vanilla)** | Parallax, progreso del scroll, ventana del formulario, datos editables |
| **Three.js r128** | Escena 3D (cargada por CDN desde cdnjs) |
| **IntersectionObserver / ResizeObserver** | Pausar el 3D cuando no está visible y ajustar el tamaño |
| **Google Fonts** | Tipografías |
| **FormSubmit** (o Formspree, opcional) | Recibir los mensajes del formulario en tu correo sin servidor propio |

No necesita Node, npm ni compilación: son archivos estáticos.

```
grat-denise-cafe/
├── index.html
├── css/styles.css
├── js/main.js
├── assets/svg/…
├── .nojekyll
├── README.md
└── PROMPT.md
```

---

## 7. Qué editar

Todo lo editable está al principio de `js/main.js`:

```js
const CONFIG = {
  instagram: 'denise_grat',         // usuario de Instagram, sin @
  photo: 'assets/img/denise.jpg',   // foto del inicio
  email: 'denise.a.grat@gmail.com', // correo que recibe los mensajes
  formEndpoint: ''                  // opcional; vacío = FormSubmit
};
const COURSES = [ { t:'Título', o:'Institución', y:'2025', s:'done' }, … ]; // s: 'done' | 'now' | 'next'
const SERVICES = [ { t:'Talleres', d:'Descripción…' }, … ];
```

- **Tu foto:** guardala como `grat-denise-cafe/assets/img/denise.jpg` (vertical, proporción 4:5, unos 1200 × 1500 px). Hasta que la subas, el inicio muestra el espacio con la nota "tu foto acá".
- **Cursos:** agregá o editá entradas en `COURSES`. El estado `done` muestra "completado", `now` muestra "en curso" y `next` muestra "próximo".
- **Textos del recorrido:** están en `index.html`, dentro de `<section class="story">`, uno por cada `<article class="step">`.
- **Colores:** cambiá las variables de `:root` en `css/styles.css`. Los colores del 3D están en `js/main.js` (busca `0x`).

### Formulario de contacto

El formulario envía el mensaje directo desde la web, sin abrir el correo de quien escribe.

- **Por defecto** (`formEndpoint: ''`): usa [FormSubmit](https://formsubmit.co), gratis y sin cuenta. Los mensajes llegan a `email`. **La primera vez** que alguien envíe el formulario, FormSubmit manda a ese correo un mail de activación: hay que tocar "Activate Form" una sola vez. Hasta entonces los envíos fallan y el formulario pide escribir por Instagram.
- **Con Formspree** (opcional): creá un formulario en formspree.io y pegá su URL (`https://formspree.io/f/xxxxxx`) en `formEndpoint`.

---

## 8. Publicar en GitHub Pages

El repositorio ya publica el sitio solo: cada `git push` a `master` ejecuta el workflow `.github/workflows/pages.yml`, que sube el contenido de la carpeta `grat-denise-cafe/` a GitHub Pages.

- **Dirección:** `https://tanoluchi.github.io/denise/`
- **Ver el estado:** pestaña **Actions** del repositorio. Si algo falla, ahí aparece el error.
- **Configuración:** en **Settings → Pages**, "Source" tiene que decir **GitHub Actions** (ya está configurado).

**Dominio propio** (opcional, por ejemplo `gratdenise.com`): en Settings → Pages → Custom domain escribí el dominio. En tu proveedor de dominio creá un registro CNAME que apunte a `tanoluchi.github.io`. Después activá "Enforce HTTPS".

**Probarlo en tu computadora:** abrí `index.html` en el navegador, o ejecutá `python3 -m http.server` en la carpeta `grat-denise-cafe/` y entrá a `http://localhost:8000`.

---

## 9. Rendimiento y accesibilidad

- El 3D solo se renderiza mientras la sección está en pantalla.
- Con "reducir movimiento" activado en el sistema se desactivan las animaciones automáticas. El recorrido sigue el scroll sin suavizado.
- Si el navegador no soporta WebGL, se muestra la ilustración de la taza y el texto sigue funcionando igual.
- La resolución del 3D se limita a 2× para no exigir de más a los celulares.
