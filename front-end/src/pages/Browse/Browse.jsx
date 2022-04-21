import { Breadcrumb } from 'antd';
import { useContext, useEffect } from 'react';

import LayoutContext from '../../contexts/LayoutContext';
import { BROWSE } from '../../routes/paths';

import {
  AntdBreadcrumb,
  MainContentLayout,
} from '../../components/Layout/Layout.styled';
import * as S from './Browse.styled';

const Browse = () => {
  const { setCurrentTab } = useContext(LayoutContext);
  useEffect(() => {
    setCurrentTab(BROWSE);
  }, [setCurrentTab]);

  const handleSearch = (value) => {
    console.log(value);
  };

  return (
    <>
      <AntdBreadcrumb>
        <Breadcrumb.Item>Browse</Breadcrumb.Item>
      </AntdBreadcrumb>
      <MainContentLayout>
        <S.ContentBox>
          <S.SearchInput placeholder="Search" onChange={handleSearch} />
        </S.ContentBox>
      </MainContentLayout>
    </>
  );
};

Browse.propTypes = {};

export default Browse;
