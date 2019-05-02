import React from 'react';
import {shallow} from 'enzyme';  
import {About}  from '../../../src/features/about';

describe('about', () => {
  it('renders correctly', () => {

    const renderedComponent = shallow(<About />);
    expect(renderedComponent.find({className:'aboutImage'}).props()).toEqual({
      "alt": "",
      "className": "aboutImage",
      "src": "https://i.imgur.com/h93RfrU.jpg",
    })
  });
  });