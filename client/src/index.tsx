import React from "react";
import reportWebVitals from "./reportWebVitals";
import { App } from "./app/layout";
import { render } from "react-dom";

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);

reportWebVitals();
