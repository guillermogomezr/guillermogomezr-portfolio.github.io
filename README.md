# Portfolio · Guillermo Gómez Rivas

Mi currículum dibujado como un **plano de arquitectura cloud**. Web estática (HTML, CSS y JavaScript, sin dependencias ni proceso de compilación), lista para GitHub Pages.

## Estructura

```
index.html          página
css/styles.css      diseño (temas papel / cianotipia)
css/fonts.css       tipografías autoalojadas
js/data.js          ← TODO EL CONTENIDO (español). Edita aquí.
js/data.en.js       ← traducción al inglés del contenido
js/i18n.js          textos de la interfaz (botones, consola…) en ES y EN
js/app.js           lógica: plano, fichas, consola, modo lectura
assets/             imágenes, fuentes, og.png
.nojekyll           evita que GitHub Pages procese el sitio con Jekyll
```

## Actualizar el contenido

Todo sale de `js/data.js`. Ejemplos:

- **LinkedIn / GitHub / foto**: rellena `config.linkedin`, `config.github` y `config.photo` (p. ej. `"assets/img/foto.jpg"`). Si están vacíos no se muestran.
- **CV en PDF**: sube tu CV como `assets/cv-guillermo-gomez-rivas.pdf`. El botón lo detecta solo; mientras no exista, abre el modo lectura.
- **Certificaciones**: añádelas a `certifications: [{ name, org, year, url }]` y aparecerán por encima de los cursos.
- **Nuevo curso**: añádelo en `courses` dentro de su grupo.
- **Nueva tecnología**: añádela en `stack`; en `used` pon los ids de los nodos donde la has usado (así se resalta en el plano).
- **Servidor MCP terminado**: completa `problem`, `did` y `result` del nodo `mcp` y cambia `status: "done"`.

## Idiomas (ES / EN)

- El botón **ES | EN** de la barra superior cambia todo el texto al momento.
- Idioma inicial: el que el visitante eligió la última vez; si es su primera visita, español si su navegador está en español e inglés en cualquier otro caso.
- Para compartir la versión en inglés directamente: `https://tu-usuario.github.io/?lang=en` (útil en el apartado en inglés de LinkedIn).
- Cuando cambies algo en `data.js`, cambia también su traducción en `data.en.js`. Si se te olvida, ese texto saldrá en español, pero no se rompe nada.

## Publicar en GitHub Pages (gratis)

1. Crea un repositorio público llamado **`tu-usuario.github.io`** (así la web queda en `https://tu-usuario.github.io`). Si usas otro nombre, quedará en `https://tu-usuario.github.io/nombre-repo`.
2. Sube el contenido de esta carpeta a la raíz del repositorio (con GitHub Desktop, o arrastrando los archivos en la web de GitHub → *Add file → Upload files*).
3. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)` → *Save*.
4. En uno o dos minutos la web estará publicada.
5. Edita en `index.html` la línea `og:image` y pon la URL completa (p. ej. `https://tu-usuario.github.io/assets/og.png`). Así LinkedIn mostrará la vista previa con imagen al compartir el enlace.

## Enlazarlo desde LinkedIn

- **Perfil → Información de contacto → Sitio web**: añade la URL con el tipo "Portfolio".
- **Destacado → Añadir enlace**: pega la URL; usará la imagen `og.png` como portada.

## Probar en local

Abre `index.html` con doble clic, o mejor, sirve la carpeta: `python -m http.server` y visita `http://localhost:8000`.

## Detalles

- Vista **Plano** (interactiva) y **Lectura** (CV lineal, pensado para reclutadores con prisa), en español e inglés.
- Pulsa cualquier recurso para abrir su ficha. Enlaces directos: `#demand-forecast`, `#servidor-mcp`, `#a-critical-mind`, `#politicas-iam`…
- Consola oculta: tecla `º` (o el botón `>_`). Prueba `help`, `ls`, `terraform plan`, `terraform destroy` o `sudo contratar`.
- Respeta el modo oscuro del sistema y `prefers-reduced-motion`.
