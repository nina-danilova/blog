import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'redux-toolkit/index';
import { linkPaths } from 'utilities/constants';

export const PrivateRoute = ({ component, path }) => {
  const { pathToSignIn } = linkPaths;
  const isAuthorized = useSelector((state: RootState) => state.user.authorized);
  if (isAuthorized) {
    return (
      <Route
        path={path}
        component={component}
      />
    );
  }
  return <Redirect to={{ pathname: pathToSignIn }} />;
};
