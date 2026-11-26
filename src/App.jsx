import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

const Commissions = lazy(() => import("./Commissions.jsx"));
const Portfolio = lazy(() => import("./Portfolio.jsx"));
const Terms = lazy(() => import("./Terms.jsx"));

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
      <Suspense fallback={<div className="min-h-screen bg-[#0d0d0d]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/commissions" element={<Commissions />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
