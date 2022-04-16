import { Button } from 'antd';
import { Link } from 'react-router-dom';

import logo from '../../resources/images/logo.png';
import * as paths from '../../routes/paths';

import * as S from './Home.styled';

const Home = () => (
  <S.Wrapper>
    <S.Container>
      <img src={logo} alt="" />
      <Button type="primary" ghost size="large">
        <Link to={paths.LOGIN}>JOIN NOW</Link>
      </Button>
    </S.Container>
  </S.Wrapper>
);

Home.propTypes = {};

export default Home;
