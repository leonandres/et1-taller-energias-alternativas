// menu.js - Genera el menú con resaltado de sección activa
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciarMenu);
    } else {
        iniciarMenu();
    }

    function iniciarMenu() {
        // Obtener el hash actual (ej: #seccion-1)
        const currentHash = window.location.hash;
        
        const menuConfig = {
            clases: [
                { numero: 1, nombre: "Seguridad e higiene", url: "../clase-1/index.html", disponible: true },
                { numero: 2, nombre: "Renovables vs no renovables", url: "../clase-2/index.html", disponible: false },
                { numero: 3, nombre: "Energía geotérmica", url: "../clase-3/index.html", disponible: true },
                { numero: 4, nombre: "Energía eólica", url: "../clase-4/index.html", disponible: true },
                { 
                    numero: 5, 
                    nombre: "Energía solar", 
                    url: "index.html",
                    disponible: true,
                    esActual: true,
                    subtemas: [
                        { nombre: "Radiación solar", anchor: "seccion-1", icono: "☀️" },
                        { nombre: "Fotovoltaica", anchor: "seccion-2", icono: "🔋" },
                        { nombre: "Termosolar", anchor: "seccion-3", icono: "🔥" },
                        { nombre: "El sol como material de obra", anchor: "seccion-4", icono: "🏗️" },
                        { nombre: "I+D en Argentina", anchor: "seccion-5", icono: "🇦🇷" },
                        { nombre: "Ley 27.424", anchor: "seccion-6", icono: "⚖️" }
                    ],
                    herramientas: [
                        { nombre: "Calculadora de cargas", url: "calculo-de-eficiencia.html", icono: "🧮", destacado: true },
                        { nombre: "Preguntas frecuentes", url: "preguntas-frecuentes.html", icono: "❓", destacado: false }
                    ]
                },
                { numero: 6, nombre: "Biomasa", url: "../clase-6/index.html", disponible: false },
                { numero: 7, nombre: "Hidroeléctrica y mareomotriz", url: "../clase-7/index.html", disponible: false },
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
                    menuHTML += `
                        <div class="bg-gradient-to-r from-yellow-500/15 to-yellow-500/5 border-l-4 border-yellow-500 p-3 rounded-r-xl my-2">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-yellow-500 text-lg">⭐</span>
                                <a href="${clase.url}" class="text-yellow-500 font-bold text-sm">${clase.numero}. ${clase.nombre}</a>
                            </div>
                    `;
                    
                    if (clase.subtemas && clase.subtemas.length > 0) {
                        menuHTML += `
                            <div class="pl-4 space-y-1 border-l border-yellow-500/30 ml-1 mt-2">
                                <div class="text-[10px] font-bold text-yellow-600/70 uppercase tracking-wider mb-2">📖 Contenido</div>
                        `;
                        clase.subtemas.forEach(sub => {
                            const anchorUrl = `${clase.url}#${sub.anchor}`;
                            const isActive = currentHash === `#${sub.anchor}`;
                            const activeClass = isActive 
                                ? 'bg-yellow-500/20 text-yellow-400 font-bold border-l-2 border-yellow-500' 
                                : 'text-slate-400 hover:text-yellow-400 hover:bg-slate-800/50';
                            menuHTML += `
                                <a href="${anchorUrl}" class="flex items-center gap-2 py-1.5 px-2 rounded-lg text-sm ${activeClass} transition-all duration-200">
                                    <span class="text-base">${sub.icono}</span>
                                    <span>${sub.nombre}</span>
                                    ${isActive ? '<span class="ml-auto text-[10px] text-yellow-500">● Actual</span>' : ''}
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
                                ? 'bg-yellow-500/10 text-yellow-500 font-bold border border-yellow-500/30' 
                                : 'text-slate-400 hover:text-yellow-500 hover:bg-slate-800/50';
                            menuHTML += `
                                <a href="${herramienta.url}" class="flex items-center gap-2 py-1.5 px-2 rounded-lg text-sm ${claseColor} transition-all duration-200">
                                    <span class="text-base">${herramienta.icono}</span>
                                    <span>${herramienta.nombre}</span>
                                </a>
                            `;
                        });
                        menuHTML += `</div>`;
                    }
                    menuHTML += `</div>`;
                } else {
                    menuHTML += `
                        <a href="${clase.url}" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 text-slate-400 text-sm transition-all group">
                            <span class="w-1.5 h-6 bg-slate-700 rounded-full group-hover:bg-yellow-500 transition-colors"></span>
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