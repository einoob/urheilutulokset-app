import React from "react";
import { Card, IconButton, Slide, Typography, Container } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

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
      setSlideDirection("right");
      setCurrentCardIndex(Math.max(0, currentCardIndex - 1));
    } else if (deltaX < -50 && currentCardIndex < page.length - 1) {
      setSlideDirection("left");
      setCurrentCardIndex(Math.min(page.length - 1, currentCardIndex + 1));
    }
  };

  //console.log(page);
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
              <div style={{ whiteSpace: "pre-wrap" }}>
                {subpage.map((line, index) => {
                  if (line.includes("{White}")) {
                    return <Typography key={index}>{line.replaceAll(/\{[^}]*\}/g, "")}</Typography>;
                  } else if (line.includes("{Green}")) {
                    return (
                      <Typography key={index} color="primary">
                        {line.replaceAll(/\{[^}]*\}/g, "").trim()}
                      </Typography>
                    );
                  } else if (line.includes("{Cyan}")) {
                    return (
                      <Typography key={index} color="secondary">
                        {line.replaceAll(/\{[^}]*\}/g, "").trim()}
                      </Typography>
                    );
                  } else {
                    return <Typography key={index}>{line.replaceAll(/\{[^}]*\}/g, "")}</Typography>;
                  }
                })}
              </div>
            </div>
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
    </Container>
  );
};
