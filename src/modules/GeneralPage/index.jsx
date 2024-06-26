import React from "react";
import { Card, IconButton, Slide, Typography, Container } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

const ColoredWords = ({ line }) => {
  const theme = useTheme();
  const colorTagRegex = /\{(.*?)\}/g;
  const words = line.split(/(\s+)/); // Split by whitespace but keep the spaces

  let currentColor = theme.palette.text.primary; // Default color
  const coloredWords = words.map((word, index) => {
    const colorTagMatch = word.match(colorTagRegex);
    if (colorTagMatch) {
      switch (colorTagMatch[0]) {
        case "{Green}":
          currentColor = theme.palette.primary.main;
          break;
        case "{Cyan}":
          currentColor = theme.palette.secondary.main;
          break;
        case "{Yellow}":
          currentColor = theme.palette.tertiary.main;
          break;
        case "{White}":
          currentColor = theme.palette.text.primary;
          break;
        default:
          currentColor = theme.palette.text.primary;
          break;
      }
      // Remove the color tag from the word
      word = word.replace(colorTagRegex, "");
    }
    return (
      <span key={index} style={{ color: currentColor }}>
        {word}
      </span>
    );
  });

  return (
    <Typography component="span" style={{ whiteSpace: "pre-wrap" }}>
      {coloredWords}
    </Typography>
  );
};

const SubpageContent = ({ subpage }) => (
  <div style={{ whiteSpace: "pre-wrap" }}>
    {subpage.map((line, index) => (
      <Typography key={index} component="div">
        <ColoredWords line={line} />
      </Typography>
    ))}
  </div>
);

const CardNavigator = ({ currentCardIndex, pageLength, handlePreviousCard, handleNextCard }) => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <IconButton size="large" onClick={handlePreviousCard} disabled={currentCardIndex === 0}>
      <ArrowLeft />
    </IconButton>
    <IconButton
      size="large"
      onClick={handleNextCard}
      disabled={currentCardIndex === pageLength - 1}
    >
      <ArrowRight />
    </IconButton>
  </div>
);

export const GeneralPage = ({ page }) => {
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  const [slideDirection, setSlideDirection] = React.useState("left");
  const [startX, setStartX] = React.useState(0);

  const handleNextCard = () => {
    setSlideDirection("left");
    setCurrentCardIndex(Math.min(page.length - 1, currentCardIndex + 1));
  };

  const handlePreviousCard = () => {
    setSlideDirection("right");
    setCurrentCardIndex(Math.max(0, currentCardIndex - 1));
  };

  const handleTouchStart = (event) => {
    setStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    const deltaX = event.changedTouches[0].clientX - startX;
    if (deltaX > 50 && currentCardIndex > 0) {
      handlePreviousCard();
    } else if (deltaX < -50 && currentCardIndex < page.length - 1) {
      handleNextCard();
    }
  };

  return (
    <Container
      sx={{
        whiteSpace: "pre-line",
        p: "12px",
        m: "auto",
        width: "400px",
        boxShadow: 0,
        overflow: "hidden",
      }}
    >
      {page.map((subpage, index) => (
        <Slide
          key={index}
          in={currentCardIndex === index}
          direction={slideDirection}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Card
            sx={{
              p: "12px",
              whiteSpace: "pre-line",
              display: currentCardIndex === index ? "block" : "none",
              boxShadow: 2,
            }}
          >
            <div style={{ height: "100%" }}>
              <SubpageContent subpage={subpage} />
            </div>
            <CardNavigator
              currentCardIndex={currentCardIndex}
              pageLength={page.length}
              handlePreviousCard={handlePreviousCard}
              handleNextCard={handleNextCard}
            />
          </Card>
        </Slide>
      ))}
    </Container>
  );
};
