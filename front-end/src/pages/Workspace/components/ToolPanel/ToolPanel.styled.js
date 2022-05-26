import styled from 'styled-components';

import { themeColors } from '../../../../styles/theme';

export const Wrapper = styled.div`
  background: ${themeColors.header};
  width: 100%;
  padding: 0.5rem;
  margin: 0 0 1rem 0;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const ToolSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.div`
  font-size: 0.7rem;
  width: 100%;
  text-align: center;
  user-select: none;
`;

export const ToolContainer = styled.div`
  display: flex;

  &:after {
    margin-left: 0.5rem;
    content: '';
    height: 100%;
    border: 1px dashed ${themeColors.defaultDarker};
    opacity: 0.5;
  }

  &:before {
    margin-right: 0.5rem;
    content: '';
    height: 100%;
    border: 1px dashed ${themeColors.defaultDarker};
    opacity: 0.5;
  }
`;

export const Tool = styled.div`
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color ease-in 0.1s, transform ease-out 0.1s;

  color: ${({ color }) => color};

  &:hover {
    transform: scale3d(0.9, 0.9, 0.9);
    color: ${themeColors.accent};
  }

  /*
  transform: ${({ toggled }) =>
    toggled ? 'scale3d(.9,.9,.9)' : 'scale3d(1,1,1)'};*/

  color: ${({ toggled }) => (toggled ? themeColors.accent : 'black')};

  font-size: 1.3rem;
`;

export const OptionContainer = styled.div`
  display: flex;
  flex: auto;
  flex-wrap: wrap;
  max-width: 111px;
`;

export const Centrize = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
