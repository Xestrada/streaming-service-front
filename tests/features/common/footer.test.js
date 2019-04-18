import React from 'react';
import  Footer  from '../../../src/features/common';


describe('common/footer', () => {
  it('renders correctly', () => {
    const renderedComponent = <Footer />;
    expect(renderedComponent).toMatchSnapshot();
  });
});
