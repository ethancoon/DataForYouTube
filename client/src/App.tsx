import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Video } from "./types";
import Data from "./pages/Data";
import Home from "./pages/Home";
import Links from "./pages/Links";
import Faq from "./pages/FAQ";

const App = () => {
  const [fileContent, setFileContent] = useState<Video[] | null>(null);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Upload</Link>
            </li>
            <li>
              <Link to="/data">Data</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/links">Links</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home setFileContent={setFileContent} />} />
        <Route path="/data" element={<Data fileContent={fileContent} />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/links" element={<Links />} />
      </Routes>
    </Router>
  );
};

export default App;
