🚀 DensityLabsTS
Este proyecto es una prueba técnica para desarrollar una aplicación que permita agregar comentarios y anidarlos. Está construido con Node.js, Express, Prisma, MySQL, Jest, y TypeScript en el backend, y React, TailwindCSS, y TypeScript en el frontend.

Instalación y Configuración

1. Clonar el Repositorio
   bash
   Copiar código
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
2. Instalar Dependencias
   Ejecuta el siguiente comando en las carpetas frontend y backend para instalar las dependencias necesarias:

bash
Copiar código
npm install 3. Configuración del Backend
En la carpeta backend, crea un archivo .env y agrega las siguientes variables de entorno:

env
Copiar código

# Configuración del Servidor

PORT=4100

# Base de Datos de Desarrollo

DATABASE_URL="mysql://root:5016@127.0.0.1:3306/densityLabs"

# Base de Datos para Pruebas (Descomentar para pruebas)

# DATABASE_URL="mysql://root:5016@127.0.0.1:3306/densityLabs_Test"

# Clave Secreta para JWT

JWT_SECRET=D3nsityL4bs 4. Configuración del Frontend
En la carpeta frontend, crea un archivo .env y agrega la URL del backend:

env
Copiar código
VITE_BACKEND_URL=http://localhost:4100 5. Ejecución de Pruebas del Backend
Durante las pruebas del backend, la base de datos se restaurará automáticamente al estado inicial, lo que eliminará todos los datos existentes.
