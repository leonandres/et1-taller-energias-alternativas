# 🔋 Energías alternativas

![GitHub Repo Size](https://img.shields.io/github/repo-size/leonandres/et1-taller-energias-alternativas?color=brightgreen)
![License](https://img.shields.io/github/license/leonandres/et1-taller-energias-alternativas?color=blue)
![GitHub last commit](https://img.shields.io/github/last-commit/leonandres/et1-taller-energias-alternativas)

Plataforma educativa interactiva para la especialidad en **Construcciones**, enfocada en energías renovables y su aplicación en la construcción sustentable.
<img width="1676" height="945" alt="image" src="https://github.com/user-attachments/assets/54834b4d-3ab5-4d3a-b375-74bd531b7d35" />


🌐 **Sitio:** [leonandres.github.io/et1-taller-energias-alternativas](https://leonandres.github.io/et1-taller-energias-alternativas/)

## 📖 Uso
1. Ingresa al sitio y crea una cuenta con tu correo.
2. Navega por las clases utilizando el menú lateral o el selector principal.
3. Al finalizar cada lectura, marca la clase como "completada" para guardar tu progreso.

---

## 🛠️ Tecnologías

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## ✨ Características

*   **🎓 Contenido Educativo:** 8 clases completas con teoría, práctica y calculadoras solares.
*   **🔐 Sistema de Usuarios:** Gestión de perfiles y autenticación vía Supabase Auth.
*   **📊 Seguimiento:** Persistencia del progreso (clases completadas) por usuario.
*   **🎨 Diseño:** Interfaz adaptativa (Dark/Light mode) construida con TailwindCSS.

---

## 📁 Estructura del Proyecto

```text
et1-taller-energias-alternativas/
├── 📄 index.html          # Selector de clases y bienvenida
├── 📄 clase-1.html        # Energía Solar Fotovoltaica
├── 📄 clase-2.html        # Energía Solar Térmica
├── 📄 clase-3.html        # Energía Eólica
├── 📄 ...                 # (Siguen clases hasta la 8)
├── 📂 js/                 # Lógica: auth.js y supabase-client.js
├── 📂 recursos/           # Imágenes y archivos de soporte
├── 📄 styles.css          # Estilos globales de Tailwind
```

---

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/leonandres/et1-taller-energias-alternativas.git
cd et1-taller-energias-alternativas
```

### 2. Configurar base de datos (Supabase)
1. Crea un proyecto en [Supabase](https://supabase.com).
2. En el **SQL Editor**, ejecuta el siguiente script para crear las tablas y triggers:

<details>
<summary><b>Ver Script SQL</b> (Click para expandir)</summary>

```sql
-- Tabla de perfiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre TEXT,
  rol TEXT NOT NULL DEFAULT 'alumno',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de progreso
CREATE TABLE IF NOT EXISTS public.progreso (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  clase_id INT NOT NULL,
  completado BOOLEAN DEFAULT FALSE,
  fecha TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, clase_id)
);

-- Trigger para creación automática de perfil
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nombre, rol)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'nombre', ''), 'alumno');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progreso ENABLE ROW LEVEL SECURITY;

-- Políticas para perfiles
CREATE POLICY "Usuarios ven su propio perfil" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Usuarios actualizan su propio perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Políticas para progreso
CREATE POLICY "Usuarios ven su propio progreso" ON public.progreso FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios insertan su propio progreso" ON public.progreso FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios actualizan su propio progreso" ON public.progreso FOR UPDATE WITH CHECK (auth.uid() = user_id);

```
</details>

### 3. Variables de Conexión
Edita el archivo `js/supabase-client.js` con tus credenciales:
```javascript
const supabaseUrl = 'https://TU_PROYECTO.supabase.co'
const supabaseKey = 'TU_ANON_KEY'
```

---

## 🔧 Configuración de Autenticación (Supabase)

Para que el login funcione correctamente, configura los redireccionamientos:

1. Ve a **Authentication** → **URL Configuration**.
2. Configura los siguientes campos:
    *   **Site URL**: `https://leonandres.github.io`
    *   **Redirect URLs**: `https://leonandres.github.io/et1-taller-energias-alternativas/**`

---

## 🌐 Despliegue

El sitio se actualiza automáticamente al pushear a la rama `main`:

```bash
git add .
git commit -m "Mejora: descripción del cambio"
git push origin main
```

---

## 📝 Licencia
Este proyecto está bajo la [Licencia MIT](LICENSE). 
Este material es de uso libre y gratuito para cualquier institución educativa que desee impartir conocimientos sobre energías renovables y construcción sustentable.
