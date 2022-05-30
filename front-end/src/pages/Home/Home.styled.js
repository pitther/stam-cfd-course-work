import { Button } from 'antd';
import styled from 'styled-components';

import { themeColors } from '../../styles/theme';

import { Header } from '../NoMatch/NoMatch.styled';

export const Wrapper = styled.div`
  width: 100%;
  padding: 2rem 2rem 1rem;
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: grid;
  grid-gap: 1rem;
  flex-direction: column;
`;

export const Block = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;

export const MainBlock = styled(Block)`
  width: 100%;
  align-items: center;
  text-align: center;
`;

export const OverImage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;

  background: url(${({ img }) => img});
  filter: saturate(70%) blur(2px);

  background-size: cover;
  aspect-ratio: 1;
`;

export const Title = styled(Header)`
  position: absolute;
  backdrop-filter: brightness(1);
  z-index: 1;
  padding: 1rem;
`;

export const Join = styled(Button)`
  color: ${themeColors.default};
  text-shadow: 2px 2px 1px ${themeColors.accent};
  font-size: 2em;
  max-width: 100%;
  white-space: break-spaces;
  height: auto;
  background: none;
  margin: 2rem auto 3rem;
`;

export const Subtitle = styled.div`
  font-weight: bold;
  font-size: 19%;

  text-align: center;
  color: ${themeColors.header};
  text-shadow: 2px 2px 1px ${themeColors.accent};
`;

export const Text = styled.div``;
