import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  background: black;
`;

export const Container = styled.div`
  width: 100%;
  aspect-ratio: 1;
  max-height: 800px;
  max-width: 800px;
  & > canvas {
  }
`;
