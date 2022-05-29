import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;

  height: 100%;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  aspect-ratio: 1;
  max-height: 600px;
  max-width: 600px;

  & > canvas {
  }
`;
