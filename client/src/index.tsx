import React from "react";
import reportWebVitals from "./reportWebVitals";
import { App } from "./app/layout";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.querySelector("#root")
);

reportWebVitals();
