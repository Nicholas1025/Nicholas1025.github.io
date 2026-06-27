import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ClickSpark from "./components/ClickSpark";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Global click-spark — the one pop of colour (amber) on a B&W site */}
    <ClickSpark
      sparkColor="#FFFFFF"
      sparkSize={11}
      sparkRadius={18}
      sparkCount={8}
      duration={420}
    >
      <App />
    </ClickSpark>
  </React.StrictMode>,
);
