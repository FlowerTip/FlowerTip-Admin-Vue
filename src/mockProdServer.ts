import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

import user from "../mock/user";
import upload from "../mock/upload";
import table from "../mock/table";
import permission from "../mock/permission";
export function setupProdMockServer() {
  createProdMockServer([...user, ...permission, ...upload, ...table]);
}
