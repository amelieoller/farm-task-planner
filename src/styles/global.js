import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *:before,
  *:after,
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  html,
  body {
    margin: 0;
    padding: 0;
    line-height: 1.4;
  }

  html,
  body,
  #root {
    min-height: 100vh;
  }

  p {
    margin: 0 0 1rem;
  }

  hr {
    border: none;
    height: 1px;
    background: #eee;
    margin: 1rem 0;
  }

  svg {
    width: 20px;
  }

  h1, h2, h3, h4, h5,h6 {
    font-weight: 400;

  }

  h1 {
    font-size: 1.7rem;
  }

  h2 {
    font-size: 1.4rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  h4 {
    font-size: 1.1rem;
  }

  h5 {
    font-size: .95rem;
  }

  h6 {
    font-size: .85rem;
  }
`;

export default GlobalStyle;
