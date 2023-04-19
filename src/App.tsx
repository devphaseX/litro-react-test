import { useEffect, useState } from 'react';

declare global {
  interface ImportMetaEnv {
    BACKEND_URL: string;
  }
}

import { Link } from './Link';
const App = () => {
  const [linkToken, setLinkToken] = useState(null);
  const generateToken = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/link_bank/create_link_token`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiYmFuamlkYW5pZWxAZ21haWwuY29tIiwiaWF0IjoxNjgxNDc0NTkzLCJleHAiOjE2ODE0ODE3OTN9.oHVmc-rsn-YENopA4dCK5LMId5kX9AJU2T3xlJpjGbg`,
        },
      }
    );
    const data = await response.json();
    setLinkToken(data.link_token);
  };
  useEffect(() => {
    generateToken();
  }, []);
  return linkToken != null ? <Link linkToken={linkToken} /> : <></>;
};

export default App;
