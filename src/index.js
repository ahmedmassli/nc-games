import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import $ from "jquery";
import "./assets/Semantic-UI-master/dist/semantic.min.css";

window.$ = $;
window.jQuery = $;

const script = document.createElement("script");
script.src = "/semantic.min.js";
document.body.appendChild(script);

script.onload = () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  reportWebVitals();
};
