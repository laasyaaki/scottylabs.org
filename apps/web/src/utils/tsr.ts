import { pokemonContract } from "@apps/backend/contract";
import { initTsrReactQuery } from "@ts-rest/react-query/v5";

export const tsr = initTsrReactQuery(pokemonContract, {
  baseUrl: "http://localhost:3000",
  baseHeaders: {
    "x-app-source": "ts-rest",
    "x-miku": "hai",
  },
});
