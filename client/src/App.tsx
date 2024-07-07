import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Video } from "./types";
import Results from "./pages/Results";
import Upload from "./pages/Upload";
import Links from "./pages/Links";
import Faq from "./pages/FAQ";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [fileContent, setFileContent] = useState<Video[] | null>(null);

  return (
    <div>
      <Navbar />
      <Upload setFileContent={setFileContent} />
      <Results fileContent={fileContent} />
      <Faq />
      <Links />
      <Footer />
    </div>
  );
};

export default App;
