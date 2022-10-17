import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Canvas from "./components/canvas/canvas.component";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import 'tachyons'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
