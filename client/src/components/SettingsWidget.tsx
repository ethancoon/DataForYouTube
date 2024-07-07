// import React, { useState } from "react";
// import {
//   Box,
//   IconButton,
//   Switch,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Typography,
// } from "@mui/material";
// import SettingsIcon from "@mui/icons-material/Settings";

// const SettingsWidget = () => {
//   const [open, setOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [language, setLanguage] = useState("en");

//   const togglePanel = () => {
//     setOpen(!open);
//   };

//   const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setDarkMode(event.target.checked);
//     // Implement theme change logic here
//   };

//   const handleLanguageChange = (
//     event: React.ChangeEvent<{ value: unknown }>,
//   ) => {
//     setLanguage(event.target.value as string);
//     // Implement language change logic here
//   };

//   return (
//     <Box sx={{ position: "fixed", top: 16, right: 16, textAlign: "center" }}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: 40,
//           right: 0,
//           width: "auto",
//           p: 2,
//           bgcolor: "background.paper",
//           border: "1px solid",
//           borderColor: "divider",
//           borderRadius: 1,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           transition: "max-height 0.5s ease, opacity 0.5s ease",
//           overflow: "hidden",
//           maxHeight: open ? "300px" : "0",
//           opacity: open ? 0.9 : 0, // Slight transparency when open
//         }}
//       >
//         <Typography variant="h6">Settings</Typography>
//         <Box>
//           <Typography>Dark Mode</Typography>
//           <Switch checked={darkMode} onChange={handleModeChange} />
//         </Box>
//         <FormControl fullWidth sx={{ mt: 2 }}>
//           <InputLabel>Language</InputLabel>
//           <Select
//             value={language}
//             label="Language"
//             onChange={handleLanguageChange}
//           >
//             <MenuItem value="en">English</MenuItem>
//             <MenuItem value="es">Spanish</MenuItem>
//             {/* Add more languages as needed */}
//           </Select>
//         </FormControl>
//       </Box>
//       <IconButton
//         onClick={togglePanel}
//         sx={{
//           mb: 1,
//           transition: "transform 0.5s",
//           transform: open ? "rotate(180deg)" : "rotate(0deg)",
//         }}
//       >
//         <SettingsIcon />
//       </IconButton>
//     </Box>
//   );
// };

// export default SettingsWidget;
