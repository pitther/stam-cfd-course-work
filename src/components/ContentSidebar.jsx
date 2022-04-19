import { Menu } from 'antd';
import { FaFan, GiDoor, GiWindow, MdOutlineAir } from 'react-icons/all';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';

import * as S from './ContentSidebar.styled';

const { SubMenu } = Menu;

const ContentSidebar = ({ children }) => (
  <>
    <S.SiderMenuWrapper>
      <S.AntdSiderMenu mode="inline">
        <SubMenu key="sub1" icon={<UserOutlined />} title="Environment">
          <S.MenuItem key="1">Wind force</S.MenuItem>
          <S.MenuItem key="2">Wind direction</S.MenuItem>
        </SubMenu>
        <SubMenu key="sub2" icon={<LaptopOutlined />} title="Objects">
          <S.MenuItem key="5">
            <GiDoor />
            Door
          </S.MenuItem>
          <S.MenuItem key="6">
            <GiWindow /> Window
          </S.MenuItem>
          <S.MenuItem key="7">
            <MdOutlineAir />
            Went
          </S.MenuItem>
          <S.MenuItem key="8">
            <FaFan />
            Fan
          </S.MenuItem>
        </SubMenu>
        <SubMenu key="sub3" icon={<NotificationOutlined />} title="Forces">
          <S.MenuItem key="9">option9</S.MenuItem>
          <S.MenuItem key="10">option10</S.MenuItem>
          <S.MenuItem key="11">option11</S.MenuItem>
          <S.MenuItem key="12">option12</S.MenuItem>
        </SubMenu>
      </S.AntdSiderMenu>
      <S.AntdContent>
        <div>{children}</div>
      </S.AntdContent>
    </S.SiderMenuWrapper>
  </>
);

ContentSidebar.propTypes = {};

export default ContentSidebar;
