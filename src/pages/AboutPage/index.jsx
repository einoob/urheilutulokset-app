import { Container } from "@mui/material";

export const AboutPage = () => (
  <div style={{ display: "flex", justifyContent: "flex-start"}}>
    <Container sx={{ width: "48%", marginLeft: "0px" }}>
      This page is done as a hobby project in 2024. By using Yle's free teletext API some of the
      sport pages' content is fetched and displayed on this site. The pages are build with
      JavaScript, Vite and React and deployed with Vercel. Material UI is used as an UI-library.
      <br />
      <br />
      © Eino Lindberg 2024
    </Container>
  </div>
);
