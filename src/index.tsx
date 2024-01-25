import React from "react";
import ReactDOM from "react-dom/client";
import CustomInputNumber from "./components/CustomInputNumber";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <div style={{ minWidth: "1000px", textAlign: "center" }}> */}
    <CustomInputNumber />
    {/* </div> */}
  </React.StrictMode>
);
