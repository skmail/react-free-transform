import React from 'react';
import ReactDOM from 'react-dom';
import Transform from '../src/index';
import Enzyme,{mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  const element = <Transform
    classPrefix="tr"
    width={100}
    height={100}
    x={0}
    y={0}
    scaleX={1}
    scaleY={0}
    scaleLimit={0.1}
    angle={0}
    onUpdate={() => {}}
  >
    <div/>
  </Transform>;

  ReactDOM.render(element, div);
  ReactDOM.unmountComponentAtNode(div);

  const wrapper = mount(element)

  wrapper.find('.tr-transform').simulate('mousedown');
  global.document.dispatchEvent(new Event('mousemove'));
  global.document.dispatchEvent(new Event('mouseup'));


  wrapper.find('.tr-transform__rotator').simulate('mousedown');
  global.document.dispatchEvent(new Event('mousemove'));
  global.document.dispatchEvent(new Event('mouseup'));


  wrapper.find('.tr-transform__scale-point--tl').simulate('mousedown');
  global.document.dispatchEvent(new Event('mousemove'));
  global.document.dispatchEvent(new Event('mouseup'));


  wrapper.find('.tr-transform__scale-point--ml').simulate('mousedown');
  global.document.dispatchEvent(new Event('mousemove'));
  global.document.dispatchEvent(new Event('mouseup'));

  wrapper.find('.tr-transform__scale-point--tr').simulate('mousedown');
  global.document.dispatchEvent(new Event('mousemove'));
  global.document.dispatchEvent(new Event('mouseup'));

  wrapper.find('.tr-transform__scale-point--tm').simulate('mousedown');
  global.document.dispatchEvent(new Event('mousemove'));
  global.document.dispatchEvent(new Event('mouseup'));

  wrapper.find('.tr-transform__scale-point--mr').simulate('mousedown');
  global.document.dispatchEvent(new Event('mousemove'));
  global.document.dispatchEvent(new Event('mouseup'));

  wrapper.find('.tr-transform__scale-point--bl').simulate('mousedown');
  global.document.dispatchEvent(new Event('mousemove'));
  global.document.dispatchEvent(new Event('mouseup'));

  wrapper.find('.tr-transform__scale-point--bm').simulate('mousedown');
  global.document.dispatchEvent(new Event('mousemove'));
  global.document.dispatchEvent(new Event('mouseup'));

  wrapper.find('.tr-transform__scale-point--br').simulate('mousedown');
  global.document.dispatchEvent(new Event('mousemove'));
  global.document.dispatchEvent(new Event('mouseup'));

});
