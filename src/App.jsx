import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Commissions from "./Commissions.jsx";
import Portfolio from "./Portfolio.jsx";
import Terms from "./Terms.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

export default function App() {
  useEffect(() => {
    const preventContextMenu = (e) => e.preventDefault();
    const preventDrag = (e) => {
      if (e.target instanceof Element && e.target.closest("img, video, a")) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("dragstart", preventDrag);
    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("dragstart", preventDrag);
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/commissions" element={<Commissions />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}
