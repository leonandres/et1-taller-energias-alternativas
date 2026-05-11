// auth-ui.js - Manejo de autenticación UI
import { supabase } from './supabase-client.js'

// Referencias a modales
let modalLogin, modalRegistro, modalReset

// 📌 FUNCIÓN PARA ACTUALIZAR UI DEL HEADER
export async function actualizarHeaderUI() {
    const { data: { session } } = await supabase.auth.getSession()
    const authButtons = document.getElementById('auth-buttons-header')
    const userSection = document.getElementById('user-header')
    const userNameSpan = document.getElementById('userName')
    const userInitial = document.getElementById('userInitial')
    
    if (session) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('nombre')
            .eq('id', session.user.id)
            .single()
        
        const nombre = profile?.nombre || session.user.email?.split('@')[0] || 'Usuario'
        
        if (authButtons) authButtons.style.display = 'none'
        if (userSection) userSection.style.display = 'flex'
        if (userNameSpan) userNameSpan.textContent = nombre
        if (userInitial) userInitial.textContent = nombre.charAt(0).toUpperCase()
        
        const saludo = document.getElementById('saludo')
        if (saludo && profile?.nombre) {
            saludo.innerText = `Hola ${profile.nombre} 👋`
        }
        const inputNombre = document.getElementById('nombre')
        if (inputNombre && profile?.nombre) {
            inputNombre.value = profile.nombre
        }
    } else {
        if (authButtons) authButtons.style.display = 'flex'
        if (userSection) userSection.style.display = 'none'
    }
}

// 📌 ABRIR/CERRAR MODALES
function abrirModal(modal) {
    if (modal) modal.classList.remove('hidden')
}

function cerrarModal(modal) {
    if (modal) modal.classList.add('hidden')
}

// 📌 INICIALIZAR MODALES
export function initModales() {
    if (!document.getElementById('modalLogin')) {
        const modalesHTML = `
            <div id="modalLogin" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 hidden">
                <div class="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-700">
                    <h2 class="text-2xl font-bold mb-4 text-yellow-400">Iniciar sesión</h2>
                    <input type="email" id="modalEmail" placeholder="Email" class="w-full p-3 rounded-lg bg-slate-700 text-white mb-3">
                    <input type="password" id="modalPassword" placeholder="Contraseña" class="w-full p-3 rounded-lg bg-slate-700 text-white mb-4">
                    <button id="modalLoginBtn" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg">Ingresar</button>
                    <button id="modalForgotBtn" class="w-full text-sm text-slate-400 hover:text-yellow-400 mt-3 transition">¿Olvidaste tu contraseña?</button>
                    <button id="modalCloseLogin" class="w-full text-sm text-slate-500 hover:text-white mt-2 transition">Cancelar</button>
                </div>
            </div>
            <div id="modalRegistro" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 hidden">
                <div class="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-700">
                    <h2 class="text-2xl font-bold mb-4 text-yellow-400">Registrarse</h2>
                    <input type="email" id="modalRegEmail" placeholder="Email" class="w-full p-3 rounded-lg bg-slate-700 text-white mb-3">
                    <input type="text" id="modalRegNombre" placeholder="Tu nombre" class="w-full p-3 rounded-lg bg-slate-700 text-white mb-3">
                    <input type="password" id="modalRegPassword" placeholder="Contraseña" class="w-full p-3 rounded-lg bg-slate-700 text-white mb-4">
                    <button id="modalRegistroBtn" class="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg">Registrarse</button>
                    <button id="modalCloseRegistro" class="w-full text-sm text-slate-500 hover:text-white mt-2 transition">Cancelar</button>
                </div>
            </div>
            <div id="modalResetPassword" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 hidden">
                <div class="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-700">
                    <h2 class="text-2xl font-bold mb-4 text-yellow-400">Recuperar contraseña</h2>
                    <p class="text-slate-400 text-sm mb-4">Te enviaremos un enlace para restablecer tu contraseña.</p>
                    <input type="email" id="resetEmail" placeholder="Tu email" class="w-full p-3 rounded-lg bg-slate-700 text-white mb-4">
                    <button id="resetPasswordBtn" class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg">Enviar enlace</button>
                    <button id="modalCloseReset" class="w-full text-sm text-slate-500 hover:text-white mt-2 transition">Cancelar</button>
                </div>
            </div>
        `
        document.body.insertAdjacentHTML('beforeend', modalesHTML)
    }
    
    modalLogin = document.getElementById('modalLogin')
    modalRegistro = document.getElementById('modalRegistro')
    modalReset = document.getElementById('modalResetPassword')
}

