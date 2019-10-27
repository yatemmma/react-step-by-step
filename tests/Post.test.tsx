import * as React from 'react'
import { shallow, configure } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16';
configure({ adapter: new EnzymeAdapter() });
//@ts-ignore
import Post from '../src/Post'

test('call postMessage with text after click button', () => {
    const postMessageSpy = jest.fn();
    
    const component = shallow(<Post postMessage={postMessageSpy} />);
    component.find('button').simulate('click');

    expect(postMessageSpy).toHaveBeenCalledTimes(1);
})
