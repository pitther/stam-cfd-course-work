import styled from 'styled-components';

import { Title } from '../Workspace/components/NewMap/NewMap.styled';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  text-align: center;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  margin: 2rem;
`;

export const Header = styled(Title)`
  font-size: 7rem;
`;

export const Subtitle = styled.div`
  font-size: 1.5rem;
`;
