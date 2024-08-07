import React, { useState } from "react";
import { Box, Typography, Button, Alert, Input } from "@mui/material";
import CloudUpload from "@mui/icons-material/CloudUpload";
import { Video } from "../types";
import sampleData from "../utils/sample-data.json";

interface FileUploadProps {
  setFileContent: (videos: Video[] | null) => void;
}

const Upload: React.FC<FileUploadProps> = ({ setFileContent }) => {
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.type === "application/json") {
      // Assuming you want to read the file content
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setFileContent(json);
          setError("");
        } catch (err) {
          setFileContent(null);
          setError("Error parsing JSON file");
        }
      };
      reader.readAsText(file);
    } else {
      setFileContent(null);
      setError("Please upload a valid JSON file");
    }
  };

  const handleUseSampleData = () => {
    setFileContent(sampleData as Video[]);
    setError("");
  };

  return (
    <Box
      id="upload-section"
      sx={{
        width: "100%",
        maxWidth: 500,
        margin: "auto",
        textAlign: "center",
        marginTop: 35,
        marginBottom: 6,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: 56,
          fontWeight: "bold",
        }}
      >
        Data for YouTube
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <label htmlFor="upload-button-file">
          <Input
            id="upload-button-file"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUpload />}
            sx={{
              backgroundColor: "#FF0000",
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#820000",
              },
            }}
          >
            Upload json file
          </Button>
        </label>
        <label htmlFor="upload-button-file">
          <Button
            variant="contained"
            onClick={handleUseSampleData}
            sx={{
              backgroundColor: "#FF0000",
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#820000",
              },
            }}
          >
            Use Sample Data
          </Button>
        </label>

        {error && (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default Upload;
