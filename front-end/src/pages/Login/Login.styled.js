import styled from 'styled-components';

import { sizes } from '../../styles/theme';

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

export const Container = styled.div`
  width: 100%;
  padding: 1rem;
  text-align: center;
  display: grid;
  align-items: center;
  justify-items: center;
  flex-direction: column;

  grid-gap: 1rem;
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: ${sizes.maxWidthLogin}px;
`;

export const Header = styled.div`
  font-size: 1.5rem;
`;
