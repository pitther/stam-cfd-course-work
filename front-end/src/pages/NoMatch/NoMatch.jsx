import * as S from './NoMatch.styled';

const NoMatch = () => (
  <S.Wrapper>
    <S.Container>
      <S.Header>404</S.Header>
      <S.Subtitle>nothing here :(</S.Subtitle>
    </S.Container>
  </S.Wrapper>
);

NoMatch.propTypes = {};

export default NoMatch;
