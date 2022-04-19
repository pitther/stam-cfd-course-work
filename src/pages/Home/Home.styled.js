import styled from 'styled-components';

import { themeColors } from '../../styles/theme';

export const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
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

export const OverImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background: url(${({ img }) => img});*/

  background-size: cover;
  aspect-ratio: 1;
`;

export const Title = styled.div`
  font-size: 500%;
  width: 100%;
  text-align: center;
  color: ${themeColors.accent};
  text-shadow: 4px 0 0 grey;
`;
export const Subtitle = styled.div`
  font-weight: bold;
  font-size: 20%;
  text-align: center;

  text-shadow: 1px 0 0 grey;
`;

export const Text = styled.div``;
