import './styles/App.less';

import ResponsibleSizeContext from './contexts/ResponsibleSize';
import useResponsibleSize from './hooks/UseResponsibleSize';
import Routes from './routes/Routes';
import { GlobalStyles } from './styles/Global.styled';

import './styles/normalize.css';

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
