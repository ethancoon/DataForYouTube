import React, { useState } from "react";
import { Video } from "../types";

interface FileUploadProps {
  setFileContent: (videos: Video[] | null) => void;
}

const Home: React.FC<FileUploadProps> = ({ setFileContent }) => {
  const [error, setError] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          setFileContent(json); // Call the callback with the parsed JSON
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

  return (
    <div>
      <h1>Upload</h1>
      <input type="file" onChange={onFileChange} />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default Home;
