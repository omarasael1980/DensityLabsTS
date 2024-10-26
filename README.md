# 🚀 DensityLabsTS

This project is a technical test, where it is requested that a project be made to add comments and allow nested comments.

It is developed with Node, Express, Prisma, MySQL, Jest and TS in the backend, while the frontend is developed with React, Tailwind, TS.

## To Install

1. Clone this repository
2. npm i (in frontend and backend)

> ### Backend Configuration
>
> Enter to `backend` carpet, make `.env` file and add this:
>
> ```env
> PORT=4100
> DATABASE_URL="mysql://root:5016@127.0.0.1:3306/densityLabs"
> JWT_SECRET=D3nsityL4bs
> ```

> ### Frontend Configuration
>
> Entrer to`frontend` carpet, make `.env` file y add this variable:
>
> ```env
>   VITE_BACKEND_URL = http://localhost:4100
> ```

## Testing

> I used Jest to make the backend test
> When you test the backend at the end it will restore the DB (all data will be erased)
