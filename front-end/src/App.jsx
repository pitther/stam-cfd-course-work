import 'antd/dist/antd.less';

import LayoutContext from './contexts/LayoutContext';
import ResponsibleSizeContext from './contexts/ResponsibleSize';
import UserContext from './contexts/UserContext';
import useLayout from './hooks/UseLayout';
import useUser from './hooks/UseUser';
import useResponsibleSize from './pages/Workspace/components/Canvas/hooks/UseResponsibleSize';
import SiteRoutes from './routes/SiteRoutes';
import { GlobalStyles } from './styles/Global.styled';

import './styles/normalize.css';

function App() {
  const responsibleSize = useResponsibleSize();
  const layout = useLayout();
  const user = useUser();
  return (
    <LayoutContext.Provider value={layout}>
      <ResponsibleSizeContext.Provider value={responsibleSize}>
        <UserContext.Provider value={user}>
          <GlobalStyles />
          <SiteRoutes />
        </UserContext.Provider>
      </ResponsibleSizeContext.Provider>
    </LayoutContext.Provider>
  );
}

export default App;
