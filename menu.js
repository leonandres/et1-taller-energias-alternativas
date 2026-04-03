// menu.js - Menú con bolitas y efecto hover
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciarMenu);
    } else {
        iniciarMenu();
    }

    // Escuchar cambios en el hash (#) para actualizar el estado activo sin recargar
    window.addEventListener('hashchange', iniciarMenu);

    function iniciarMenu() {
        const currentHash = window.location.hash;
        
        const menuConfig = {
            clases: [
                { numero: 1, nombre: "Seguridad e higiene", url: "../clase-1/index.html", disponible: true },
                { numero: 2, nombre: "Renovables vs no renovables", url: "../clase-2/index.html", disponible: false },
                { numero: 3, nombre: "Energía geotérmica", url: "../clase-3/index.html", disponible: true },
                { 
                    numero: 4, 
                    nombre: "Energía eólica", 
                    url: "../clase-4/index.html", 
                    disponible: true,
                    esActual: true,
                    subtemas: [
                        { nombre: "¿Cómo funciona?", anchor: "seccion-1" },
                        { nombre: "Anatomía del equipo", anchor: "seccion-2" },
                        { nombre: "Eje horizontal vs vertical", anchor: "seccion-3" },
                        { nombre: "Viento y Estructura", anchor: "seccion-4" },
                        { nombre: "Eólica en Argentina", anchor: "seccion-5" }
                    ],
                    herramientas: [
                        { nombre: "Mapa de vientos (SIG)", url: "#", destacado: true }
                    ]
                },
                { 
                    numero: 5, 
                    nombre: "Energía solar", 
                    url: "index.html",
                    disponible: true,
                    esActual: false,
                    subtemas: [
                        { nombre: "Radiación solar", anchor: "seccion-1" },
                        { nombre: "Fotovoltaica", anchor: "seccion-2" },
                        { nombre: "Termosolar", anchor: "seccion-3" },
                        { nombre: "El sol como material de obra", anchor: "seccion-4" },
                        { nombre: "I+D en Argentina", anchor: "seccion-5" },
                        { nombre: "Ley 27.424", anchor: "seccion-6" }
                    ],
                    herramientas: [
                        { nombre: "Calculadora de cargas", url: "calculo-de-eficiencia.html", destacado: true },
                        { nombre: "Preguntas frecuentes", url: "preguntas-frecuentes.html", destacado: false }
                    ]
                },
                { 
                    numero: 6, 
                    nombre: "Biomasa", 
                    url: "../clase-6/index.html", 
                    disponible: true,
                    esActual: false,
                    subtemas: [
                        { nombre: "¿Qué es la biomasa?", anchor: "seccion-1" },
                        { nombre: "Tipos: Seca vs Húmeda", anchor: "seccion-2" },
                        { nombre: "El Biodigestor", anchor: "seccion-3" },
                        { nombre: "Biocombustibles", anchor: "seccion-4" },
                        { nombre: "Impacto ambiental", anchor: "seccion-5" }
                    ],
                    herramientas: [
                        { nombre: "Calculadora de Biogás", url: "#", destacado: true },
                        { nombre: "Ficha de mantenimiento", url: "#", destacado: false }
                    ]
                },
                { 
                    numero: 7, 
                    nombre: "Hidroeléctrica y mareomotriz", 
                    url: "../clase-7/index.html", 
                    disponible: true,
                    esActual: false,
                    subtemas: [
                        { nombre: "Hidroeléctrica: ¿Cómo funciona?", anchor: "seccion-1" },
                        { nombre: "Tipos de centrales", anchor: "seccion-2" },
                        { nombre: "Impacto ambiental (Hidro)", anchor: "seccion-3" },
                        { nombre: "Mareomotriz: Principios", anchor: "seccion-4" },
                        { nombre: "Tecnologías mareomotrices", anchor: "seccion-5" },
                        { nombre: "Ventajas y desventajas (Mareo)", anchor: "seccion-6" }
                    ],
                    herramientas: [
                        { nombre: "Mapa de recursos hídricos", url: "#", destacado: false }
                    ]
                },
                { numero: 8, nombre: "Uso responsable y vivienda sustentable", url: "../clase-8/index.html", disponible: false }
            ]
        };

        function generarMenu() {
            let menuHTML = `
                <div>
                    <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">📚 Clases del Módulo</h4>
                    <div class="space-y-1">
            `;

            menuConfig.clases.forEach(clase => {
                if (!clase.disponible) {
                    menuHTML += `
                        <div class="flex items-center gap-3 p-3 rounded-xl text-slate-500 text-sm opacity-50 cursor-not-allowed">
                            <span class="w-1.5 h-6 bg-slate-700 rounded-full"></span>
                            ${clase.numero}. ${clase.nombre}
                            <span class="text-[10px] text-slate-600 ml-auto">🔜</span>
                        </div>
                    `;
                    return;
                }

                if (clase.esActual) {
                    // Clase activa: fondo más claro y borde amarillo
                    menuHTML += `
                        <div class="bg-gradient-to-r from-cyan-500/10 to-blue-500/5 border-l-4 border-cyan-400 p-3 rounded-r-xl my-2">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-cyan-400 text-lg">⭐</span>
                                <a href="${clase.url}" class="text-cyan-400 font-bold text-sm">${clase.numero}. ${clase.nombre}</a>
                            </div>
                    `;
                    
                    if (clase.subtemas && clase.subtemas.length > 0) {
                        menuHTML += `
                            <div class="pl-4 space-y-1 border-l border-cyan-400/30 ml-1 mt-2">
                                <div class="text-[10px] font-bold text-cyan-400/70 uppercase tracking-wider mb-2">📖 Contenido</div>
                        `;
                        clase.subtemas.forEach(sub => {
                            const anchorUrl = `${clase.url}#${sub.anchor}`;
                            const isActive = currentHash === `#${sub.anchor}`;
                            const activeClass = isActive 
                                ? 'text-cyan-300 font-bold bg-cyan-500/10' 
                                : 'text-slate-300 hover:text-cyan-300';
                            
                            // Bolita que al hover se transforma en barra
                            menuHTML += `
                                <a href="${anchorUrl}" class="flex items-center gap-2 py-1.5 pl-2 rounded-lg text-sm ${activeClass} transition-all duration-200 group">
                                    <span class="relative w-4 h-4 flex items-center justify-center">
                                        <span class="absolute w-2 h-2 bg-cyan-400 rounded-full group-hover:w-4 group-hover:h-0.5 group-hover:rounded-full transition-all duration-200 ${isActive ? '!w-4 !h-0.5 !rounded-full' : ''}"></span>
                                    </span>
                                    <span>${sub.nombre}</span>
                                    ${isActive ? '<span class="ml-auto text-[10px] text-cyan-400">● Actual</span>' : ''}
                                </a>
                            `;
                        });
                        menuHTML += `</div>`;
                    }
                    
                    menuHTML += `<div class="my-2 border-t border-slate-700/50"></div>`;
                    
                    if (clase.herramientas && clase.herramientas.length > 0) {
                        menuHTML += `
                            <div class="pl-4 mt-1 space-y-1">
                                <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">🛠️ Herramientas</div>
                        `;
                        clase.herramientas.forEach(herramienta => {
                            const claseColor = herramienta.destacado 
                                ? 'bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-400/30' 
                                : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50';
                            menuHTML += `
                                <a href="${herramienta.url}" class="flex items-center gap-2 py-1.5 px-2 rounded-lg text-sm ${claseColor} transition-all duration-200">
                                    <span>🛠️</span>
                                    <span>${herramienta.nombre}</span>
                                </a>
                            `;
                        });
                        menuHTML += `</div>`;
                    }
                    menuHTML += `</div>`;
                } else {
                    // Clase no actual: tono gris azulado
                    menuHTML += `
                        <a href="${clase.url}" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 text-slate-400 text-sm transition-all group">
                            <span class="w-1.5 h-6 bg-slate-700 rounded-full group-hover:bg-cyan-500 transition-colors"></span>
                            ${clase.numero}. ${clase.nombre}
                        </a>
                    `;
                }
            });

            menuHTML += `</div></div>`;
            return menuHTML;
        }

        let menuContainer = document.getElementById('menu-container');
        if (!menuContainer) {
            const spaceY8 = document.querySelector('.space-y-8');
            if (spaceY8) {
                menuContainer = document.createElement('div');
                menuContainer.id = 'menu-container';
                spaceY8.appendChild(menuContainer);
            }
        }
        
        if (menuContainer) {
            menuContainer.innerHTML = generarMenu();
        }
    }
})();