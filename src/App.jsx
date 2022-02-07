import ResponsibleSizeContext from './contexts/ResponsibleSize';
import useResponsibleSize from './hooks/UseResponsibleSize';
import Routes from './routes/Routes';

import 'antd/dist/antd.css';
import './styles/App.css';
import './styles/normalize.css';

function App() {
  const responsibleSize = useResponsibleSize();
  return (
    <ResponsibleSizeContext.Provider value={responsibleSize}>
      <Routes />
    </ResponsibleSizeContext.Provider>
  );
}

export default App;
