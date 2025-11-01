# **STACK TECNOLÓGICO FREELANCE**

*Guía completa para desarrollo rápido de SaaS*

# **1\. Stack Tecnológico**

Stack completo 100% gratis en desarrollo y producción inicial.

| Componente | Tecnología |
| ----- | ----- |
| **Framework** | Next.js 14 \+ TypeScript \+ Tailwind CSS \+ shadcn/ui |
| **Base de Datos** | Turso (SQLite remoto, 9GB gratis, proyectos ilimitados) |
| **Autenticación** | Clerk (OAuth social: Google, GitHub, Apple. 10K users/mes gratis) |
| **Pagos** | Stripe (2.9% \+ $0.30 por transacción, sin costos fijos) |
| **Validación** | Zod \+ React Hook Form |
| **Emails** | Resend (3K emails/mes gratis) |
| **Linting** | Biome (linting \+ formatting) |
| **CI/CD** | GitHub Actions (lint \+ build check) |
| **Hosting** | Vercel (100GB bandwidth gratis, subdominios ilimitados) |
| **Gestor Paquetes** | Bun (instalación ultra rápida) |

# **2\. Costos y Límites**

| Servicio | Plan Gratis | Plan Pago | Proyectos |
| ----- | ----- | ----- | ----- |
| **Vercel** | 100GB BW/mes | $20/mes | Ilimitados |
| **Turso** | 9GB storage | $29/mes | Ilimitados |
| **Clerk** | 10K MAU/mes | $25/mes \+ $0.02/MAU | Ilimitados |
| **Stripe** | $0 mes | 2.9% \+ $0.30 | Por transacción |
| **Resend** | 3K emails/mes | $20/mes | Ilimitados |

**Nota:** Los costos de producción se trasladan al cliente como parte del servicio de mantenimiento mensual ($20-50/mes).

**MAU:** Monthly Active Users (usuarios activos mensuales) \- solo cuenta usuarios que inician sesión en el mes, no usuarios registrados totales.

# **3\. Arquitectura**

## **3.1 Patrón de Backend**

**Server Actions:** Para mutaciones internas (forms, CRUD)

* Llamadas directas desde componentes sin fetch  
* Type-safety automático entre frontend y backend  
* Menos código boilerplate

**API Routes REST:** Para webhooks y APIs públicas

* Webhooks de Stripe (necesario para procesamiento de pagos)  
* Integraciones con terceros  
* APIs públicas para clientes si se requiere

## **3.2 Componentes**

**Server Components:** Por defecto

* Consultas a base de datos  
* Páginas estáticas  
* SEO optimizado

**Client Components:** Solo cuando necesario

* Interactividad (useState, useEffect)  
* Formularios con validación en tiempo real  
* Componentes shadcn/ui

# **4\. Estructura de Carpetas**

## **4.1 Estructura Completa**

**/app** \- Páginas y rutas (App Router de Next.js 14\)

* **/api** \- API Routes REST  
*   */webhooks/stripe/route.ts* \- Webhook de Stripe  
*   */products/route.ts* \- CRUD productos  
*   */checkout/route.ts* \- Crear sesión de pago  
* **/(auth)** \- Rutas de autenticación  
*   */sign-in/page.tsx*  
*   */sign-up/page.tsx*  
* **/(dashboard)** \- Panel de usuario  
*   */dashboard/page.tsx*  
*   */settings/page.tsx*  
* **/admin** \- Panel de administración  
*   */products/page.tsx* \- Gestión de productos  
* */page.tsx* \- Landing page  
* */layout.tsx* \- Layout principal

**/components** \- Componentes reutilizables

* **/ui** \- Componentes shadcn/ui (button, form, card, etc.)  
* **/forms** \- Formularios (login, checkout, etc.)  
* **/layouts** \- Layouts compartidos (navbar, footer)

**/lib** \- Lógica de negocio y utilidades

* **/db**  
*   */client.ts* \- Cliente de Turso  
*   */schema.ts* \- Schema de base de datos  
*   */queries.ts* \- Queries SQL  
* **/validations** \- Schemas de Zod  
* **/utils** \- Funciones helper  
* */stripe.ts* \- Cliente de Stripe  
* */resend.ts* \- Cliente de Resend

**/types** \- Definiciones de TypeScript

* */index.ts* \- Tipos compartidos

**/public** \- Assets estáticos (imágenes, fonts, etc.)

# **5\. Setup Detallado (2 horas)**

## **5.1 Setup Local (30 min)**

**Paso 1:** Crear proyecto Next.js

