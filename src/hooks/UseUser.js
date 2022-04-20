import { useState } from 'react';

const useUser = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Zhaba1945');

  return { loggedIn, setLoggedIn, userName, setUserName };
};

export default useUser;
