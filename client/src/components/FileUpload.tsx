import React, { useState } from "react";
import { Video } from "../types"; // Adjust the import path as necessary

interface FileUploadProps {
  setFileContent: (videos: Video[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFileContent }) => {
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
          setError("Failed to parse JSON file");
        }
      };
      reader.onerror = () => {
        setError("Failed to read file");
      };
      reader.readAsText(file);
    } else {
      setError("Please upload a valid JSON file");
    }
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default FileUpload;