* bunx create-next-app@latest nombre-proyecto  
* Seleccionar: TypeScript, Tailwind, App Router  
* src/: NO

**Paso 2:** Instalar Biome

* bun add \-D @biomejs/biome  
* bunx @biomejs/biome init

**Paso 3:** Instalar shadcn/ui

* bunx shadcn@latest init  
* Instalar componentes necesarios: button, form, input, card, table

**Paso 4:** Crear estructura de carpetas

* mkdir \-p app/api app/(auth) app/(dashboard) app/admin  
* mkdir \-p components/ui components/forms components/layouts  
* mkdir \-p lib/db lib/validations lib/utils  
* mkdir \-p types

## **5.2 Instalar Dependencias (10 min)**

* bun add @libsql/client @clerk/nextjs stripe zod react-hook-form resend  
* bun add \-D @hookform/resolvers @stripe/stripe-js

## **5.3 Configurar Servicios Externos (1 hora)**

*Ver sección 6 (Gestión de Cuentas) para detalles completos de cada servicio.*

## **5.4 Configurar Variables de Entorno (5 min)**

Crear archivo **.env.local** en la raíz:

**\# Turso**  
TURSO\_URL=libsql://tu-db.turso.io  
TURSO\_TOKEN=eyJhbGc...

**\# Clerk**  
NEXT\_PUBLIC\_CLERK\_PUBLISHABLE\_KEY=pk\_test\_...  
CLERK\_SECRET\_KEY=sk\_test\_...

**\# Stripe**  
STRIPE\_SECRET\_KEY=sk\_test\_...  
STRIPE\_PUBLISHABLE\_KEY=pk\_test\_...  
STRIPE\_WEBHOOK\_SECRET=whsec\_... (después de deploy)

**\# Resend**  
RESEND\_API\_KEY=re\_...

**\# App**  
NEXT\_PUBLIC\_APP\_URL=http://localhost:3000

## **5.5 Configurar GitHub y Vercel (20 min)**

**GitHub:**

* git init  
* Crear .gitignore (Next.js lo genera automáticamente)  
* git add .  
* git commit \-m "initial setup"  
* Crear repo en GitHub (privado)  
* git remote add origin URL  
* git push \-u origin main

**Vercel:**

* Ir a vercel.com  
* Conectar GitHub  
* Importar proyecto  
* Agregar variables de entorno (copiar de .env.local)  
* Deploy

# **6\. Gestión de Cuentas**

## **6.1 Estrategia de Cuentas**

**TÚ CREAS (con tus credenciales):**

* **Turso** \- Base de datos del proyecto  
* **Clerk** \- Autenticación y gestión de usuarios  
* **Resend** \- Envío de emails  
* **Vercel** \- Hosting y deployment

**CLIENTE CREA (para recibir pagos):**

* **Stripe** \- Procesamiento de pagos (dinero va directo a su cuenta)

**Razón:** Tú controlas la infraestructura (DB, auth, hosting) pero el cliente recibe los pagos directamente. Esto simplifica la contabilidad y la entrega del proyecto.

## **6.2 Turso \- Configuración Completa**

**Paso 1:** Crear cuenta

* Ir a turso.tech  
* Click "Sign Up" → Login con GitHub (recomendado)  
* Autorizar acceso

**Paso 2:** Crear base de datos

* Dashboard → "Create Database"  
* Name: nombre-proyecto-cliente  
* Location: región más cercana al cliente  
* Click "Create"

**Paso 3:** Obtener credenciales

* Tab "Connection"  
* Copiar "libsql URL" → TURSO\_URL  
* Click "Create Token" → copiar → TURSO\_TOKEN

## **6.3 Clerk \- Configuración Completa**

**Paso 1:** Crear cuenta

* Ir a clerk.com  
* "Start building for free" → Sign up con GitHub

**Paso 2:** Crear aplicación

* Name: nombre-proyecto  
* Framework: Next.js  
* Métodos de autenticación:  
*   ✓ Email  
*   ✓ Google  
*   ✓ GitHub  
*   ✓ Apple (opcional)

**Paso 3:** Obtener API keys

* Dashboard → "API Keys"  
* Copiar Publishable key → NEXT\_PUBLIC\_CLERK\_PUBLISHABLE\_KEY  
* Copiar Secret key → CLERK\_SECRET\_KEY

**Paso 4:** Configurar OAuth (opcional pero recomendado)

