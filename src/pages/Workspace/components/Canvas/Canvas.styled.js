import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  max-height: 800px;
  max-width: 800px;

  & > canvas {
  }
`;
