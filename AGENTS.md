# AGENTS.md - TuPintor WWW

Este archivo proporciona una visión técnica detallada del proyecto para agentes de IA y desarrolladores.

## Contexto del Proyecto
TuPintor es una plataforma web para servicios profesionales de pintura en Córdoba, Argentina. Está construida con **Next.js 15 (App Router)** y **React 19**, utilizando **Tailwind CSS 4** para los estilos. El sitio incluye una landing page informativa, una galería de trabajos completa y un panel administrativo para la gestión de contenidos.

## Stack Tecnológico
- **Framework:** Next.js 15.5.9 (App Router)
- **Lenguaje:** TypeScript 5.8.3
- **Estilos:** Tailwind CSS 4.1.5 (Modern engine)
- **Estado:** Zustand 5 (Client state), React Query 5 (Server state/Cache)
- **Autenticación:** Sistema simple basado en contraseña y `localStorage` (`isAdminLogged`).
- **Almacenamiento:** `localStorage` para ítems de galería (Persistencia simple sin backend activo).
- **Iconografía:** Font Awesome 6.5.2 (vía CDN en `layout.tsx`) y Lucide React.

## Estructura de Directorios Clave
```text
src/
├── app/
│   ├── (pages)/             # Rutas agrupadas
│   │   ├── admin/           # Panel de administración de galería
│   │   ├── galeria/         # Vista completa del portafolio
│   │   └── login/           # Acceso administrativo
│   ├── components/          # Componentes de la UI
│   │   ├── admin/           # Formularios y listas de gestión
│   │   ├── auth/            # Componentes de login
│   │   ├── common/          # Navbar, Footer, WhatsAppButton, etc.
│   │   ├── gallery/         # Lógica de galería (Grid, Lightbox, Storage)
│   │   └── *.tsx            # Secciones de la Landing Page (Hero, Services, etc.)
│   ├── types/               # Definiciones de TypeScript
│   ├── globals.css          # Estilos globales y variables de Tailwind 4
│   ├── layout.tsx           # Layout raíz y Providers
│   └── page.tsx             # Landing Page (Home)
```

## Lógica de Negocio y Persistencia
- **Galería:** Los ítems se gestionan en `src/app/components/gallery/storage.ts`. Utiliza el `localStorage` (`tupintor_gallery_items`) para guardar y leer los trabajos. Existe una lista por defecto (`DEFAULT_GALLERY_ITEMS`).
- **Admin:** El panel administrativo permite agregar, eliminar y marcar trabajos como "destacados" (máximo 4 para la Home).
- **Auth:** El acceso al admin se protege mediante una contraseña estática (`admin123`) verificada en el cliente y persistida en `localStorage`.

## Convenciones de Desarrollo
1. **Componentes:** Usar Functional Components con TypeScript.
2. **Client-Side:** Marcar explícitamente con `'use client'` los componentes que requieren interactividad o hooks de cliente.
3. **Estilos:** Priorizar clases de Tailwind CSS. El proyecto usa la nueva sintaxis de Tailwind 4.
4. **Imports:** Utilizar el alias `@/app/...` para rutas absolutas dentro de `src/app`.
5. **Imágenes:** Las imágenes locales se encuentran en `public/images/`.

## Guía para Agentes
- Al modificar la galería, asegúrate de actualizar la lógica en `storage.ts` si se requiere un cambio en la estructura de datos.
- Para nuevas secciones en la Home, agrégalas en `src/app/page.tsx` y crea el componente correspondiente en `src/app/components/`.
- La Navbar y el Footer están en `common/` y se aplican globalmente en `layout.tsx`.
- El botón de WhatsApp es un componente flotante persistente.

## Scripts Útiles
- `pnpm dev`: Inicia el entorno de desarrollo con Turbopack.
- `pnpm build`: Genera el build de producción optimizado.
- `pnpm test`: Ejecuta la suite de tests con Jest.