// 📌 REGISTRO
async function registrar(email, nombre, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { nombre: nombre || '' } }
    })
    
    if (error) {
        alert('Error: ' + error.message)
        return false
    }
    
    alert('✅ Registro exitoso! Revisa tu email para confirmar')
    cerrarModal(modalRegistro)
    return true
}

// 📌 LOGIN
async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    
    if (error) {
        alert('Error: ' + error.message)
        return false
    }
    
    cerrarModal(modalLogin)
    await actualizarHeaderUI()
    location.reload()
    return true
}

// 📌 RESET PASSWORD
async function resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) {
        alert('Error: ' + error.message)
        return false
    }
    
    alert('📧 Revisa tu email. Te enviamos un enlace para restablecer tu contraseña.')
    cerrarModal(modalReset)
    return true
}

// 📌 LOGOUT
async function logout() {
    await supabase.auth.signOut()
    await actualizarHeaderUI()
    location.reload()
}

// 📌 GUARDAR NOMBRE
async function guardarNombre() {
    const nombre = document.getElementById('nombre')?.value
    if (!nombre) {
        alert('Escribe un nombre')
        return
    }
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        alert('Inicia sesión primero')
        return
    }
    
    const { error } = await supabase
        .from('profiles')
        .update({ nombre })
        .eq('id', user.id)
    
    if (error) {
        alert('Error: ' + error.message)
        return
    }
    
    const saludo = document.getElementById('saludo')
    if (saludo) saludo.innerText = `Hola ${nombre} 👋`
    
    await actualizarHeaderUI()
    alert('✅ Nombre guardado')
}

// 📌 INICIALIZAR EVENTOS
export function initAuthEvents() {
    // Botones del header
    document.getElementById('btnRegistroHeader')?.addEventListener('click', () => abrirModal(modalRegistro))
    document.getElementById('btnLoginHeader')?.addEventListener('click', () => abrirModal(modalLogin))
    document.getElementById('btnLogoutHeader')?.addEventListener('click', logout)
    document.getElementById('btnGuardar')?.addEventListener('click', guardarNombre)
    
    // Modal Login
    document.getElementById('modalLoginBtn')?.addEventListener('click', () => {
        const email = document.getElementById('modalEmail').value
        const password = document.getElementById('modalPassword').value
        login(email, password)
    })
    document.getElementById('modalForgotBtn')?.addEventListener('click', () => {
        cerrarModal(modalLogin)
        abrirModal(modalReset)
    })
    document.getElementById('modalCloseLogin')?.addEventListener('click', () => cerrarModal(modalLogin))
    
    // Modal Registro
    document.getElementById('modalRegistroBtn')?.addEventListener('click', () => {
        const email = document.getElementById('modalRegEmail').value
        const nombre = document.getElementById('modalRegNombre').value
        const password = document.getElementById('modalRegPassword').value
        registrar(email, nombre, password)
    })
    document.getElementById('modalCloseRegistro')?.addEventListener('click', () => cerrarModal(modalRegistro))
    
    // Modal Reset
    document.getElementById('resetPasswordBtn')?.addEventListener('click', () => {
        const email = document.getElementById('resetEmail').value
        resetPassword(email)
    })
    document.getElementById('modalCloseReset')?.addEventListener('click', () => cerrarModal(modalReset))
    
    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === modalLogin) cerrarModal(modalLogin)
        if (e.target === modalRegistro) cerrarModal(modalRegistro)
        if (e.target === modalReset) cerrarModal(modalReset)
    })
}