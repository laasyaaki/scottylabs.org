# ScottyLabs.org!

This is a lightweight monorepo (haha oxymoron am I right) with a `/apps/backend` and a `/apps/web`. It's set up this way so all frontend api calls can use the contract defined in the backend and be fully typesafe.

To run everything: `pnpm -r --parallel run dev`
To run a specific module, `pnpm -F @apps/backend dev`, for example

Frontend: React + Vite + Typescript + Tanstack Query

Backend: Fastify + `ts-rest` + Node runtime
