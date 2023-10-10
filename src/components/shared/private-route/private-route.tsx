import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAppSelector } from 'hooks/hooks';
import { linkPaths } from 'utilities/constants';

type PrivateRouteProps = {
  component;
  path: string;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component, path }) => {
  const { pathToSignIn } = linkPaths;
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);
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
