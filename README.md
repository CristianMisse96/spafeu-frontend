<div align="center">

# SPAFEU Web

[![Angular](https://img.shields.io/badge/Angular-21.2.0-DD0031?logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PrimeNG](https://img.shields.io/badge/PrimeNG-21.1.6-42A5F5?logo=primefaces&logoColor=white)](https://primeng.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Sistema de Promoción de Actividad Física Estudiantil Universitaria**

Frontend web para la gestión, seguimiento y visualización de actividades físicas, retos y progreso estudiantil en el entorno universitario.

[Ver Demo](#) · [Reportar Bug](../../issues) · [Solicitar Feature](../../issues)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Características Principales](#-características-principales)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Contribuir](#-contribuir)
- [Colaboradores](#-colaboradores)
- [Licencia](#-licencia)

---

## 🎯 Descripción del Proyecto

SPAFEU es una plataforma integral diseñada para fomentar la actividad física en la comunidad estudiantil universitaria. El sistema permite:

- Evaluar la condición física inicial mediante cuestionarios estandarizados como el **PAR-Q**.
- Registrar perfiles de salud y historial de actividad física de los estudiantes.
- Visualizar y gestionar programas de ejercicios y retos deportivos.
- Realizar un seguimiento del progreso físico a lo largo del tiempo.

El proyecto está construido con **Angular 21+**, aprovechando las últimas características del framework como *standalone components*, *signals* para la gestión de estado y *lazy loading* para un rendimiento óptimo.

---

## ✨ Características Principales

- 🔐 **Autenticación y Autorización** – Sistema de inicio de sesión con control de acceso basado en roles.
- 📊 **Onboarding de Salud** – Formularios dinámicos (PAR-Q e Historial Físico) con validación en tiempo real.
- 🏋️ **Catálogo de Ejercicios** – Listado de actividades físicas agrupadas por tipo con detalles y temporizador de sesión.
- 📈 **Seguimiento de Progreso** – Visualización de métricas de salud y avances del usuario.
- 📱 **Diseño Responsivo** – Interfaz adaptativa optimizada para dispositivos móviles, tabletas y escritorio.
- ♿ **Accesibilidad (a11y)** – Cumplimiento con estándares WCAG AA y compatibilidad con lectores de pantalla.

---

## 🛠 Tecnologías

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| [Angular](https://angular.io/) | `^21.2.0` | Framework de frontend |
| [TypeScript](https://www.typescriptlang.org/) | `~5.9.2` | Tipado estático para JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | `^4.3.0` | Framework de utilidades CSS |
| [PrimeNG](https://primeng.org/) | `^21.1.6` | Biblioteca de componentes UI |
| [RxJS](https://rxjs.dev/) | `~7.8.0` | Programación reactiva |
| [Vitest](https://vitest.dev/) | `^4.0.8` | Framework de testing unitario |
| [ngx-toastr](https://www.npmjs.com/package/ngx-toastr) | `^20.0.5` | Notificaciones tipo toast |
| [SweetAlert2](https://sweetalert2.github.io/) | `^11.26.24` | Diálogos modales personalizados |

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** `>= 20.0.0` (recomendado: usar [nvm](https://github.com/nvm-sh/nvm))
- **npm** `>= 11.0.0` (incluido con Node.js)
- **Git**

> Este proyecto utiliza `npm@11.12.1` como gestor de paquetes por defecto.

---

## 🚀 Instalación

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### 1. Clonar el repositorio

```bash
git clone https://github.com/CristianMisse96/spafeu-frontend.git
cd spafeu-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea o edita el archivo de entorno según corresponda (desarrollo o producción):

```bash
# src/environments/environment.ts (desarrollo)
# src/environments/environment.prod.ts (producción)
```

Asegúrate de definir la URL base de la API backend:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1'
};
```

### 4. Iniciar el servidor de desarrollo

```bash
npm start
# o
cd spafeu-frontend && ng serve
```

La aplicación estará disponible en `http://localhost:4200/` y se recargará automáticamente con cada cambio.

---

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo (`ng serve`) |
| `npm run build` | Compila la aplicación para producción |
| `npm run watch` | Compila en modo desarrollo con recarga en caliente |
| `npm test` | Ejecuta las pruebas unitarias con Vitest |

---

## 🗂 Estructura del Proyecto

```
spafeu-frontend/
├── src/
│   ├── app/
│   │   ├── auth/                    # Módulo de autenticación (login, registro, guards)
│   │   ├── dashboard-user/          # Dashboard del usuario
│   │   │   ├── pages/
│   │   │   │   ├── home/            # Página principal del usuario
│   │   │   │   ├── on-boarding/     # Flujo de registro inicial (PAR-Q, Historial)
│   │   │   │   └── exercise-detail/ # Detalle de ejercicios con temporizador
│   │   │   ├── services/            # Servicios de negocio (API, cuestionarios, campus)
│   │   │   └── components/          # Componentes reutilizables del dashboard
│   │   ├── shared/                  # Módulos, enums, interfaces y utilidades compartidas
│   │   └── core/                    # Guards, interceptores y configuración global
│   ├── environments/                # Configuración de entornos
│   ├── assets/                      # Imágenes, íconos y recursos estáticos
│   └── styles.css                   # Estilos globales y utilidades de Tailwind
├── angular.json                     # Configuración de Angular CLI
├── tailwind.config.ts               # Configuración de Tailwind CSS
├── tsconfig.json                    # Configuración de TypeScript
└── package.json                     # Dependencias y scripts
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si deseas mejorar SPAFEU, sigue estos pasos:

1. **Fork** el repositorio.
2. Crea una nueva rama para tu feature o corrección:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   # o
   git checkout -b fix/descripcion-del-bug
   ```
3. Realiza tus cambios siguiendo las [convenciones de código](AGENTS.md) del proyecto.
4. Asegúrate de que las pruebas pasen:
   ```bash
   npm test
   ```
5. Haz commit de tus cambios con mensajes descriptivos:
   ```bash
   git commit -m "feat(scope): descripción clara del cambio"
   ```
6. Sube tu rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
7. Abre un **Pull Request** describiendo los cambios realizados.

> Por favor, revisa las [issues existentes](../../issues) antes de abrir una nueva para evitar duplicados.

---

## 👥 Colaboradores

Un agradecimiento especial a todas las personas que han contribuido a este proyecto:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/CristianMisse96">
        <img src="https://github.com/CristianMisse96.png?size=100" width="100px" alt="Cristian Misse"/><br />
        <sub><b>Cristian Misse</b></sub>
      </a><br />
      <sub>Lead Developer & Architect</sub>
    </td>
    <td align="center">
      <a href="https://github.com/IsaiasConde">
        <img src="https://github.com/IsaiasConde.png?size=100" width="100px" alt="Isaias Conde"/><br />
        <sub><b>Isaias Conde</b></sub>
      </a><br />
      <sub>Frontend Developer</sub>
    </td>
  </tr>
</table>

¿Te gustaría aparecer aquí? Consulta la sección de [Contribuir](#-contribuir).

---

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**.

```
MIT License

Copyright (c) 2025 SPAFEU Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

**[⬆ Volver al inicio](#spafeu-web)**

Desarrollado con ❤️ por el equipo SPAFEU.

</div>
