import { useState } from 'react';

const useUser = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [userName, setUserName] = useState('kek');

  return { loggedIn, setLoggedIn, userName, setUserName };
};

export default useUser;
