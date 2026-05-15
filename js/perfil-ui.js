// js/perfil-ui.js - Muestra el progreso en la página principal
import { supabase } from './supabase-client.js'
import { obtenerProgreso } from './progreso.js'

export async function mostrarProgreso() {
    const container = document.getElementById('progreso-container')
    const mensajeEl = document.getElementById('mensaje-progreso')
    
    if (!container || !mensajeEl) return
    
    // Verificar si hay sesión activa
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
        // No logueado: ocultar el contenedor
        container.classList.add('hidden')
        return
    }
    
    // Usuario logueado: mostrar progreso
    const progreso = await obtenerProgreso()
    const completadas = progreso.filter(p => p.completado === true).length
    const totalClases = 8
    
    mensajeEl.innerHTML = `<span class="inline-block mr-2">📊</span> Tu progreso: <span class="font-bold text-yellow-300">${completadas}</span> de ${totalClases} clases completadas`
    container.classList.remove('hidden')
    
    // Si completó todas, agregar un mensaje de felicitaciones
    if (completadas === totalClases) {
        mensajeEl.innerHTML = `🎉 ¡FELICITACIONES! Completaste las ${totalClases} clases. 🎉`
    }
}

// Escuchar cambios en la sesión (cuando el usuario inicia/cierra sesión)
supabase.auth.onAuthStateChange(() => {
    mostrarProgreso()
})