// progreso.js - Módulo de progreso
import { supabase } from './supabase-client.js'

// Guardar progreso de una clase
export async function marcarCompletado(claseId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    alert('Inicia sesión para guardar tu progreso')
    return false
  }
  
  const { error } = await supabase
    .from('progreso')
    .upsert({ 
      user_id: user.id, 
      clase_id: claseId, 
      completado: true,
      fecha: new Date()
    }, { onConflict: 'user_id, clase_id' })  // Evita duplicados
  
  if (error) {
    console.error('Error:', error)
    alert('Error: ' + error.message)
    return false
  }
  
  alert('✅ Clase marcada como completada')
  return true
}

// Obtener progreso del usuario
export async function obtenerProgreso() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  
  const { data, error } = await supabase
    .from('progreso')
    .select('*')
    .eq('user_id', user.id)
  
  if (error) {
    console.error('Error:', error)
    return []
  }
  
  return data || []
}

// Verificar si una clase está completada
export async function estaCompletada(claseId) {
  const progreso = await obtenerProgreso()
  return progreso.some(p => p.clase_id === claseId && p.completado)
}

export async function desmarcarCompletado(claseId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    alert('Inicia sesión para guardar tu progreso')
    return false
  }
  
  const { error } = await supabase
    .from('progreso')
    .delete()
    .eq('user_id', user.id)
    .eq('clase_id', claseId)
  
  if (error) {
    console.error('Error:', error)
    alert('Error: ' + error.message)
    return false
  }
  
  alert('❌ Clase desmarcada')
  return true
}

// Exponer funciones globalmente (para usar desde consola o HTML)
window.progreso = { marcarCompletado, obtenerProgreso, estaCompletada }