* Sidebar: "Configure" → "Authentication" → "Social connections"  
* Google: Activar "Use Clerk's OAuth" (simple, sin config adicional)  
* GitHub: Activar "Use Clerk's OAuth"  
* Save

## **6.4 Stripe \- Cliente Lo Crea**

**Importante:** El cliente crea su propia cuenta de Stripe para recibir los pagos directamente.

**Instrucciones para el cliente:**

**Paso 1:** Crear cuenta Stripe

* Ir a stripe.com  
* Click "Start now"  
* Completar registro con email y contraseña  
* Verificar email  
* Completar información del negocio

**Paso 2:** Activar Test Mode

* Dashboard arriba derecha: toggle "Test mode" ON (azul)  
* Todo en test mode no cobra dinero real

**Paso 3:** Compartir API keys contigo

* Sidebar: "Developers" → "API keys"  
* Copiar y enviar:  
*   \- Publishable key (pk\_test\_...)  
*   \- Secret key (click "Reveal", sk\_test\_...)

**Nota:** Los webhooks se configuran después del primer deploy (ver sección 7.4).

## **6.5 Resend \- Configuración Completa**

**Paso 1:** Crear cuenta

* Ir a resend.com  
* "Start Building" → Sign up  
* Verificar email

**Paso 2:** Crear API Key

* Dashboard → "API Keys"  
* "Create API Key"  
* Name: Production  
* Permission: Full access  
* "Add" → copiar key (solo se muestra una vez)

**Nota desarrollo:** En desarrollo puedes usar onboarding@resend.dev como remitente (gratis, solo envía a tu email registrado).

# **7\. Flujo de Trabajo con Cliente**

## **7.1 Discovery Call**

**Preguntas clave:**

* ¿Qué problema resuelve tu producto?  
* ¿Quiénes son tus usuarios?  
* ¿Qué funcionalidades necesitas (MVP)?  
* ¿Modelo de negocio? (suscripción, pago único, freemium)  
* ¿Timeline deseado?  
* ¿Presupuesto disponible?  
* ¿Tienes dominio?

## **7.2 Propuesta**

**Estructura de propuesta:**

* **Precio proyecto:** $X (50% adelanto, 50% al entregar)  
* **Mantenimiento:** $Y/mes (incluye hosting, soporte, actualizaciones menores)  
* **Timeline:** Z semanas  
* **Incluye:** Diseño, desarrollo, deploy, testing, documentación  
* **No incluye:** Cambios mayores después de aprobación, features adicionales

## **7.3 Al Cerrar Deal \- Checklist**

**Documentos:**

* Contrato firmado  
* Factura 50% adelanto

**Del cliente necesitas:**

* Email para acceso admin de Clerk  
* Que cree cuenta de Stripe y te comparta API keys (test mode)  
* Dominio (si tiene) o credenciales DNS para configurar  
* Logo y assets de marca  
* Contenido de textos (o lo redactas tú con costo adicional)

**Tú creas:**

* Base de datos en Turso  
* Aplicación en Clerk  
* Cuenta Resend  
* Proyecto en Vercel  
* Repo privado en GitHub

## **7.4 Desarrollo**

**Flujo de trabajo:**

* Desarrollo en rama dev  
* Deploy automático a staging (subdominio Vercel)  
* Cliente revisa en staging semanalmente  
* Feedback e iteraciones  
* Testing completo antes de producción

## **7.5 Pre-Launch**

**Checklist:**

* Cliente prueba flujos completos en staging  
* Ajustes finales aprobados  
* Configurar Stripe webhooks en producción:  
*   \- Stripe Dashboard → Developers → Webhooks  
*   \- Add endpoint: https://dominio.com/api/webhooks/stripe  
*   \- Eventos: checkout.session.completed, customer.subscription.\*  
*   \- Copiar Signing secret → STRIPE\_WEBHOOK\_SECRET en Vercel  
* Configurar dominio en Vercel (ver sección 8\)  
* Cliente activa Stripe production mode (después de testing completo)

## **7.6 Deploy a Producción**

* Merge rama dev a main  
* Vercel detecta push y hace deploy automático  
* Verificar dominio resuelve correctamente  
* SSL automático activado

## **7.7 Entrega Final**

**Al cliente entregas:**

* URL funcionando en producción  
* Credenciales de acceso admin  
* Documentación básica de uso  
* Guía de gestión de productos/usuarios  
* Acceso al dashboard de Vercel (opcional, como colaborador)  
* Código fuente (opcional, según contrato)

**Financiero:**

* Factura 50% final  
* Primer mes de mantenimiento incluido  
* Factura recurrente mensual para mantenimiento

