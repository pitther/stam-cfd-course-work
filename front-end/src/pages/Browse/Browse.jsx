import { message, Spin } from 'antd';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import LayoutContext from '../../contexts/LayoutContext';
import useData from '../../hooks/UseData';
import * as paths from '../../routes/paths';
import { BROWSE } from '../../routes/paths';

import { MainContentLayout } from '../../components/Layout/Layout.styled';
import * as S from './Browse.styled';

const Browse = () => {
  const { setCurrentTab } = useContext(LayoutContext);
  const [maps, setMaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryMaps, setQueryMaps] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { getAllMaps } = useData(LayoutContext);
  useEffect(() => {
    setCurrentTab(BROWSE);
  }, [setCurrentTab]);

  const getNeededMaps = useCallback(
    () =>
      maps.filter(({ name }) => name.toUpperCase().indexOf(searchQuery) > -1),
    [maps, searchQuery],
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toString().toUpperCase());
    setQueryMaps(getNeededMaps);
  };

  useEffect(() => {
    setQueryMaps(getNeededMaps);
  }, [getNeededMaps, maps]);

  useEffect(() => {
    getAllMaps().then((res) => {
      if (res.maps) {
        setMaps(res.maps);
      } else {
        message.error('Error loading maps');
      }
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MainContentLayout>
        <S.ContentBox>
          <S.SearchInput
            value={searchQuery}
            placeholder="Search by name"
            onChange={handleSearch}
          />

          <S.MapsContainer>
            {isLoading && <Spin />}
            {!isLoading &&
              queryMaps.map(({ id, name, resolution, viscosity, diffuse }) => (
                <Link to={`${paths.WORKSPACE}/${id}`} key={id}>
                  <S.MapCard>
                    <S.Name>{name}</S.Name>
                    <S.Resolution>
                      RES: {resolution}x{resolution}
                    </S.Resolution>
                    <S.Viscosity>VISC: {viscosity}</S.Viscosity>
                    <S.Diffusion>DIFF: {diffuse}</S.Diffusion>
                    <S.Id>ID: {id}</S.Id>
                  </S.MapCard>
                </Link>
              ))}
            {!isLoading && !queryMaps.length && <S.Name>No results</S.Name>}
          </S.MapsContainer>
        </S.ContentBox>
      </MainContentLayout>
    </>
  );
};

Browse.propTypes = {};

export default Browse;
