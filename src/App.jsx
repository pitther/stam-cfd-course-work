import { ConfigProvider } from 'antd';

import ResponsibleSizeContext from './contexts/ResponsibleSize';
import useResponsibleSize from './hooks/UseResponsibleSize';
import Routes from './routes/Routes';
import { themeColors } from './styles/theme';
import { GlobalStyles } from './styles/Global.styled';

import 'antd/dist/antd.variable.min.css';
import './styles/normalize.css';

ConfigProvider.config({
  theme: {
    headingColor: 'red',
    linkColor: 'red',
    borderColorBase: 'red',
    textColor: 'red',
    primaryColor: themeColors.accent,
  },
});

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
