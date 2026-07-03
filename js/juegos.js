// IPROGRAM — Lógica de los 4 minijuegos educativos.
// Todo en JavaScript puro, sin dependencias.

(function () {
    'use strict';

    // ---------- Referencias al DOM ----------
    const selector = document.getElementById('selector-juegos');
    const zonaJuego = document.getElementById('zona-juego');
    const tituloJuego = document.getElementById('titulo-juego');
    const contenido = document.getElementById('contenido-juego');
    const mensaje = document.getElementById('mensaje-juego');
    const pistaEn = document.getElementById('pista-en');
    const marcadorPuntaje = document.getElementById('puntaje');
    const barraProgreso = document.getElementById('barra-progreso');
    const botonVolver = document.getElementById('volver');

    let puntaje = 0;

    function sumarPuntos(n) {
        puntaje += n;
        marcadorPuntaje.textContent = '⭐ ' + puntaje;
    }

    function ponerMensaje(texto, tipo) {
        mensaje.textContent = texto;
        mensaje.className = 'mensaje-juego' + (tipo ? ' ' + tipo : '');
    }

    function ponerProgreso(actual, total) {
        barraProgreso.style.width = Math.round((actual / total) * 100) + '%';
    }

    function barajar(lista) {
        const copia = lista.slice();
        for (let i = copia.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copia[i], copia[j]] = [copia[j], copia[i]];
        }
        return copia;
    }

    // ============================================================
    // 1) MEMORIA BILINGÜE — parejas English ↔ Español
    // ============================================================

    const VOCABULARIO = [
        ['loop', 'bucle'],
        ['array', 'lista'],
        ['string', 'texto'],
        ['bug', 'error'],
        ['return', 'devolver'],
        ['function', 'función'],
        ['variable', 'caja de datos'],
        ['debug', 'depurar'],
        ['keyboard', 'teclado'],
        ['file', 'archivo'],
    ];

    function jugarMemoria() {
        tituloJuego.textContent = '🧠 Memoria Bilingüe';
        pistaEn.textContent = 'Tip: en la industria casi toda la documentación está en English. ¡Este vocabulario te lo vas a cruzar siempre!';

        const parejas = barajar(VOCABULARIO).slice(0, 6);
        const cartas = barajar(
            parejas.flatMap(([en, es], indice) => [
                { texto: '🇬🇧 ' + en, pareja: indice },
                { texto: '🇪🇸 ' + es, pareja: indice },
            ])
        );

        let logradas = 0;
        let primera = null;
        let bloqueado = false;

        const grid = document.createElement('div');
        grid.className = 'memoria-grid';
        contenido.innerHTML = '';
        contenido.appendChild(grid);
        ponerProgreso(0, parejas.length);
        ponerMensaje('Encuentra las ' + parejas.length + ' parejas. Haz clic en dos cartas para voltearlas.');

        cartas.forEach((carta) => {
            const el = document.createElement('button');
            el.className = 'carta';
            el.style.position = 'relative';
            el.textContent = carta.texto;
            el.addEventListener('click', () => {
                if (bloqueado || el.classList.contains('volteada') || el.classList.contains('lograda')) return;

                el.classList.add('volteada');

                if (!primera) {
                    primera = { el, pareja: carta.pareja };
                    return;
                }

                if (primera.pareja === carta.pareja) {
                    el.classList.add('lograda');
                    primera.el.classList.add('lograda');
                    primera = null;
                    logradas++;
                    sumarPuntos(10);
                    ponerProgreso(logradas, parejas.length);
                    if (logradas === parejas.length) {
                        ponerMensaje('🎉 ¡Excelente! Completaste todas las parejas. Ya sabes ' + parejas.length + ' términos en inglés.', 'bien');
                    } else {
                        ponerMensaje('✅ ¡Pareja correcta! (+10 puntos)', 'bien');
                    }
                } else {
                    bloqueado = true;
                    ponerMensaje('❌ No son pareja. Memoriza dónde están…', 'mal');
                    const anterior = primera;
                    primera = null;
                    setTimeout(() => {
                        el.classList.remove('volteada');
                        anterior.el.classList.remove('volteada');
                        bloqueado = false;
                    }, 900);
                }
            });
            grid.appendChild(el);
        });
    }

    // ============================================================
    // 2) QUIZ RELÁMPAGO — ¿qué imprime este código?
    // ============================================================

    const PREGUNTAS_QUIZ = [
        {
            codigo: 'let edad = 15;\nedad = edad + 3;\nconsole.log(edad);',
            concepto: 'Variables (variables): su valor puede cambiar mientras corre el programa.',
            opciones: ['15', '18', 'edad + 3', 'Error'],
            correcta: 1,
        },
        {
            codigo: "let clima = 'lluvia';\nif (clima === 'sol') {\n  console.log('Playa 🏖️');\n} else {\n  console.log('Película 🎬');\n}",
            concepto: "Condicionales (if / else): el programa elige un camino según la condición.",
            opciones: ['Playa 🏖️', 'Película 🎬', 'sol', 'No imprime nada'],
            correcta: 1,
        },
        {
            codigo: 'let total = 0;\nfor (let i = 1; i <= 3; i++) {\n  total = total + i;\n}\nconsole.log(total);',
            concepto: 'Bucles (loops): repite el bloque 3 veces sumando 1 + 2 + 3.',
            opciones: ['3', '123', '6', '9'],
            correcta: 2,
        },
        {
            codigo: "function saludar(nombre) {\n  return 'Hola ' + nombre;\n}\nconsole.log(saludar('Caracas'));",
            concepto: 'Funciones (functions): reciben datos y devuelven (return) un resultado.',
            opciones: ['Hola nombre', 'saludar', 'Hola Caracas', 'Error'],
            correcta: 2,
        },
        {
            codigo: "let frutas = ['mango', 'cambur', 'lechosa'];\nconsole.log(frutas.length);",
            concepto: "Listas (arrays): 'length' significa 'longitud' — cuántos elementos hay.",
            opciones: ['2', '3', 'mango', 'lechosa'],
            correcta: 1,
        },
        {
            codigo: "let mensaje = 'Sí se puede';\nconsole.log(mensaje.toUpperCase());",
            concepto: "Textos (strings): 'toUpperCase' = 'pasar a mayúsculas' en inglés.",
            opciones: ['sí se puede', 'SÍ SE PUEDE', 'Sí se puede', 'Error'],
            correcta: 1,
        },
    ];

    function jugarQuiz() {
        tituloJuego.textContent = '⚡ Quiz Relámpago';
        const preguntas = barajar(PREGUNTAS_QUIZ);
        let actual = 0;

        function mostrarPregunta() {
            if (actual >= preguntas.length) {
                contenido.innerHTML = '';
                ponerMensaje('🏆 ¡Quiz completado! Los bucles y condicionales ya no tienen secretos para ti.', 'bien');
                pistaEn.textContent = 'Quiz terminado (quiz finished). Prueba otro juego para seguir sumando puntos.';
                return;
            }

            const p = preguntas[actual];
            ponerProgreso(actual, preguntas.length);
            ponerMensaje('Pregunta ' + (actual + 1) + ' de ' + preguntas.length + ': ¿qué imprime este código?');
            pistaEn.textContent = '';

            contenido.innerHTML = '';
            const cod = document.createElement('div');
            cod.className = 'codigo-juego';
            cod.textContent = p.codigo;
            contenido.appendChild(cod);

            const caja = document.createElement('div');
            caja.className = 'opciones';
            contenido.appendChild(caja);

            barajar(p.opciones.map((texto, i) => ({ texto, esCorrecta: i === p.correcta }))).forEach((op) => {
                const boton = document.createElement('button');
                boton.className = 'opcion';
                boton.textContent = op.texto;
                boton.addEventListener('click', () => {
                    caja.querySelectorAll('.opcion').forEach((b) => (b.disabled = true));
                    if (op.esCorrecta) {
                        boton.classList.add('correcta');
                        sumarPuntos(15);
                        ponerMensaje('✅ ¡Correcto! (+15 puntos)', 'bien');
                    } else {
                        boton.classList.add('incorrecta');
                        caja.querySelectorAll('.opcion').forEach((b) => {
                            if (b.textContent === p.opciones[p.correcta]) b.classList.add('correcta');
                        });
                        ponerMensaje('❌ Casi. La respuesta era: ' + p.opciones[p.correcta], 'mal');
                    }
                    pistaEn.textContent = '💡 ' + p.concepto;
                    actual++;
                    setTimeout(mostrarPregunta, 2600);
                });
                caja.appendChild(boton);
            });
        }

        mostrarPregunta();
    }

    // ============================================================
    // 3) CAZA EL BUG — clic en la línea con el error
    // ============================================================

    const RETOS_BUG = [
        {
            lineas: [
                "let nombre = 'Simón';",
                "console.log('Hola ' + nombr);",
            ],
            buggy: 1,
            explicacion: "La variable se llama 'nombre', pero se escribió 'nombr'. A esto se le llama typo (error de tipeo).",
        },
        {
            lineas: [
                'let edad = 20;',
                'if (edad = 18) {',
                "  console.log('Mayor de edad');",
                '}',
            ],
            buggy: 1,
            explicacion: "Con un solo '=' se asigna un valor. Para comparar se usa '===' (igual a / equals).",
        },
        {
            lineas: [
                'for (let i = 0; i < 5; i--) {',
                '  console.log(i);',
                '}',
            ],
            buggy: 0,
            explicacion: "El bucle resta (i--) en vez de sumar (i++), así que nunca termina: un bucle infinito (infinite loop).",
        },
        {
            lineas: [
                'function sumar(a, b) {',
                '  a + b;',
                '}',
                'console.log(sumar(2, 3));',
            ],
            buggy: 1,
            explicacion: "Falta la palabra 'return' (devolver). Sin ella, la función no entrega el resultado.",
        },
        {
            lineas: [
                "let paises = ['🇻🇪', '🇨🇴', '🇦🇷'];",
                'console.log(paises[3]);',
            ],
            buggy: 1,
            explicacion: 'Las listas (arrays) empiezan en 0: las posiciones son 0, 1 y 2. La posición 3 no existe.',
        },
    ];

    function jugarBug() {
        tituloJuego.textContent = '🐛 Caza el Bug';
        const retos = barajar(RETOS_BUG);
        let actual = 0;

        function mostrarReto() {
            if (actual >= retos.length) {
                contenido.innerHTML = '';
                ponerMensaje('🏆 ¡Cazaste todos los bugs! Leer código ajeno es una de las habilidades más valiosas.', 'bien');
                pistaEn.textContent = 'Bug hunter nivel: profesional. 🐛🔫';
                return;
            }

            const reto = retos[actual];
            ponerProgreso(actual, retos.length);
            ponerMensaje('Reto ' + (actual + 1) + ' de ' + retos.length + ': haz clic en la línea que tiene el bug.');
            pistaEn.textContent = '';

            contenido.innerHTML = '';
            const cod = document.createElement('div');
            cod.className = 'codigo-juego';
            contenido.appendChild(cod);

            let respondido = false;

            reto.lineas.forEach((linea, i) => {
                const el = document.createElement('span');
                el.className = 'linea-codigo';
                el.textContent = linea;
                el.addEventListener('click', () => {
                    if (respondido) return;
                    respondido = true;
                    if (i === reto.buggy) {
                        el.classList.add('correcta');
                        sumarPuntos(20);
                        ponerMensaje('✅ ¡Bug cazado! (+20 puntos)', 'bien');
                    } else {
                        el.classList.add('incorrecta');
                        cod.children[reto.buggy].classList.add('correcta');
                        ponerMensaje('❌ El bug estaba en otra línea.', 'mal');
                    }
                    pistaEn.textContent = '💡 ' + reto.explicacion;
                    actual++;
                    setTimeout(mostrarReto, 3200);
                });
                cod.appendChild(el);
            });
        }

        mostrarReto();
    }

    // ============================================================
    // 4) ORDENA EL CÓDIGO — arma el programa en el orden correcto
    // ============================================================

    const RETOS_ORDEN = [
        {
            titulo: 'Un saludo con nombre',
            lineas: [
                "let nombre = 'Ana';",
                "let saludo = 'Hola ' + nombre;",
                'console.log(saludo);',
            ],
            explicacion: 'Primero se crea la variable, luego se usa, y al final se imprime. El orden importa (order matters).',
        },
        {
            titulo: 'Decidir según la nota',
            lineas: [
                'let nota = 18;',
                'if (nota >= 10) {',
                "  console.log('Aprobado ✅');",
                '}',
            ],
            explicacion: 'La condición (if) necesita que la variable exista antes, y la llave } siempre cierra el bloque.',
        },
        {
            titulo: 'Contar hasta 3',
            lineas: [
                'for (let i = 1; i <= 3; i++) {',
                '  console.log(i);',
                '}',
            ],
            explicacion: 'El bucle (loop) abre, adentro va lo que se repite, y la llave } lo cierra.',
        },
        {
            titulo: 'Una función completa',
            lineas: [
                'function doble(numero) {',
                '  return numero * 2;',
                '}',
                'console.log(doble(7));',
            ],
            explicacion: 'Primero se define la función (function), después se puede llamar. Definir ≠ ejecutar.',
        },
    ];

    function jugarOrdena() {
        tituloJuego.textContent = '🧩 Ordena el Código';
        const retos = barajar(RETOS_ORDEN);
        let actual = 0;

        function mostrarReto() {
            if (actual >= retos.length) {
                contenido.innerHTML = '';
                ponerMensaje('🏆 ¡Armaste todos los programas! Pensar en secuencias es pensar como programador.', 'bien');
                pistaEn.textContent = 'Nivel completado (level complete). 🚀';
                return;
            }

            const reto = retos[actual];
            ponerProgreso(actual, retos.length);
            ponerMensaje('Reto ' + (actual + 1) + ' de ' + retos.length + ' — "' + reto.titulo + '": haz clic en las líneas en el orden correcto.');
            pistaEn.textContent = '';

            contenido.innerHTML = '';

            const destino = document.createElement('div');
            destino.className = 'bloques-ordenados codigo-juego';
            destino.style.minHeight = 2.2 * reto.lineas.length + 'em';
            contenido.appendChild(destino);

            const origen = document.createElement('div');
            origen.className = 'bloques-desordenados';
            contenido.appendChild(origen);

            let esperada = 0;

            // Barajar hasta que no quede en el orden original
            let desordenadas;
            do {
                desordenadas = barajar(reto.lineas.map((texto, orden) => ({ texto, orden })));
            } while (desordenadas.every((b, i) => b.orden === i));

            desordenadas.forEach((bloque) => {
                const el = document.createElement('button');
                el.className = 'bloque';
                el.textContent = bloque.texto;
                el.addEventListener('click', () => {
                    if (el.disabled) return;
                    if (bloque.orden === esperada) {
                        esperada++;
                        el.disabled = true;
                        el.style.visibility = 'hidden';
                        const colocado = document.createElement('div');
                        colocado.className = 'bloque colocado';
                        colocado.textContent = bloque.texto;
                        destino.appendChild(colocado);
                        if (esperada === reto.lineas.length) {
                            sumarPuntos(20);
                            ponerMensaje('✅ ¡Programa armado! (+20 puntos)', 'bien');
                            pistaEn.textContent = '💡 ' + reto.explicacion;
                            actual++;
                            setTimeout(mostrarReto, 3000);
                        } else {
                            ponerMensaje('✅ Bien, ¿cuál sigue?', 'bien');
                        }
                    } else {
                        el.classList.add('incorrecta');
                        setTimeout(() => el.classList.remove('incorrecta'), 450);
                        ponerMensaje('❌ Esa línea todavía no va. Piensa qué necesita existir primero.', 'mal');
                    }
                });
                origen.appendChild(el);
            });
        }

        mostrarReto();
    }

    // ============================================================
    // Selector de juegos
    // ============================================================

    const JUEGOS = {
        memoria: jugarMemoria,
        quiz: jugarQuiz,
        bug: jugarBug,
        ordena: jugarOrdena,
    };

    selector.querySelectorAll('.tarjeta-juego').forEach((tarjeta) => {
        tarjeta.addEventListener('click', () => {
            selector.hidden = true;
            zonaJuego.hidden = false;
            pistaEn.textContent = '';
            ponerProgreso(0, 1);
            JUEGOS[tarjeta.dataset.juego]();
            zonaJuego.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    botonVolver.addEventListener('click', () => {
        zonaJuego.hidden = true;
        selector.hidden = false;
        contenido.innerHTML = '';
        ponerMensaje('');
        pistaEn.textContent = '';
    });
})();
