import styled from 'styled-components';

import { themeColors } from '../../styles/theme';

export const ContentBox = styled.div`
  background: white;
  width: 100%;
  padding: 2rem 2rem 2rem;
`;

export const ContentHeader = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
`;

export const ProfileName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ProfileOnlineStatus = styled.div`
  font-size: 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-items: center;
  color: ${({ online }) =>
    online ? themeColors.header : themeColors.accentLight};
`;

export const ProfileOnlineStatusText = styled.div`
  font-size: 0.9rem;
`;

export const ProfileOnlineStatusIcon = styled.div`
  font-size: 1.5rem;
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;

  & > * {
    min-width: 100px;
    float: left;
  }
`;
