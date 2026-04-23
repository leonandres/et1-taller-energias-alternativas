window.initTheme = function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    const setIcons = (isDark) => {
        darkIcon?.classList.toggle('hidden', !isDark);
        lightIcon?.classList.toggle('hidden', isDark);
    };

    const isDark = localStorage.getItem('color-theme') === 'dark' || 
        (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    document.documentElement.classList.toggle('dark', isDark);
    setIcons(isDark);

    // Evitamos duplicar el evento eliminando el anterior antes de poner el nuevo
    if (themeToggleBtn) {
        themeToggleBtn.onclick = () => {
            const willBeDark = !document.documentElement.classList.contains('dark');
            document.documentElement.classList.toggle('dark', willBeDark);
            localStorage.setItem('color-theme', willBeDark ? 'dark' : 'light');
            setIcons(willBeDark);
        };
    }
};

// También lo ejecutamos al cargar por si el HTML ya tiene el botón (como en el index raíz)
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', window.initTheme);
else window.initTheme();