## **7.8 Post-Entrega**

**Mantenimiento incluye:**

* Hosting (Vercel, Turso, Clerk, Resend)  
* Monitoring básico  
* Soporte técnico (respuesta en 24-48h)  
* Actualizaciones de seguridad  
* Bug fixes  
* Cambios menores (max 2h/mes)

**Cambios mayores:** Se cobran aparte según estimación de horas.

# **8\. Configuración de Dominios en Vercel**

## **8.1 Dominio Principal**

**Paso 1:** En Vercel

* Proyecto → Settings → Domains  
* "Add Domain"  
* Escribir: clienteapp.com  
* "Add"

**Paso 2:** Vercel muestra registros DNS necesarios

| Type | Name | Value |
| ----- | ----- | ----- |
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

**Paso 3:** Configurar en proveedor DNS

* Ir al proveedor del dominio (GoDaddy, Namecheap, Cloudflare, etc.)  
* DNS Management / DNS Settings  
* Agregar registros A y CNAME como muestra Vercel  
* Guardar cambios

**Paso 4:** Esperar propagación DNS

* Tiempo: 5 minutos a 48 horas (usualmente 15-30 min)  
* Vercel verifica automáticamente  
* SSL se activa automáticamente cuando verifica

## **8.2 Subdominios**

**Uso:** Múltiples proyectos bajo un mismo dominio

**Ejemplos:**

* miguelaguiar.dev → Landing personal  
* portfolio.miguelaguiar.dev → Portfolio  
* app.miguelaguiar.dev → Aplicación principal  
* cliente1.miguelaguiar.dev → Proyecto cliente 1  
* cliente2.miguelaguiar.dev → Proyecto cliente 2

**Configuración:**

* Mismo proceso que dominio principal  
* En Vercel: agregar subdominio completo (app.dominio.com)  
* En DNS: agregar CNAME con nombre del subdominio (app)

**Ventaja:** Subdominios ilimitados gratis en Vercel. Perfecto para freelancers con múltiples clientes.

# **9\. Recursos y Documentación**

## **9.1 Documentación Oficial**

* **Next.js:** nextjs.org/docs  
* **Turso:** docs.turso.tech  
* **Clerk:** clerk.com/docs  
* **Stripe:** stripe.com/docs  
* **shadcn/ui:** ui.shadcn.com  
* **Tailwind CSS:** tailwindcss.com/docs  
* **Zod:** zod.dev  
* **React Hook Form:** react-hook-form.com  
* **Resend:** resend.com/docs  
* **Vercel:** vercel.com/docs  
* **Biome:** biomejs.dev

## **9.2 Comandos Rápidos**

**Desarrollo:**

* bun dev \- Iniciar servidor desarrollo  
* bun run build \- Build producción  
* bun run lint \- Ejecutar Biome  
* bun run lint:fix \- Autofix con Biome

**Turso:**

* turso auth login \- Login CLI  
* turso db list \- Listar DBs  
* turso db create \<name\> \- Crear DB  
* turso db shell \<name\> \- Shell SQL  
* turso db tokens create \<name\> \- Generar token

**Stripe:**

* stripe login \- Login CLI  
* stripe listen \--forward-to localhost:3000/api/webhooks/stripe

## **9.3 Resumen del Stack**

| Categoría | Tecnología | Quién Crea |
| ----- | ----- | ----- |
| Framework | Next.js 14 | Tú |
| Base de Datos | Turso | **Tú** |
| Autenticación | Clerk | **Tú** |
| Pagos | Stripe | **Cliente** |
| Emails | Resend | **Tú** |
| Hosting | Vercel | **Tú** |

# **10\. Notas Finales**

**Ventajas de este stack:**

* 100% gratis para desarrollo y MVPs  
* Proyectos ilimitados  
* Deploy en minutos  
* Escalable cuando sea necesario  
* Type-safe de principio a fin  
* Documentación excelente en todos los servicios  
* Comunidad activa

**Para escalar:**

* Todos los servicios tienen planes pagos claros  
* Los costos se trasladan al cliente  
* Sin vendor lock-in extremo (Next.js y Postgres son estándares)

**Tiempo estimado de desarrollo típico:**

* Landing \+ Auth: 1-2 días  
* CRUD básico: 2-3 días  
* Integración pagos: 1 día  
* Admin panel: 2-3 días  
* Testing y polish: 1-2 días  
* **Total MVP: 1-2 semanas**

*Stack optimizado para desarrollo rápido y entregas eficientes*