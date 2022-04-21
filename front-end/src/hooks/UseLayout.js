import { useState } from 'react';

const useLayout = () => {
  const [currentTab, setCurrentTab] = useState(false);

  return { currentTab, setCurrentTab };
};

export default useLayout;
