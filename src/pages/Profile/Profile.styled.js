import { Card } from 'antd';
import styled from 'styled-components';

export const Profile = styled(Card)`
  background: white;
  width: 100%;
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
