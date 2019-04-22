import React from 'react';
import {shallow} from 'enzyme';
import Footer  from '../../../src/features/common/footer';

describe('common/footer', () => {
  it('renders correctly', () => {
    const renderedComponent = shallow(<Footer />);
    expect(renderedComponent.find('dark').length).toBe(0);
  });
    it("check counter increment function is callled", () => {
      const component = shallow(<Footer />);
      const spy = jest.spyOn(component.instance(), "myClickFn");
      wrapper.find('dark').simulate("click");
      expect(spy).toBeCalled();
    });
  });
