import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ArticlesPage } from 'components/pages/articles-page';
import { ArticlePageWithRouter } from 'components/pages/article-page';
import { RegistrationPage } from 'components/pages/registration-page';
import { LogInPage } from 'components/pages/log-in-page';
import { ProfilePage } from 'components/pages/profile-page';
import { NewArticlePage } from 'components/pages/new-article-page';

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
          component={ArticlePageWithRouter}
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
        <Route
          path="/new-article"
          component={NewArticlePage}
        />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </main>
  );
};
