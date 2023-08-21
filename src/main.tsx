import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { indexedDBRepositoryFactory } from "./services/indexdb-results-repository";

async function createApp() {
  const resultsRepository = await indexedDBRepositoryFactory();

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App resultsRepository={resultsRepository} />
    </React.StrictMode>
  );
}
createApp();
