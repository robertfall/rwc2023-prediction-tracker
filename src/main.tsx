import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppContext, initializeAppContext } from "./services/app-context.ts";

async function createApp() {
  const context = await initializeAppContext();

  // @ts-ignore
  window.appContext = context;

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <AppContext.Provider value={context}>
        <App />
      </AppContext.Provider>
    </React.StrictMode>
  );
}
createApp();
