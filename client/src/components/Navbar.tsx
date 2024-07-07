import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
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
        display: "flex",
        width: "50%",
        justifyContent: "center",
        gap: 0,
        bgcolor: "#FF0000",
        borderRadius: 3,
        boxShadow: 3,
        mt: 2,
        pl: 2,
        pr: 2,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {menuItems.map((item) => (
        <Button
          key={item.text}
          component={Link}
          to={item.link}
          sx={{
            textTransform: "none",
            color: "text.primary",
            fontWeight: "bold",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: 0, // Minimize default padding
            width: 96, // Fixed width for the button
            height: 78, // Fixed height for the button
            "&:hover": {
              "& .text": {
                opacity: 1, // Show text on hover
              },
              "& .avatar": {
                transform: "translateY(-6px)", // Move up slightly to simulate marginBottom
                width: 30, // Smaller size on hover
                height: 30, // Maintain aspect ratio
              },
            },
            "& .text": {
              opacity: 0, // Initially hidden
              transition: "opacity 0.3s", // Smooth transition for the opacity
              fontSize: "0.75rem", // Adjust text size as needed
            },
            "& .avatar": {
              marginTop: 2, // Adjust vertical alignment
              width: 40, // Default size to fit within the button
              height: 40, // Maintain aspect ratio
              transition: "transform 0.3s, width 0.3s, height 0.3s", // Animate transform, width, and height
            },
          }}
        >
          {getIcon(item.image)}
          <span className="text">{item.text}</span> {/* Wrap the text */}
        </Button>
      ))}
    </Box>
  );
};

export default Navbar;
