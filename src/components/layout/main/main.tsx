import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ArticlesPage } from '../../pages/articles-page';
import { ArticlePage } from '../../pages/article-page';
import { RegistrationPage } from '../../pages/registration-page';
import { LogInPage } from '../../pages/log-in-page';

import styles from './main.module.scss';

export const Main = () => {
  return (
    <main className={styles.main}>
      <Router>
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
            path="/login"
            component={LogInPage}
          />
          <Route
            path="/registration"
            component={RegistrationPage}
          />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Router>
    </main>
  );
};
