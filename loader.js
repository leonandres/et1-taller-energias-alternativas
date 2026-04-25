/**
 * loader.js - Carga dinámica de Header, Footer y Sidebar
 */
document.addEventListener('DOMContentLoaded', () => {
    const pathPrefix = window.location.pathname.includes('/clase-') ? '../' : '';
    
    // Mapeo de colores por clase
    const colorMap = {
        '1': 'red-500',
        '2': 'violet-500',
        '3': 'orange-500',
        '4': 'sky-500',
        '5': 'yellow-500',
        '6': 'green-500',
        '7': 'blue-500',
        '8': 'teal-500'
    };

    const classMatch = window.location.pathname.match(/clase-(\d+)/);
    const classNum = classMatch ? classMatch[1] : null;
    const activeColorClass = classNum ? colorMap[classNum] : 'yellow-500';
    
    // Extraer el color hexadecimal o usar una variable para que Tailwind no falle con clases dinámicas
    const colorValue = `var(--active-class-color, #eab308)`;
    document.documentElement.style.setProperty('--active-class-color', `var(--tw-color-${activeColorClass.replace('-500', '')}-500, ${classNum === '1' ? '#ef4444' : classNum === '2' ? '#8b5cf6' : '#eab308'})`);

    // 1. Inyectar Sidebar (Placeholder)
    const sidebarPlaceholder = document.getElementById('sidebar-container');
    if (sidebarPlaceholder) {
        sidebarPlaceholder.innerHTML = `
            <aside id="sidebar" class="fixed top-0 left-0 h-full w-80 bg-slate-900 border-r border-slate-800 z-[70] shadow-2xl overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-8">
                        <span class="font-black text-xl tracking-tighter text-${activeColorClass} uppercase">Energías alternativas</span>
                        <button id="close-sidebar" class="text-slate-400 hover:text-white">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                    <div id="menu-container"></div>
                </div>
            </aside>
        `;
    }

    // 2. Inyectar Header (Barra Superior)
    const headerPlaceholder = document.getElementById('header-container');
    if (headerPlaceholder) {
        // Detectamos el número de clase desde la URL (ej: /clase-5/ -> "Clase 5")
        const classPrefix = classNum ? `Clase ${classNum}: ` : '';
        const pageTitle = document.title.split('|')[0].trim();

        // Pasamos el fondo y el comportamiento sticky al contenedor principal
        headerPlaceholder.className = "bg-slate-900 text-white sticky top-0 z-50 shadow-lg border-b border-slate-800";
        
        headerPlaceholder.innerHTML = `
            <nav class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <button id="open-sidebar" class="p-2 -ml-2 hover:bg-slate-800 rounded-lg transition-colors"><svg class="w-6 h-6 text-${activeColorClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>
                    <span class="font-bold text-sm tracking-tight flex items-center gap-1.5"><span class="text-${activeColorClass} font-black">|</span>Energías alternativas<span class="mx-1 opacity-20">|</span><span class="text-slate-300 font-normal">${classPrefix}${pageTitle}</span></span>
                </div>
                <div class="flex items-center gap-4">
                    <button id="theme-toggle" class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"><span id="theme-toggle-dark-icon" class="hidden text-slate-300"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg></span><span id="theme-toggle-light-icon" class="text-amber-300/90"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><path stroke-linecap="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M19.78 4.22l-1.42 1.42"></path></svg></span></button>
                    <a href="${pathPrefix}index.html" class="text-xs font-bold uppercase text-slate-400 hover:text-white transition-colors hidden sm:block">Inicio</a>
                </div>
            </nav>
            <div id="scroll-progress-bar" class="absolute bottom-0 left-0 h-1 bg-${activeColorClass} transition-all duration-150" style="width: 0%"></div>
        `;
    }

    // 3. Inyectar Footer
    const footerPlaceholder = document.getElementById('footer-container');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
            <footer class="bg-slate-200 dark:bg-slate-800 border-t border-slate-300 dark:border-slate-700 py-10 text-center mt-12">
                <div class="max-w-4xl mx-auto px-6">
                    <p class="text-slate-500 dark:text-slate-400 font-medium tracking-wide italic">"La energía no se crea ni se destruye, solo se transforma"</p>
                    <p class="text-slate-600 dark:text-slate-300 font-bold mt-4 uppercase tracking-tighter text-sm">ET N°1 - Construcciones - Energías alternativas</p>
                    <p class="text-slate-400 text-[10px] mt-2 font-medium">© 2026 - Todos los derechos reservados</p>
                </div>
            </footer>
        `;
    }

    // 4. Inicializar componentes una vez inyectados
    setTimeout(() => {
        if (typeof window.iniciarMenu === 'function') window.iniciarMenu();
        if (typeof window.initSidebar === 'function') window.initSidebar();
        if (typeof window.initTheme === 'function') window.initTheme();
    }, 50);

    // 5. Lógica de la barra de progreso
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        const bar = document.getElementById('scroll-progress-bar');
        if (bar) bar.style.width = Math.min(scrolled, 100) + "%";
    });
});
