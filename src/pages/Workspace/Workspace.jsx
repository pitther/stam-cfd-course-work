import ContentSidebar from '../../components';

import Canvas from './components/Canvas';
import * as S from './Workspace.styled';

const workspaceMenuScheme = [];

const Workspace = () => (
  <ContentSidebar scheme={workspaceMenuScheme}>
    <S.Main>
      <Canvas />
    </S.Main>
  </ContentSidebar>
);

Workspace.propTypes = {};

export default Workspace;
