import { Input } from 'antd';
import styled from 'styled-components';

import { sizes, themeColors } from '../../styles/theme';

export const ContentBox = styled.div`
  width: 100%;
  max-width: ${sizes.maxWidthContent}px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 auto;
  padding: 2rem 2rem 2rem;
`;

export const SearchInput = styled(Input)`
  color: ${themeColors.accent};
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  background: transparent;
  height: 50px;

  &::placeholder {
    color: ${themeColors.accent};
  }
`;

export const MapsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 1rem;

  & > * {
    flex: 1;
  }
`;

export const MapCard = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid ${themeColors.border};
  cursor: pointer;
  flex-direction: column;
  text-align: left;
  padding: 1rem;
  background: ${themeColors.header};

  &:hover {
    border: 1px solid ${themeColors.accent};
  }
`;

export const Name = styled.div`
  font-size: 16px;
  text-align: center;
  padding-bottom: 1rem;
`;
export const Resolution = styled.div`
  font-size: 12px;
  font-weight: normal;
  text-align: left;
`;
export const Viscosity = styled(Resolution)``;
export const Diffusion = styled(Resolution)``;
export const Id = styled(Resolution)`
  overflow: hidden;
  text-overflow: ellipsis;
`;
