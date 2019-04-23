import React from 'react';
import {shallow} from 'enzyme';
import {About}  from '../../../src/features/about';

describe('common/footer', () => {
  it('renders correctly', () => {

    const renderedComponent = shallow(<About />);
    expect(renderedComponent.length).toBe(1);
  });
  });