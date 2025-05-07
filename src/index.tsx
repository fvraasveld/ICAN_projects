import React from "react";
import ReactDOM from "react-dom";
import "./styles.css"; // Keep your existing CSS
import "./tailwind.css"; // Add this new line
import TMRDecisionAlgorithm from "./App";

ReactDOM.render(
  <React.StrictMode>
    <TMRDecisionAlgorithm />
  </React.StrictMode>,
  document.getElementById("root")
);
