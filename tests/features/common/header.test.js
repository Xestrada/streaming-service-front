import React from 'react';
import { Header } from '../../../src/features/common';


describe('common/header', () => {
  it('renders correctly', () => {
    const renderedComponent =<Header />;
    expect(renderedComponent).toMatchSnapshot();
  });
});
