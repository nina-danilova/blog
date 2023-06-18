import React from 'react';

import { Header } from '../header';
import { Main } from '../main';
import { Footer } from '../footer';

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
