import React from 'react';

import { Header } from 'components/layout/header';
import { Main } from 'components/layout/main';
import { Footer } from 'components/layout/footer';

export const PageWrapper: React.FC = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};
