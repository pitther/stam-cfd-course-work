import { createGlobalStyle } from 'styled-components';

import { themeColors } from './theme';

import 'font-proxima-nova/style.css';

export const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    background-color: ${themeColors.mainContent};
    font-family: 'Proxima Nova Rg', sans-serif;
    font-weight: 600;
    font-size: 16px;
  }

  #stats {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 500;
    width: max(200px, 10vw);
    height: max(100px, 6vh);
    opacity: 0.8;
    user-select: none;
    display: none;
  }

`;
