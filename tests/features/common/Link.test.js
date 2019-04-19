import React from 'react';
import Link from './Link';
import renderer from 'react-test-renderer';

describe('../link', () => {
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
});