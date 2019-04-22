import React from 'react';
import {shallow} from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Header  from '../../../src/features/common/header';

describe('common/header', () => {
  it('renders correctly', () => {
    const renderedComponent = shallow( <Header />);
    expect(renderedComponent.find('mr-auto').length).toBe(0);
  });
  it("check counter increment function is callled", () => {
    const component = shallow(<Header />);
    const spy = jest.spyOn(component.instance(), "myClickFn");
    wrapper.find('color-me brand').simulate("click");
    expect(spy).toBeCalled();
  });
});

