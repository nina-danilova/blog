import React from 'react';

import { Header } from 'components/layout/header';
import { Main } from 'components/layout/main';
import { Footer } from 'components/layout/footer';

import './page-wrapper.module.scss';

export const PageWrapper = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};
