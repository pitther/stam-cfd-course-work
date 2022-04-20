import { Breadcrumb, Divider, Statistic } from 'antd';
import { useContext } from 'react';
import { HiOutlineStatusOffline, HiOutlineStatusOnline } from 'react-icons/all';
import {
  ClockCircleOutlined,
  ReadOutlined,
  SmileOutlined,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import LayoutContext from '../../contexts/LayoutContext';
import UserContext from '../../contexts/UserContext';
import { PROFILE } from '../../routes/paths';
import { themeColors } from '../../styles/theme';

import {
  AntdBreadcrumb,
  MainContentLayout,
} from '../../components/Layout/Layout.styled';
import * as S from './Profile.styled';

const Profile = () => {
  const { userName } = useContext(UserContext);
  const { setCurrentTab } = useContext(LayoutContext);
  const isUserOnline = true;
  setCurrentTab(PROFILE);
  return (
    <>
      <AntdBreadcrumb>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
        <Breadcrumb.Item>{userName}</Breadcrumb.Item>
      </AntdBreadcrumb>
      <MainContentLayout>
        <S.ContentBox>
          <S.ContentHeader>
            <S.ProfileName>
              {userName}
              <S.ProfileOnlineStatusIcon>
                {isUserOnline ? (
                  <sup>
                    <HiOutlineStatusOnline color={themeColors.header} />
                  </sup>
                ) : (
                  <sup>
                    <HiOutlineStatusOffline color={themeColors.accentLight} />
                  </sup>
                )}
              </S.ProfileOnlineStatusIcon>
            </S.ProfileName>
            <S.ProfileOnlineStatus online={isUserOnline}>
              {isUserOnline ? (
                <S.ProfileOnlineStatusText>online</S.ProfileOnlineStatusText>
              ) : (
                <S.ProfileOnlineStatusText>offline</S.ProfileOnlineStatusText>
              )}
            </S.ProfileOnlineStatus>
          </S.ContentHeader>

          <S.StatsContainer>
            <Statistic
              title="Stars total"
              value={93}
              prefix={<StarOutlined />}
            />
            <Statistic title="Friends" value={93} prefix={<SmileOutlined />} />
            <Statistic title="Projects" value={50} prefix={<ReadOutlined />} />
            <Statistic
              title="Collective projects"
              value={93}
              prefix={<TeamOutlined />}
            />
            <Statistic
              title="Days with ICFD"
              value={93}
              prefix={<ClockCircleOutlined />}
            />
          </S.StatsContainer>
          <Divider>Your maps</Divider>
          <p>Card content</p>
          <p>Card content</p>

          <Divider>Danger zone</Divider>
        </S.ContentBox>
      </MainContentLayout>
    </>
  );
};

Profile.propTypes = {};

export default Profile;
