import { ConfigProvider } from 'antd';

import ResponsibleSizeContext from './contexts/ResponsibleSize';
import useResponsibleSize from './hooks/UseResponsibleSize';
import Routes from './routes/Routes';
import { themeColors } from './styles/theme';
import { GlobalStyles } from './styles/Global.styled';

import './styles/normalize.css';
import './styles/App.less';


function App() {
  const responsibleSize = useResponsibleSize();
  return (
    <ResponsibleSizeContext.Provider value={responsibleSize}>
      <GlobalStyles />
      <Routes />
    </ResponsibleSizeContext.Provider>
  );
}

export default App;
