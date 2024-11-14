import { Container } from "@mui/material";
import logo from "../../assets/logo.js";

export const AboutPage = () => (
  <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "1%" }}>
    <Container sx={{ marginLeft: "0px" }}>
      This page is done as a hobby project in 2024. By using Yle&apos;s free teletext API some of
      the sport pages&apos; content is fetched and displayed on this site. The pages are build with
      JavaScript, Vite and React and deployed with Vercel. Material UI is used as an UI-library.
      <br />
      <br />© Eino Lindberg 2024
      <br />
      <br />
      <br />
      <br />
      <img style={{ width: "10%" }} src={logo} />
      <img style={{ width: "10%" }} src={logo} />
      <img style={{ width: "10%" }} src={logo} />
      <img style={{ width: "10%" }} src={logo} />
      <img style={{ width: "10%" }} src={logo} />
      <img style={{ width: "10%" }} src={logo} />
      <img style={{ width: "10%" }} src={logo} />
      <img style={{ width: "10%" }} src={logo} />
      <img style={{ width: "10%" }} src={logo} />
      <img style={{ width: "10%" }} src={logo} />
    </Container>
  </div>
);
