import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import CausesPage from "./pages/CausesPage";
import DonatePage from "./pages/DonatePage";
import ContactPage from "./pages/ContactPage";
import VolunteerPage from "./pages/VolunteerPage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/causes" element={<CausesPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;