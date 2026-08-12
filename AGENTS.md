# AGENTS

## Contexto del proyecto

Este repositorio contiene un sitio web en Next.js (App Router) para TuPintor. La UI está implementada en `src/app/components`, y la composición principal ocurre en `layout.tsx` y `page.tsx`. El proyecto está en transición desde una estructura previa y conserva algunos directorios backend/tests vacíos.

## Estructura de directorios

```text
src/
├─ app/
│  ├─ components/
│  │  ├─ common/            # Layout/UI compartida (Navbar, Footer, QueryContainer, WhatsAppButton)
│  │  └─ *.tsx              # Secciones de la home
│  ├─ globals.css           # Estilos globales y utilidades
│  ├─ layout.tsx            # Shell global, metadata y providers
│  └─ page.tsx              # Home route (/)
├─ backend/                 # Estructura creada (sin implementación actual)
├─ lib/                     # Vacío
└─ tests/                   # Vacío
```

## Archivos clave fuera de `/src`

- `package.json`: scripts y dependencias del proyecto
- `tsconfig.json`: strict mode + aliases (`@/app/*`, `@/backend/*`, `@/lib/*`)
- `next.config.ts`: configuración Next (incluye `output: "standalone"`)
- `vercel.json`: framework `nextjs`
- `jest.config.ts`: setup de testing con `next/jest`
- `eslint.config.js`: configuración de lint (actualmente con reglas orientadas a JS/JSX)
- `Dockerfile`: imagen para ejecución con PM2
- `ecosystem.config.cjs`: proceso PM2 (`script: ./server.js`)

## Convenciones detectadas

- **Imports:** preferencia por alias absoluto (`@/app/...`) en lugar de rutas relativas largas.
- **Componentes:** componentes funcionales, export default por archivo.
- **Client Components:** uso explícito de `'use client'` en componentes interactivos.
- **Estilos:** Tailwind utility-first + reglas globales en `globals.css`.
- **Navegación:** `next/link` para enlaces internos y hash routes (`/#seccion`).
- **Iconografía:** Font Awesome vía `<link>` global en `layout.tsx`.
- **Tipos:** TypeScript en modo estricto (`"strict": true`).

## Testing y calidad

- Runner configurado: **Jest** (`testEnvironment: "jsdom"`).
- Setup configurado: `setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"]`.
- En el estado actual no se detectan archivos de test en el repositorio.
- No se detecta configuración de CI en `.github/workflows`.

## Configuración y entorno

- Node esperado: `v22.21.0` (`.nvmrc`).
- Gestor de paquetes: `pnpm` (`packageManager` en `package.json`).
- No se detecta consumo directo de variables de entorno en `src/`.

## Reglas operativas para agentes de IA

1. Mantener navegación y rutas con APIs nativas de Next.js (`next/link`, App Router), sin introducir `react-router`.
2. Respetar imports por alias (`@/...`) cuando el archivo esté bajo `src`.
3. Si un componente usa estado/eventos del navegador, conservar o agregar `'use client'`.
4. No documentar endpoints API ni variables de entorno que no existan en el código.
5. Evitar cambios no relacionados en archivos legacy/plantilla, salvo que bloqueen la tarea principal.
6. Al tocar estilos globales, verificar impacto en componentes de `common/` (Navbar, Footer, botones flotantes).

