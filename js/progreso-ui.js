// js/progreso-ui.js
import { marcarCompletado, desmarcarCompletado, estaCompletada } from './progreso.js'

export async function inicializarProgreso(CLASE_ID) {
    const btn = document.getElementById('btnProgreso')
    if (!btn) return
    
    async function actualizarEstado() {
        const completada = await estaCompletada(CLASE_ID)
        
        if (completada) {
            btn.innerHTML = `↺ Desmarcar como completada`
            btn.classList.remove('btn-no-completado')
            btn.classList.add('btn-completado')
        } else {
            btn.innerHTML = `✓ Marcar como completada`
            btn.classList.remove('btn-completado')
            btn.classList.add('btn-no-completado')
        }
    }
    
    btn.addEventListener('click', async () => {
        const completada = await estaCompletada(CLASE_ID)
        
        btn.classList.add('opacity-50', 'pointer-events-none')
        
        if (completada) {
            await desmarcarCompletado(CLASE_ID)
        } else {
            await marcarCompletado(CLASE_ID)
        }
        
        btn.classList.remove('opacity-50', 'pointer-events-none')
        await actualizarEstado()
    })
    
    await actualizarEstado()
}