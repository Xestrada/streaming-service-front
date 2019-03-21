import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/sub-init/DefaultPage';

describe('sub-init/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      subInit: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.sub-init-default-page').length
    ).toBe(1);
  });
});
