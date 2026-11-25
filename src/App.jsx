import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Commissions from "./Commissions.jsx";
import Portfolio from "./Portfolio.jsx";
import Terms from "./Terms.jsx";
import CustomCursor from "./CustomCursor.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/commissions" element={<Commissions />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}
