import { useState } from "react";
import { Video } from "./types";
import Results from "./pages/Results";
import Upload from "./pages/Upload";
import Faq from "./pages/FAQ";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

const App = () => {
  const [fileContent, setFileContent] = useState<Video[] | null>(null);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box component="header">
        <Navbar />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Upload setFileContent={setFileContent} />
        <Results fileContent={fileContent} />
        <Faq />
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
