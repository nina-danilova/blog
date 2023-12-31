import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { PageWrapper } from 'components/layout/page-wrapper';

import './app.module.scss';

export const App: React.FC = () => {
  return (
    <Router>
      <PageWrapper />
    </Router>
  );
};
