
import React from 'react';
import { Rating } from '../../../src/features/common';

describe('common/rating', () => {
  it('return 1 star', () => {
    const renderedComponent = <Rating rating={'1'} />;
    expect(renderedComponent.props.rating).toBe('1');
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
