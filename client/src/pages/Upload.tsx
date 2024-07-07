import React, { useState, useRef } from "react";
import { Video } from "../types";
import { Typography, Button, Alert, Box } from "@mui/material";
import { CloudUpload, GitHub } from "@mui/icons-material";

interface FileUploadProps {
  setFileContent: (videos: Video[] | null) => void;
}

const Home: React.FC<FileUploadProps> = ({ setFileContent }) => {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          setFileContent(json);
          setError(null);
        } catch (err) {
          setFileContent(null);
          setError("Failed to parse JSON file");
        }
      };
      reader.onerror = () => {
        setFileContent(null);
        setError("Failed to read file");
      };
      reader.readAsText(file);
    } else {
      setFileContent(null);
      setError("Please upload a valid JSON file");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        margin: "auto",
        textAlign: "center",
        paddingTop: 35,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: 60,
          fontWeight: "bold",
        }}
      >
        Data for YouTube
      </Typography>
      <Button
        variant="contained"
        component="span"
        onClick={handleButtonClick}
        startIcon={<CloudUpload />}
        sx={{
          backgroundColor: "#FF0000",
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Upload json file
      </Button>
      {error && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default Home;
