import { useContext } from 'react';

import LayoutContext from '../../contexts/LayoutContext';
import { BROWSE } from '../../routes/paths';

import * as S from './Browse.styled';

const Browse = () => {
  const { setCurrentTab } = useContext(LayoutContext);
  setCurrentTab(BROWSE);

  return <S.Main>Browse works</S.Main>;
};

Browse.propTypes = {};

export default Browse;
