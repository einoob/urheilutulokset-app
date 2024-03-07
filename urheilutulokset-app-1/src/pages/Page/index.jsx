import React from "react";
import { Paper, Card, IconButton, Slide, Typography } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

export const Page = ({ page }) => {
  //const [open, setOpen] = React.useState(false);
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
      setSlideDirection("right");
      setCurrentCardIndex(Math.max(0, currentCardIndex - 1));
    } else if (deltaX < -50 && currentCardIndex < page.length - 1) {
      setSlideDirection("left");
      setCurrentCardIndex(Math.min(page.length - 1, currentCardIndex + 1));
    }
  };

  return (
    <Paper style={{ whiteSpace: "pre-line" }} sx={{ p: "12px", my: "12px" }}>
      {page.map((subpage, index) => (
        <Slide
          key={index}
          in={currentCardIndex === index}
          direction={slideDirection}
          slideDirection={slideDirection}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Card
            sx={{
              p: "12px",
              whiteSpace: "pre-line",
              display: currentCardIndex === index ? "block" : "none",
            }}
          >
            <div style={{ height: "100%" }}><Typography fontSize={14}>{subpage.join("\n")}</Typography></div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <IconButton
                size="large"
                onClick={handlePreviousCard}
                disabled={currentCardIndex === 0}
              >
                <ArrowLeft />
              </IconButton>
              <IconButton
                size="large"
                onClick={handleNextCard}
                disabled={currentCardIndex === page.length - 1}
              >
                <ArrowRight />
              </IconButton>
            </div>
          </Card>
        </Slide>
      ))}
    </Paper>
  );
};
