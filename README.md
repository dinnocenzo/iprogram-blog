# IPROGRAM 🎮

**Aprende a programar jugando — gratis, en español, practicando inglés.**

IPROGRAM es una plataforma educativa **100% gratuita** para la sociedad venezolana
y latina. Enseña los mecanismos básicos para volverte programador (variables,
condicionales, bucles y funciones) a través de minijuegos interactivos. Todo el
contenido está en español, pero cada término técnico aparece también en inglés,
para que aprendas el vocabulario que usa la industria mientras juegas.

🔗 **Demo en vivo:** https://dinnocenzo.github.io/iprogram-blog/

## Los juegos

| Juego | Practica |
|---|---|
| 🧠 Memoria Bilingüe | Vocabulario técnico English ↔ Español |
| ⚡ Quiz Relámpago | Lógica: ¿qué imprime este código? |
| 🐛 Caza el Bug | Lectura de código y detección de errores |
| 🧩 Ordena el Código | Secuencias y estructura de programas |

## Tech Stack

- HTML5 + CSS3 (variables, keyframes, `prefers-reduced-motion`)
- JavaScript puro (sin frameworks ni build tools)
- Animaciones: reveal on scroll (IntersectionObserver), efecto de escritura, gradientes animados

## Estructura del proyecto

```
iprogram-blog/
├── index.html      # Landing: misión, ruta de aprendizaje, vocabulario
├── juegos.html     # Zona de juegos (4 minijuegos)
├── blogpost.html   # Blog de la comunidad
├── noticias.html   # Noticias de tecnología para LATAM
├── estillos.css    # Estilos y animaciones del sitio
├── js/
│   ├── main.js     # Animaciones globales (scroll reveal, typing, nav móvil)
│   └── juegos.js   # Lógica y datos de los juegos
├── LICENSE         # Licencia MIT
└── README.md
```

## Cómo verlo localmente

No necesita instalación ni dependencias:

```
git clone https://github.com/dinnocenzo/iprogram-blog.git
```

Abre `index.html` en cualquier navegador moderno.

## Misión

Creemos que aprender a programar puede cambiar vidas. Este proyecto existe para
que cualquier persona en Venezuela y Latinoamérica, sin importar su situación
económica, pueda construirse un futuro en la tecnología. Siempre será gratuito.

## Licencia

MIT — ver [LICENSE](LICENSE).
