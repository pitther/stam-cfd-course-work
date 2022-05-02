import { useEffect, useState } from 'react';

import useToolbar from './UseToolbar.jsx';

const useWorkspace = () => {
  const toolbar = useToolbar();
  const [simulationStop, setSimulationStop] = useState(true);

  useEffect(() => {
    if (toolbar.toggledToolName === 'START') {
      setSimulationStop(false);
    }
    if (toolbar.toggledToolName === 'STOP') {
      setSimulationStop(true);
    }
  }, [toolbar.toggledToolName]);

  return { simulationStop, setSimulationStop, toolbar };
};

export default useWorkspace;
