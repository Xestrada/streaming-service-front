
import React from 'react';
import { Provider } from 'react-redux'
import {shallow} from 'enzyme';
import  Rating  from '../../../src/features/common/rating';

describe('common/rating', () => {
  it('return 1 star', () => {
    const renderedComponent = shallow(<Provider store={store}><Rating rating={'1'}/></Provider>);
    console.log(renderedComponent.debug);
    expect(renderedComponent.find({className:'rating'}).props()).toEqual({
      children: <span className='fa fa-star checked'>&nbsp;</span>,
    })
  });
  it('return 2 stars', () => {
    const renderedComponent = <Rating rating={'2'} />;
    expect(renderedComponent.props.rating).toBe('2');
  });
  it('return 3 stars', () => {
    const renderedComponent = <Rating rating={'3'} />;
    expect(renderedComponent.props.rating).toBe('3');
  });
  it('return 4 stars', () => {
    const renderedComponent = <Rating rating={'4'} />;
    expect(renderedComponent.props.rating).toBe('4');
  });
  it('return 5 stars', () => {
    const renderedComponent = <Rating rating={'5'} />;
    expect(renderedComponent.props.rating).toBe('5');
  });
});
