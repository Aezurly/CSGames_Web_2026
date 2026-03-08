import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Egg from "./Egg.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/game" element={<App />} />
        <Route path="/egg" element={<Egg />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
