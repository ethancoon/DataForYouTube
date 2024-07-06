import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Video } from "./types";
import Results from "./pages/Data";
import Home from "./pages/Home";
import Links from "./pages/Links";
import Faq from "./pages/FAQ";
import Navbar from "./components/Navbar";

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
        <Route path="/links" element={<Links />} />
      </Routes>
    </Router>
  );
};

export default App;
