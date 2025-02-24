import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Display from "./components/Display";
import ShuffleContainer from "./components/ShuffleContainer";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Display/>
    </StrictMode>
);
