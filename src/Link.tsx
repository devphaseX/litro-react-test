// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import React from 'react';
import { PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';

interface LinkProps {
  linkToken: string | null;
}
const Link: React.FC<LinkProps> = (props: LinkProps) => {
  const onSuccess: PlaidLinkOptions['onSuccess'] = React.useCallback(
    async (public_token, metadata) => {
      // send public_token to server
      console.log({ public_token });
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/link_bank/set_access_token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiYmFuamlkYW5pZWxAZ21haWwuY29tIiwiaWF0IjoxNjgxNDc0NTkzLCJleHAiOjE2ODE0ODE3OTN9.oHVmc-rsn-YENopA4dCK5LMId5kX9AJU2T3xlJpjGbg`,
          },
          body: JSON.stringify({ public_token }),
        }
      );

      console.log(response.ok);
      // Handle response ...
    },
    []
  );
  const config: PlaidLinkOptions = {
    token: props.linkToken!,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);
  return (
    <button onClick={() => open()} disabled={!ready}>
      Link account
    </button>
  );
};

export { Link };
