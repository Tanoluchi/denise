# Prompt para recrear o extender el sitio

Copiá este prompt en una herramienta de IA para regenerar el sitio o pedir cambios manteniendo el mismo criterio. Adjuntá también el manual de marca de Grat Denise.

---

Diseñá y programá el sitio personal de **Grat Denise**, barista de café de especialidad. Tiene que ser una sola página estática (HTML + CSS + JavaScript vanilla), sin paso de compilación y lista para GitHub Pages.

**Marca (respetar el manual adjunto):** una barista que estudia, prueba, se equivoca y comparte lo que aprende; no es una gurú. Voz cercana en español rioplatense, con frases como "con este café me funcionó", "esto todavía lo estoy estudiando" o "si le querés poner azúcar, también está bien". La sensación final es curiosidad, ganas de probar y entusiasmo. La estética es industrial y artesanal: calma, orden, verde profundo, madera, papel y café. Nada de marketing vacío ni de "seguime para más".

**Concepto:** "Del grano a la taza, probando en el camino." El recorrido del café funciona como metáfora del crecimiento profesional.

**Estructura:**
1. **Hero con parallax por capas** en SVG: sol difuso, montañas, colinas con cafetal y, al frente, ramas con hojas y cerezas rojas y verdes. Las capas se mueven a distintas velocidades con el scroll y el mouse. Va el título "Del grano a la taza, probando en el camino.", una presentación corta y el botón "Charlemos de café".
2. **Recorrido 3D con Three.js como fondo** (sticky, pantalla completa), controlado por el scroll y con el texto del perfil centrado encima como protagonista. Cinco etapas:
   - Cafeto: arbusto con hojas y cerezas.
   - Una cereza se suelta y cae, y la cámara la sigue mientras la planta se desvanece.
   - La cereza se vuelve transparente y aparecen dos granos verdes enfrentados por su cara plana.
   - Tueste: los granos pasan de verde a amarillo, canela y marrón oscuro, crecen un 18 % y ganan brillo, con chispas de calor y una luz cálida.
   - Los granos caen en una taza que sube desde abajo; el café la llena con latte art y aparece el vapor.
   Sumar un indicador lateral con las cinco etapas, un velo oscuro radial y sombra en el texto para que se lea bien. La animación se suaviza con interpolación y se pausa fuera de pantalla. Si no hay WebGL, se muestra una ilustración de reemplazo.
3. **Cursos y certificados** como fichas de recetario en papel con cinta, levemente giradas, con año, institución y un sello manuscrito: completado / en curso / próximo.
4. **Trabajemos juntos:** seis tarjetas oscuras numeradas (talleres, catas guiadas, capacitación de equipos, intervenciones de barra, asesoría para cafeterías, colaboraciones), con un brillo radial que sigue al cursor.
5. **Contacto:** un bloque de papel con "Charlemos de café." y un V60 en SVG con gotas animadas.
6. **Ventana "Charlemos de café":** botón a Instagram y formulario (nombre, correo, tipo de proyecto en chips, mensaje). Sin servidor, arma el correo para abrir o copiar. Con un endpoint de Formspree configurado, lo envía directo.

**Redes:** solo Instagram.

**Tipografías (Google Fonts):** Young Serif para títulos, Figtree para texto y UI, JetBrains Mono para datos técnicos y etiquetas, Caveat para notas manuscritas.

**Paleta:** fondo `#122019`, panel `#172A20`, texto `#ECE7DA`, verde salvia `#A9C6A0`, madera `#C08756`, cereza `#B5412F`, papel `#E8E2D3`, tinta `#1B1A16`, secundario `#A3AA9C`.

**Detalles reales del oficio como contenido:** 18 g → 36 g, 28 s, 93 °C, ratio 1:2; primer crack ≈ 196 °C; desarrollo 18–22 %; dos semillas por cereza.

**Requisitos:** responsive (celular primero, con 16 px de margen mínimo), accesible (foco visible, `prefers-reduced-motion`, aria), datos editables (Instagram, correo, cursos, servicios) en un objeto CONFIG al principio del JS, y Three.js r128 desde cdnjs.
