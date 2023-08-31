import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ArticlesPage } from 'components/pages/articles-page';
import { ArticlePageWithRouter } from 'components/pages/article-page';
import { RegistrationPage } from 'components/pages/registration-page';
import { LogInPage } from 'components/pages/log-in-page';
import { ProfilePage } from 'components/pages/profile-page';
import { NewArticlePage } from 'components/pages/new-article-page';
import { linkPaths } from 'utilities/constants';
import { PrivateRoute } from 'components/utilities/private-route';
import { NotFoundPage } from 'components/pages/not-found-page';

import styles from './main.module.scss';

export const Main: React.FC = () => {
  const { pathToArticle, pathToArticles, pathToSignIn, pathToSignUp, pathToNewArticle, pathToProfile, pathToHome } =
    linkPaths;
  return (
    <main className={styles.main}>
      <Switch>
        <Route
          path={pathToHome}
          exact
          component={ArticlesPage}
        />
        <Route
          path={pathToArticles}
          exact
          component={ArticlesPage}
        />
        <Route
          path={pathToArticle}
          component={ArticlePageWithRouter}
        />
        <Route
          path={pathToSignIn}
          component={LogInPage}
        />
        <Route
          path={pathToSignUp}
          component={RegistrationPage}
        />
        <PrivateRoute
          path={pathToProfile}
          component={ProfilePage}
        />
        <PrivateRoute
          path={pathToNewArticle}
          component={NewArticlePage}
        />
        <Route render={NotFoundPage} />
      </Switch>
    </main>
  );
};
