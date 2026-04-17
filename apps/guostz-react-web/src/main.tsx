import { startApp } from "@/app/micro-app";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element #root was not found");
}

startApp(container);
