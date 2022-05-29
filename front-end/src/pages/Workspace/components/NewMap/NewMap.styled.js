import { Button } from 'antd';
import styled from 'styled-components';

import { sizes, themeColors } from '../../../../styles/theme';

import { SearchInput } from '../../../Browse/Browse.styled';

export const Wrapper = styled.div`
  width: 100%;

  padding: 4rem 2rem 5rem;
`;
export const Container = styled.div`
  margin: auto;
  max-width: ${sizes.maxWidthContent}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 2rem;
`;
export const Title = styled.div`
  color: ${themeColors.default};
  text-shadow: 2px 2px 1px ${themeColors.accent};

  font-size: 2rem;
`;
export const InputContainer = styled.div`
  display: flex;
  justify-items: center;
  gap: 1.5rem;
  font-size: 4rem;
  flex-direction: column;
`;
export const InputName = styled(SearchInput)`
  max-width: 400px;
  margin: 0 auto;
`;
export const CreateButton = styled(Button)`
  max-width: 400px;
  margin: 0 auto;
  color: ${themeColors.light};
  font-weight: bold;
  text-shadow: 1px 1px 1px ${themeColors.accent};
`;
