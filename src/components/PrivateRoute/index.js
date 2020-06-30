import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { appState } from '../../containers/App/atom';

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children, ...rest }) {
  const { auth } = useRecoilValue(appState);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
