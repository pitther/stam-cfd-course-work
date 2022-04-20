import 'antd/dist/antd.less';

import ResponsibleSizeContext from './contexts/ResponsibleSize';
import UserContext from './contexts/UserContext';
import useResponsibleSize from './hooks/UseResponsibleSize';
import useUser from './hooks/UseUser';
import SiteRoutes from './routes/SiteRoutes';
import { GlobalStyles } from './styles/Global.styled';

import './styles/normalize.css';

function App() {
  const responsibleSize = useResponsibleSize();
  const user = useUser();
  return (
    <ResponsibleSizeContext.Provider value={responsibleSize}>
      <UserContext.Provider value={user}>
        <GlobalStyles />
        <SiteRoutes />
      </UserContext.Provider>
    </ResponsibleSizeContext.Provider>
  );
}

export default App;
