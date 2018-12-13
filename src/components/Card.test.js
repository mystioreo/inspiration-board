import React from 'react';
import Card from './Card';
import { shallow } from 'enzyme';


describe('card', () => {
  it('will match the Card Snapshot', () => {
    const wrapper = shallow( <Card
                                id={1}
                                text="You Complete Me"
                                emoji="smile"
                                /> );

    expect(wrapper).toMatchSnapshot();
  })
});
