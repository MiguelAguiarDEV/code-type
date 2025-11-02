# TypeCode

Una aplicación web moderna para practicar mecanografía escribiendo código real, inspirada en MonkeyType pero especializada en programación.

## Descripción

TypeCode es un MVP que permite a los desarrolladores mejorar su velocidad y precisión al escribir código mediante la práctica con problemas reales de programación. A diferencia de los tests de mecanografía tradicionales, TypeCode te hace escribir código real en diferentes lenguajes de programación.

## Características

### MVP (Versión Actual)

- **Inicio inmediato**: Entra en la página principal y comienza a escribir sin necesidad de registro
- **Persistencia flexible**:
  - Sin login: progreso guardado en localStorage
  - Con login: progreso sincronizado en la nube con tu cuenta
- **Múltiples lenguajes**: Selecciona entre diferentes lenguajes de programación
- **Problemas tipo LeetCode**: Practica con problemas algorítmicos comunes
- **Autenticación opcional**: Sistema de login con Clerk para guardar tu progreso

### Futuras Características

- **Contextos especializados**: Elige el tipo de código que quieres practicar
  - Laravel para SaaS
  - React components
  - API endpoints
  - Y más...
- **Generación dinámica**: Código generado por LLM adaptado a tus necesidades
- **Estadísticas avanzadas**: Tracking detallado de velocidad, precisión y progreso
- **Modo competitivo**: Compite con otros desarrolladores

## Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Autenticación**: Clerk
- **Base de datos**: Turso (libSQL)
- **Estilos**: Tailwind CSS
- **Pagos**: Stripe
- **Emails**: Resend
- **Validación**: Zod
- **Formularios**: React Hook Form

## Estructura del Proyecto

```
type-code/
├── app/
│   ├── sign-in/           # Página de inicio de sesión
│   ├── sign-up/           # Página de registro
│   ├── layout.tsx         # Layout principal con ClerkProvider
│   └── page.tsx           # Página principal (práctica de código)
├── middleware.ts          # Middleware de Clerk para protección de rutas
└── .env.local            # Variables de entorno
```

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repo>
cd type-code
```

2. Instala las dependencias:

```bash
bun install
```

3. Configura las variables de entorno:

```bash
cp .env.local.example .env.local
```

4. Completa las variables de entorno en `.env.local`:
   - Clerk: Obtén tus keys en [clerk.com](https://clerk.com)
   - Turso: Crea una base de datos en [turso.tech](https://turso.tech)
   - Stripe: Obtén tus keys en [stripe.com](https://stripe.com)
   - Resend: Obtén tu API key en [resend.com](https://resend.com)

5. Inicia el servidor de desarrollo:

```bash
bun dev
```

6. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## Variables de Entorno

```env
# Turso (Base de datos)
TURSO_URL=libsql://tu-db.turso.io
TURSO_TOKEN=tu_token_aqui

# Clerk (Autenticación)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Stripe (Pagos)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend (Emails)
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Scripts Disponibles

```bash
bun dev      # Inicia el servidor de desarrollo
bun run build    # Construye la aplicación para producción
bun start    # Inicia el servidor de producción
bun run lint     # Ejecuta el linter (Biome)
bun run format   # Formatea el código con Biome
```

## Roadmap

### Fase 1: MVP (Actual)
- [x] Configuración inicial del proyecto
- [x] Integración de Clerk para autenticación
- [ ] Interfaz de práctica de código
- [ ] Sistema de selección de lenguaje
- [ ] Almacenamiento en localStorage (sin login)
- [ ] Guardado en base de datos (con login)
- [ ] Problemas básicos tipo LeetCode

### Fase 2: Mejoras
- [ ] Más lenguajes de programación
- [ ] Sistema de estadísticas detalladas
- [ ] Gráficos de progreso
- [ ] Temas personalizables

### Fase 3: Contenido Avanzado
- [ ] Contextos especializados (Laravel, React, etc.)
- [ ] Generación de código con LLM
- [ ] Sistema de niveles y desafíos
- [ ] Modo multijugador

### Fase 4: Monetización
- [ ] Plan premium con Stripe
- [ ] Contenido exclusivo
- [ ] Estadísticas avanzadas

## Fuentes de Código

Para el MVP, el código de práctica provendrá de:
- **Opción 1**: Base de datos curada con problemas de LeetCode
- **Opción 2**: Generación dinámica mediante API de LLM (OpenAI, Anthropic, etc.)
- **Opción 3**: Combinación de ambas opciones

## Contribuir

Este es un proyecto en desarrollo activo. Las contribuciones son bienvenidas.

## Licencia

[Especificar licencia]

## Autor

Miguel Aguiar

---

**Estado del proyecto**: MVP en desarrollo
