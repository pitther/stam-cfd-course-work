import { Button } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import LayoutContext from '../../contexts/LayoutContext';
import UserContext from '../../contexts/UserContext';
import background from '../../resources/images/background.png';
import * as paths from '../../routes/paths';
import { HOME } from '../../routes/paths';

import * as S from './Home.styled';

const Home = () => {
  const { loggedIn } = useContext(UserContext);
  const { setCurrentTab } = useContext(LayoutContext);
  setCurrentTab(HOME);

  return (
    <S.Wrapper>
      <S.Container>
        <S.Block>
          <S.OverImage img={background}>
            <S.Title>
              ICFD <S.Subtitle>indoor computational fluid dynamics</S.Subtitle>
            </S.Title>
          </S.OverImage>
        </S.Block>
        <S.Block>
          <S.Text>
            based on{' '}
            <a
              target="_blank"
              href="http://graphics.cs.cmu.edu/nsp/course/15-464/Fall09/papers/StamFluidforGames.pdf"
              rel="noreferrer"
            >
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Jos Stams`s PDF 'real-time fluid dynamics for games'
            </a>
          </S.Text>
        </S.Block>
        {!loggedIn && (
          <S.Block>
            <Button type="primary" ghost size="large">
              <Link to={paths.LOGIN}>JOIN NOW</Link>
            </Button>
          </S.Block>
        )}
      </S.Container>
    </S.Wrapper>
  );
};

Home.propTypes = {};

export default Home;
