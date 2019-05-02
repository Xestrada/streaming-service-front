import React from 'react';
import {shallow} from 'enzyme';  
import Results  from '../../../src/features/common/results';

describe('common/results', () => {
  it('renders correctly', () => {

    const renderedComponent = shallow(<Results />);
    expect(renderedComponent.length).toBe(1);
  });
  });