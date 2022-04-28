import styled from 'styled-components';

import { themeColors } from '../../../../styles/theme';

export const Wrapper = styled.div`
  background: ${themeColors.header};
  width: 100%;
  padding: 0.2rem;
  margin: 0 0 1rem 0;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
`;

export const ToolSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  &:not(:last-child):after {
    margin-left: 1rem;
    content: '';
    background: black;
    width: 1px;
    height: 100%;
  }
`;

export const Tool = styled.div`
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: color ease-in 0.1s;

  &:hover {
    color: ${themeColors.accent};
  }

  font-size: 1.3rem;
`;
