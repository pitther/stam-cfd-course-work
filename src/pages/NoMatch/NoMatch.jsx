import { useContext } from 'react';

import LayoutContext from '../../contexts/LayoutContext';

import * as S from './NoMatch.styled';

const NoMatch = () => {
  const { setCurrentTab } = useContext(LayoutContext);
  setCurrentTab(false);
  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>404</S.Title>
        <S.Subtitle>nothing here :(</S.Subtitle>
      </S.Container>
    </S.Wrapper>
  );
};

NoMatch.propTypes = {};

export default NoMatch;
