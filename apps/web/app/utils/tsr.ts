import { contract } from "@apps/backend/contract";
import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import env from "./env";

export const tsr = initTsrReactQuery(contract, {
  baseUrl: env.VITE_BACKEND_URL,
  baseHeaders: {
    "x-app-source": "ts-rest",
    "x-miku": "hai",
  },
  validateResponse: true,
});
