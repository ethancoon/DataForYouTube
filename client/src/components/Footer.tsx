import { Box, Container, Typography, Link } from "@mui/material";

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
        <Typography variant="body1" align="center" gutterBottom>
          © {new Date().getFullYear()} Data for YouTube. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Contact us at{" "}
          <Link href="mailto:contact@dataforyoutube.com">
            contact@dataforyoutube.com
          </Link>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          Follow us on
          <Link href="https://twitter.com/yourtwitterhandle" sx={{ mx: 1 }}>
            Twitter
          </Link>
          <Link href="https://facebook.com/yourfacebookpage">Facebook</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
