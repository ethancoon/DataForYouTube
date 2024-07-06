import React, { useState } from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const faqData = [
    {
      question: "What is DataForYouTube?",
      answer:
        "DataForYouTube is a web application that analyzes your YouTube watch history and provides insights.",
    },
    {
      question: "How do I upload my YouTube watch history?",
      answer:
        "You can upload your YouTube watch history JSON file by navigating to the upload page and selecting the file from your device.",
    },
    {
      question: "Is my data stored on your servers?",
      answer:
        "No, your data is processed entirely in your browser and is not stored on our servers.",
    },
    {
      question: "Can I see my favorite channels and most-watched videos?",
      answer:
        "Yes, DataForYouTube provides insights into your favorite channels and most-watched videos based on your watch history.",
    },
    {
      question: "How can I get the YouTube watch history JSON file?",
      answer:
        "You can download your YouTube watch history JSON file using Google Takeout. Visit takeout.google.com, select YouTube, and choose the JSON format for your watch history.",
    },
  ];

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Frequently Asked Questions
      </Typography>
      {faqData.map((faq, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
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
