import { InputNumber, Layout } from 'antd';
import styled from 'styled-components';

const COLLAPSE_BREAKPOINT = 800;

const { Content } = Layout;

export const SiderMenuWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;

  @media (max-width: ${COLLAPSE_BREAKPOINT}px) {
    flex-direction: column;
  }
`;

export const AntdContent = styled(Content)`
  height: 100%;
  padding: 0 0 1rem 0;
  min-height: 280px;

  text-align: center;
`;

export const SettingsInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 1rem;
`;
export const SettingsInputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
export const SettingsInput = styled(InputNumber)`
  font-weight: bold;
`;
export const SettingsInputLabel = styled.div``;
