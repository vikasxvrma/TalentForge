import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "next-themes";

import "highlight.js/styles/github-dark.css";
import "./index.css";

import App from "./App";
import AppProviders from "./providers/AppProviders";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AppProviders>
        <App />
      </AppProviders>
    </ThemeProvider>
  </React.StrictMode>
);