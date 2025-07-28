import fastify from "fastify";
import { initServer } from "@ts-rest/fastify";
import { pokemonContract } from "./contract";
import cors from "@fastify/cors";

const app = fastify();
await app.register(cors, {
  origin: true, // should probably be more strict after prod deployment
});

const s = initServer();

const router = s.router(pokemonContract, {
  getPokemon: async ({ params: { id } }) => {
    // Mock pokemon data
    const pokemon = { name: "Pikachu" };

    if (id !== "1") {
      return {
        status: 404,
        body: null,
      };
    }

    return {
      status: 200,
      body: pokemon,
    };
  },
});

app.register(s.plugin(router));

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("Ready on 3000!");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
