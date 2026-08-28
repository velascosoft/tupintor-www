# TuPintor - Servicios Profesionales de Pintura en Córdoba

Bienvenido al repositorio oficial de **TuPintor**, una plataforma web diseñada para ofrecer servicios profesionales de pintura en la ciudad de Córdoba, Argentina. El sitio está enfocado en proporcionar una experiencia de usuario moderna, rápida y accesible, permitiendo a los clientes visualizar trabajos realizados y solicitar presupuestos de manera directa.

## 🚀 Características Principales

- **Landing Page de Alto Impacto:** Secciones detalladas sobre servicios (Interior/Exterior, Airless, Pisos, etc.), testimonios y proceso de trabajo.
- **Galería de Trabajos Realizados:** Un portafolio completo con filtrado por categorías (Interior, Exterior, Fachadas, etc.) y visualización en Lightbox.
- **Panel Administrativo:** Interfaz protegida para que el administrador pueda subir fotos, eliminar trabajos y gestionar los destacados de la portada.
- **Integración con WhatsApp:** Acceso directo para consultas rápidas y envío de fotos para presupuestos.
- **Responsive Design:** Optimizado para dispositivos móviles, tablets y escritorio.
- **SEO Ready:** Configurado para visibilidad en motores de búsqueda.

## 🛠️ Stack Tecnológico

- **Frontend:** [Next.js 15](https://nextjs.org/) (App Router) + [React 19](https://react.dev/)
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Gestión de Estado:** [Zustand](https://zustand-demo.pmnd.rs/) y [React Query](https://tanstack.com/query/latest)
- **Persistencia:** `localStorage` (para gestión dinámica de la galería en el cliente)
- **Iconos:** Font Awesome 6 y Lucide React

## 📦 Instalación y Configuración Local

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/tupintor-www.git
   cd tupintor-www
   ```

2. **Instalar dependencias:**
   Este proyecto utiliza `pnpm`. Si no lo tienes instalado, puedes obtenerlo con `npm install -g pnpm`.
   ```bash
   pnpm install
   ```

3. **Ejecutar el entorno de desarrollo:**
   ```bash
   pnpm dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## 🔑 Acceso Administrativo

Para acceder al panel de gestión de la galería:
1. Ve a la ruta `/login`.
2. Ingresa la contraseña de administrador (por defecto configurada en el código para propósitos de demostración/MVP).
3. Gestiona los trabajos que aparecen en la sección de "Galería" y en la página completa de portafolio.

## 📄 Scripts Disponibles

- `pnpm dev`: Inicia el servidor de desarrollo.
- `pnpm build`: Crea la aplicación para producción.
- `pnpm start`: Inicia el servidor de producción.
- `pnpm lint`: Ejecuta el linter para asegurar la calidad del código.
- `pnpm test`: Ejecuta los tests unitarios y de integración.

---

Desarrollado por **Velasco Software**.
