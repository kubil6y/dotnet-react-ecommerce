import React from "react";
import reportWebVitals from "./reportWebVitals";
import { App } from "./app/layout";
import { render } from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.querySelector("#root")
);

reportWebVitals();
