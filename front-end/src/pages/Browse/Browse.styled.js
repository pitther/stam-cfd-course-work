import { Input } from 'antd';
import styled from 'styled-components';

import { sizes, themeColors } from '../../styles/theme';

export const ContentBox = styled.div`
  width: 100%;
  max-width: ${sizes.maxWidthContent}px;
  background: white;
  margin: 0 auto;
  padding: 2rem 2rem 2rem;
`;

export const SearchInput = styled(Input)`
  color: ${themeColors.accent};
  font-weight: bold;
  background: white;

  &::placeholder {
    color: ${themeColors.accent};
  }
`;
