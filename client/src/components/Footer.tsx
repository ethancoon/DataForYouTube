import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        py: 6,
        width: "100%",
        bottom: 0,
        left: 0,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          Contact me at{" "}
          <Link href="mailto:eethanccoon@gmail.com">eethanccoon@gmail.com</Link>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/ethan-coon-569357240/"
            sx={{ mx: 1 }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton component="a" href="https://github.com/ethancoon">
            <GitHubIcon />
          </IconButton>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
