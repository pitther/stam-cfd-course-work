import { Breadcrumb } from 'antd';

import {
  AntdBreadcrumb,
  MainContentLayout,
} from '../../components/Layout/Layout.styled';

const Profile = () => (
  <>
    <AntdBreadcrumb>
      <Breadcrumb.Item>Users</Breadcrumb.Item>
      <Breadcrumb.Item>Zhaba1945</Breadcrumb.Item>
    </AntdBreadcrumb>
    <MainContentLayout>Your profile</MainContentLayout>
  </>
);

Profile.propTypes = {};

export default Profile;
