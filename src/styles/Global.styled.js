import { createGlobalStyle } from 'styled-components';

import { themeColors } from './theme';

import 'font-proxima-nova/style.css';

export const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    background-color: ${themeColors.light};
    font-family: 'Proxima Nova Rg', sans-serif;
    font-weight: 600;
    font-size: 16px;
  }

  #stats {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 500;
    width: max(200px, 10vw);
    height: max(100px, 6vh);
    opacity: 0.8;
    user-select: none;
  }

  .ant-menu-item-active {
    span > svg {
      color: ${themeColors.accent} !important;
    }
  }

  .ant-menu-item-selected {
    span > svg {
      color: ${themeColors.accent} !important;
    }
  }

`;
