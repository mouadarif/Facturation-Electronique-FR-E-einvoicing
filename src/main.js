import { FactureExplorerApp } from "./app/app.js";

const root = document.querySelector("#app");
const app = new FactureExplorerApp(root);
app.render();
