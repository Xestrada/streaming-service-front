import React from 'react';
import {mount} from 'enzyme';
import Footer  from '../../../src/features/common/footer';

describe('common/footer', () => {
  it('renders correctly', () => {
    const renderedComponent =mount(<Footer />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
