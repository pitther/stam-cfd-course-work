import useToolbar from './components/ToolPanel/UseToolbar';

const useWorkspace = () => {
  const toolbar = useToolbar();

  return { toolbar };
};

export default useWorkspace;
