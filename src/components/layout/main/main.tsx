import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ArticlesPage } from '../../pages/articles-page';
import { ArticlePage } from '../../pages/article-page';
import { RegistrationPage } from '../../pages/registration-page';
import { LogInPage } from '../../pages/log-in-page';
import { ProfilePage } from '../../pages/profile-page';

import styles from './main.module.scss';

export const Main = () => {
  return (
    <main className={styles.main}>
      <Switch>
        <Route
          path="/"
          exact
          component={ArticlesPage}
        />
        <Route
          path="/articles/"
          exact
          component={ArticlesPage}
        />
        <Route
          path="/articles/:id"
          component={ArticlePage}
        />
        <Route
          path="/sign-in"
          component={LogInPage}
        />
        <Route
          path="/sign-up"
          component={RegistrationPage}
        />
        <Route
          path="/profile"
          component={ProfilePage}
        />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </main>
  );
};
