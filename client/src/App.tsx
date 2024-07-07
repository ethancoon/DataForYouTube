import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Video } from "./types";
import Results from "./pages/Data";
import Home from "./pages/Upload";
import Links from "./pages/Links";
import Faq from "./pages/FAQ";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [fileContent, setFileContent] = useState<Video[] | null>(null);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home setFileContent={setFileContent} />} />
        <Route
          path="/results"
          element={<Results fileContent={fileContent} />}
        />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Links />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
