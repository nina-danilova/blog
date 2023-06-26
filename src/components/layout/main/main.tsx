import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ArticlesPage } from '../../pages/articles-page';
import { ArticlePage } from '../../pages/article-page';

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
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Router>
    </main>
  );
};

/* <Route
            path="/articles/:id"
            render={({ match }) => {
              const { id } = match.params;
              console.log(id);
              <ArticlePage />;
            }}
          /> */
