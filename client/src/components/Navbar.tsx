import React from "react";
import { Box, Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PieChartIcon from "@mui/icons-material/PieChart";
import QuizIcon from "@mui/icons-material/Quiz";
import LinkIcon from "@mui/icons-material/Link";

const Navbar: React.FC = () => {
  const menuItems = [
    { text: "Upload", link: "/", image: "FileUploadIcon" },
    {
      text: "Results",
      link: "/results",
      image: "PieChartIcon",
    },
    { text: "FAQ", link: "/faq", image: "QuizIcon" },
    {
      text: "Contact",
      link: "/contact",
      image: "LinkIcon",
    },
  ];

  const IconProperties = {
    width: 64, // Default size to fit within the button
    height: 64, // Maintain aspect ratio
    transition: "width 0.3s, height 0.3s", // Smooth transition for size
    objectFit: "contain",
  };

  const getIcon = (icon: string) => {
    switch (icon) {
      case "FileUploadIcon":
        return <FileUploadIcon className="avatar" sx={IconProperties} />;
      case "PieChartIcon":
        return <PieChartIcon className="avatar" sx={IconProperties} />;
      case "QuizIcon":
        return <QuizIcon className="avatar" sx={IconProperties} />;
      case "LinkIcon":
        return <LinkIcon className="avatar" sx={IconProperties} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        width: "30%",
        left: "50%",
        transform: "translateX(-50%)",
        minWidth: 300,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        bgcolor: "#FF0000",
        borderRadius: 3,
        boxShadow: 3,
        mt: 2,
        pl: 2,
        pr: 2,
        pt: 1,
        pb: 1,
      }}
    >
      {menuItems.map((item) => (
        <Button
          key={item.text}
          sx={{
            textTransform: "none",
            color: "text.primary",
            fontWeight: "bold",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: 0,
            width: 96,
            height: 78,
            "&:hover": {
              "& .text": {
                opacity: 1,
              },
              "& .avatar": {
                transform: "translateY(-6px)",
                width: 30,
                height: 30,
              },
            },
            "& .text": {
              opacity: 0,
              transition: "opacity 0.3s",
              fontSize: "0.75rem",
            },
            "& .avatar": {
              marginTop: 2,
              width: 40,
              height: 40,
              transition: "transform 0.3s, width 0.3s, height 0.3s",
            },
          }}
        >
          {getIcon(item.image)}
          <span className="text">{item.text}</span>
        </Button>
      ))}
    </Box>
  );
};

export default Navbar;
