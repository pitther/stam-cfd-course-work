import { Button } from 'antd';
import styled from 'styled-components';

import { themeColors } from '../../styles/theme';

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

export const OverImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /*background: url(${({ img }) => img});*/
  text-align: center;

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
  font-size: 20%;
  text-align: center;
  color: ${themeColors.accent};
  text-shadow: 1px 0 0 grey;
`;

export const Text = styled.div``;
