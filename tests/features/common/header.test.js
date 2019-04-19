import React from 'react';
import {renderer} from 'react-test-renderer';
import {Header} from '../../../src/features/common';

 

describe('common/header', () => {
  it('renders correctly', () => {
    const renderedComponent =renderer
    .create(<Header />)
    .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
