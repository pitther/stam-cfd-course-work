import { Button } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import background from '../../resources/images/background.png';
import * as paths from '../../routes/paths';

import * as S from './Home.styled';

const Home = () => {
  const { loggedIn } = useContext(UserContext);
  return (
    <S.Wrapper>
      <S.Container>
        <S.Block>
          <S.OverImage img={background}>
            <S.Title>
              ICFD <S.Subtitle>indoor computational fluid dynamics</S.Subtitle>
            </S.Title>
          </S.OverImage>

          <S.Text>
            based on{' '}
            <a
              target="_blank"
              href="http://graphics.cs.cmu.edu/nsp/course/15-464/Fall09/papers/StamFluidforGames.pdf"
              rel="noreferrer"
            >
              Jos Stams's PDF 'real-time fluid dynamics for games'
            </a>
          </S.Text>
        </S.Block>
        <S.Block>
          <Button type="primary" ghost size="large">
            <Link to={paths.LOGIN}>JOIN NOW</Link>
          </Button>
        </S.Block>
      </S.Container>
    </S.Wrapper>
  );
};

Home.propTypes = {};

export default Home;
