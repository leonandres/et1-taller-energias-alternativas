// js/progreso-ui.js
import { marcarCompletado, desmarcarCompletado, estaCompletada } from './progreso.js'

export async function inicializarProgreso(CLASE_ID) {
    const btnCompletar = document.getElementById('btnCompletar')
    const btnDesmarcar = document.getElementById('btnDesmarcar')
    const mensaje = document.getElementById('mensajeProgreso')
    
    if (!btnCompletar) return
    
    async function actualizarEstado() {
        const completada = await estaCompletada(CLASE_ID)
        
        if (completada) {
            btnCompletar.disabled = true
            btnCompletar.classList.add('opacity-50', 'cursor-not-allowed')
            btnCompletar.classList.remove('hover:bg-green-600')
            mensaje.innerHTML = '✅ ¡Ya completaste esta clase!'
        } else {
            btnCompletar.disabled = false
            btnCompletar.classList.remove('opacity-50', 'cursor-not-allowed')
            btnCompletar.classList.add('hover:bg-green-600')
            mensaje.innerHTML = '📌 Marca esta clase como completada cuando termines.'
        }
    }
    
    btnCompletar.addEventListener('click', async () => {
        await marcarCompletado(CLASE_ID)
        await actualizarEstado()
    })
    
    btnDesmarcar.addEventListener('click', async () => {
        await desmarcarCompletado(CLASE_ID)
        await actualizarEstado()
    })
    
    await actualizarEstado()
}