import { Breadcrumb, Divider, Statistic } from 'antd';
import { useContext } from 'react';
import {
  ClockCircleOutlined,
  ReadOutlined,
  SmileOutlined,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import UserContext from '../../contexts/UserContext';

import {
  AntdBreadcrumb,
  MainContentLayout,
} from '../../components/Layout/Layout.styled';
import * as S from './Profile.styled';

const Profile = () => {
  const { userName } = useContext(UserContext);
  return (
    <>
      <AntdBreadcrumb>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
        <Breadcrumb.Item>Zhaba1945</Breadcrumb.Item>
      </AntdBreadcrumb>
      <MainContentLayout>
        <S.Profile title={userName} bordered={false}>
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
        </S.Profile>
      </MainContentLayout>
    </>
  );
};

Profile.propTypes = {};

export default Profile;
