// auth-loader.js - Módulo de autenticación (VERSIÓN CORREGIDA)
import { supabase } from './supabase-client.js'

// IMPORTAR funciones desde auth-ui.js
import { actualizarHeaderUI, initModales, initAuthEvents } from './auth-ui.js'

document.addEventListener('DOMContentLoaded', () => {
    const esperarHeader = setInterval(() => {
        const container = document.getElementById('auth-header-container')
        if (container) {
            clearInterval(esperarHeader)
            iniciarAuth(container)
        }
    }, 50)
})

async function iniciarAuth(container) {
    // Inyectar HTML
    container.innerHTML = `
        <div id="auth-header" class="flex items-center gap-3">
            <div id="auth-buttons-header" class="flex gap-2">
                <button id="btnRegistroHeader" class="px-3 py-1.5 text-sm bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition cursor-pointer">
                    Registrarse
                </button>
                <button id="btnLoginHeader" class="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition cursor-pointer">
                    Ingresar
                </button>
            </div>
            <div id="user-header" style="display: none;" class="flex items-center gap-3">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                        <span id="userInitial" class="text-white text-sm font-bold">U</span>
                    </div>
                    <span id="userName" class="text-white text-sm font-medium hidden md:inline">Usuario</span>
                </div>
                <button id="btnLogoutHeader" class="px-3 py-1.5 text-sm bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 rounded-lg transition cursor-pointer">
                    Salir
                </button>
            </div>
        </div>
    `
    
    // Usar funciones importadas desde auth-ui.js
    await actualizarHeaderUI()
    initModales()
    initAuthEvents()
}