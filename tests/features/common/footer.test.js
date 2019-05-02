import React from 'react';
import { shallow } from 'enzyme';
import facebook from '../../../src/images/facebooklogo.png';
import twitter from '../../../src/images/twitterlogo.jpg';
import googleplus from '../../../src/images/googlepluslogo.png';
import Footer from '../../../src/features/common/footer';

describe('common/footer', () => {
  it('renders correctly', () => {
    const renderedComponent = shallow(<Footer />);
    expect(renderedComponent.find('[className="dark"]').length).toBe(1);
  });
  it("renders correct text", () => {
    const component = shallow(<Footer />);
    expect(component.find('[className="relative"]').at(0).props().children).toBe(
      'Contact us at videovault.company48@gmail.com'
    );
    expect(component.find('Link').props().children).toBe(
      'Privacy Policy' 
    );
  });
  it("renders correct links", () => {
    const component = shallow(<Footer />);
    expect(component.find('Media').at(0).props().href).toBe(
      'https://facebook.com'
    );
    expect(component.find('Media').at(2).props().href).toBe(
      'https://twitter.com'
    );
    expect(component.find('Media').at(4).props().href).toBe(
      'https://google.com'
    );
    expect(component.find('Link').props().to).toBe(
      '/privacy'
    );
});
it("renders correct images", () => {
  const component = shallow(<Footer />);
  expect(component.find('Media').at(1).props().src).toBe(
    facebook
  );
  expect(component.find('Media').at(3).props().src).toBe(
    twitter
  );
  expect(component.find('Media').at(5).props().src).toBe(
    googleplus
  );
});
it("check counter increment function is callled", () => {
  const component = shallow(<Footer />);
  const spy = jest.spyOn(component.instance(), "toggle");
  component.update();
  const click=component.toggle();
  expect(spy).toBeCalled();
  expect(click).toBe(true);
});
});