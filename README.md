# 🚀 DensityLabsTS

This project is a technical test, where it is requested that a project be made to add comments and allow nested comments.

It is developed with Node, Express, Prisma, MySQL, Jest and TS in the backend, while the frontend is developed with React, Tailwind, TS.

## To Install

1. Clone this repository
2. npm i (in frontend and backend)

> ### Configuración del Backend
>
> En la carpeta `backend`, crea un archivo `.env` y agrega las siguientes variables de entorno:
>
> ```env
> PORT=4100
> DATABASE_URL="mysql://root:5016@127.0.0.1:3306/densityLabs"
> JWT_SECRET=D3nsityL4bs
> ```

> ### Configuración del Frontend
>
> En la carpeta `frontend`, crea un archivo `.env` y agrega las siguientes variables de entorno:
>
> ```env
>   VITE_BACKEND_URL = http://localhost:4100
> ```

5. When you test the backend at the end it will restore the DB (all data will be erased)
