import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Typography,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container id="faq-section" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        FAQ
      </Typography>
      {[
        {
          question: "What is DataForYouTube?",
          answer:
            "DataForYouTube is a web application that analyzes your YouTube watch history and provides insights.",
        },
        {
          question: "How can I get the YouTube watch history JSON file?",
          answer: (
            <React.Fragment>
              You can download your YouTube watch history JSON file using{" "}
              <Link
                href="https://takeout.google.com"
                target="_blank"
                rel="noopener"
              >
                Google Takeout
              </Link>
              . Deselect all, scroll to the bottom, select YouTube, and choose
              the JSON format for your watch history under{" "}
              <span style={{ color: "red" }}>Multiple formats</span>.
              <br />
              <br />
              You will also want to click on{" "}
              <span style={{ color: "red" }}>
                All YouTube data included
              </span>{" "}
              and disable all but <span style={{ color: "red" }}>history</span>{" "}
              to reduce the size of the file. After downloading the file,
              extract the zip and upload the JSON.
              <br />
              <br />
              Note that while the website is not built for it, if you submit
              your search history JSON file, it will still work.
            </React.Fragment>
          ),
        },
        {
          question: "Is my data stored on your servers?",
          answer: "No, your data is processed entirely in your browser.",
        },
        {
          question: "What can I actually see after giving my watch history?",
          answer:
            "Your favorite channels, most watched videos, most active times, and more!",
        },
      ].map((faq, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default Faq;
