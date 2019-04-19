import React from 'react';
import renderer from 'react-test-renderer';
import { Footer}  from '../../../src/features/common';


describe('common/footer', () => {
  it('renders correctly', () => {
    const renderedComponent =renderer
    .create(<Footer />)
    .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
