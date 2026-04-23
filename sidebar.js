// sidebar.js - Control unificado del sidebar
(function() {
    let overlay = null;

    function crearOverlay() {
        const div = document.createElement('div');
        div.id = 'sidebar-overlay';
        div.style.cssText = `
            position: fixed;
            inset: 0;
            background-color: rgba(15, 23, 42, 0.5);
            z-index: 60;
            visibility: hidden;
            opacity: 0;
            transition: visibility 0.3s, opacity 0.3s ease-in-out;
        `;
        document.body.appendChild(div);
        return div;
    }

    window.initSidebar = function() {
        const openSidebarBtn = document.getElementById('open-sidebar');
        const closeSidebarBtn = document.getElementById('close-sidebar');
        const sidebar = document.getElementById('sidebar');

        if (!openSidebarBtn || !closeSidebarBtn || !sidebar) {
            console.warn('Sidebar: elementos no encontrados en el DOM');
            return;
        }

        // Crear overlay si no existe
        overlay = document.getElementById('sidebar-overlay');
        if (!overlay) {
            overlay = crearOverlay();
        }

        function openSidebar() {
            sidebar.classList.add('sidebar-open');
            overlay.style.visibility = 'visible';
            overlay.style.opacity = '1';
        }

        function closeSidebar() {
            sidebar.classList.remove('sidebar-open');
            overlay.style.visibility = 'hidden';
            overlay.style.opacity = '0';
        }

        openSidebarBtn.addEventListener('click', openSidebar);
        closeSidebarBtn.addEventListener('click', closeSidebar);
        overlay.addEventListener('click', closeSidebar);

        // Cerrar al hacer clic en cualquier enlace del sidebar
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeSidebar);
        });

        // Asegurar estado inicial
        overlay.style.visibility = 'hidden';
        overlay.style.opacity = '0';
    }
})();