// IPROGRAM — animaciones globales: reveal on scroll, typing del hero, nav móvil.

// ---------- Reveal on scroll ----------
const observador = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                observador.unobserve(entrada.target);
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => observador.observe(el));

// ---------- Menú móvil ----------
const botonNav = document.querySelector('.nav-toggle');
const enlacesNav = document.querySelector('.nav-links');

if (botonNav && enlacesNav) {
    botonNav.addEventListener('click', () => {
        const abierto = enlacesNav.classList.toggle('abierto');
        botonNav.setAttribute('aria-expanded', abierto);
    });
}

// ---------- Efecto de escritura en el hero ----------
const contenedorCodigo = document.getElementById('codigo-animado');

if (contenedorCodigo) {
    // Tokens: [texto, claseCss | null]
    const lineas = [
        [['// Tu futuro empieza aquí ', 'tk-com']],
        [['const', 'tk-kw'], [' futuro ', null], ['= ', null], ["'programador'", 'tk-str'], [';', null]],
        [['const', 'tk-kw'], [' costo ', null], ['= ', null], ['0', 'tk-str'], ['; ', null], ['// gratis / free', 'tk-com']],
        [[' ', null]],
        [['function', 'tk-kw'], [' aprender', 'tk-fn'], ['(jugando) {', null]],
        [['  return', 'tk-kw'], [' ', null], ["'¡Sí se puede! 🇻🇪'", 'tk-str'], [';', null]],
        [['}', null]],
    ];

    const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cursor = document.createElement('span');
    cursor.className = 'cursor-typing';
    cursor.innerHTML = '&nbsp;';
    contenedorCodigo.appendChild(cursor);

    let fila = 0;
    let token = 0;
    let letra = 0;
    let spanActual = null;

    function escribir() {
        if (fila >= lineas.length) return;

        const [texto, clase] = lineas[fila][token];

        if (letra === 0) {
            spanActual = document.createElement('span');
            if (clase) spanActual.className = clase;
            contenedorCodigo.insertBefore(spanActual, cursor);
        }

        spanActual.textContent = texto.slice(0, ++letra);

        if (letra >= texto.length) {
            letra = 0;
            token++;
            if (token >= lineas[fila].length) {
                token = 0;
                fila++;
                contenedorCodigo.insertBefore(document.createTextNode('\n'), cursor);
            }
        }

        setTimeout(escribir, 28 + Math.random() * 40);
    }

    if (reducirMovimiento) {
        // Sin animación: mostrar todo de una vez
        lineas.forEach((tokens) => {
            tokens.forEach(([texto, clase]) => {
                const s = document.createElement('span');
                if (clase) s.className = clase;
                s.textContent = texto;
                contenedorCodigo.insertBefore(s, cursor);
            });
            contenedorCodigo.insertBefore(document.createTextNode('\n'), cursor);
        });
    } else {
        setTimeout(escribir, 500);
    }
}
