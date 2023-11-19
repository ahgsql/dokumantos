import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { NextUIProvider } from "@nextui-org/react";

import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <main className="light text-foreground bg-background ">
      <Router>
        <App />
      </Router>
    </main>
  </NextUIProvider>
);
