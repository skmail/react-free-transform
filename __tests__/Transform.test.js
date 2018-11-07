import React from 'react';
import ReactDOM from 'react-dom';
import Transform from '../src/index';
import Enzyme,{mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const testProps = {
  classPrefix: 'tr',
  width: 100,
  height: 100, 
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 0,
  scaleLimit: 0.1,
  angle: 0
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  const element = <Transform
    {...testProps}
    onUpdate={({x, y, scaleX, scaleY}) => {}}
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

  Transform.SCALE_HANDLE_PRESETS['all'].forEach((position) => {
    wrapper.find(`.tr-transform__scale-point--${position}`).simulate('mousedown');
    global.document.dispatchEvent(new Event('mousemove'));
    global.document.dispatchEvent(new Event('mouseup'));
  })

});

it('renders with basic events without crashing', () => {
  const div = document.createElement('div');
  const element = <Transform
    {...testProps}
    onUpdate={({x, y, scaleX, scaleY}) => {}}
    onTransformStart={(event) => {}}
    onTransformEnd={(event) => {}}
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

  Transform.SCALE_HANDLE_PRESETS['all'].forEach((position) => {
    wrapper.find(`.tr-transform__scale-point--${position}`).simulate('mousedown');
    global.document.dispatchEvent(new Event('mousemove'));
    global.document.dispatchEvent(new Event('mouseup'));
  })

});

it('renders with all events without crashing', () => {
  const div = document.createElement('div');
  const element = <Transform
    {...testProps}
    onTranslate={({x, y, scaleX, scaleY}) => {}}
    onRotate={({x, y, scaleX, scaleY}) => {}}
    onScale={({x, y, scaleX, scaleY}) => {}}
    onTranslateStart={(event) => {}}
    onRotateStart={(event) => {}}
    onScaleStart={(event) => {}}
    onTranslateEnd={(event) => {}}
    onRotateEnd={(event) => {}}
    onScaleEnd={(event) => {}}
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


  Transform.SCALE_HANDLE_PRESETS['all'].forEach((position) => {
    wrapper.find(`.tr-transform__scale-point--${position}`).simulate('mousedown');
    global.document.dispatchEvent(new Event('mousemove'));
    global.document.dispatchEvent(new Event('mouseup'));
  })

});

it('the number of handles using scaleHandles is correct', () => {

  const scaleHandles = ['tl', 'br', 'ml'];

  const div = document.createElement('div');
  const element = <Transform
    {...testProps}
    scaleHandles={scaleHandles}
  >
    <div/>
  </Transform>;

  ReactDOM.render(element, div);
  ReactDOM.unmountComponentAtNode(div);

  const wrapper = mount(element)

  Transform.SCALE_HANDLE_PRESETS['all'].forEach((position) => {
    let el = wrapper.find(`.tr-transform__scale-point--${position}`)
    expect(el.length).toBe(+scaleHandles.includes(position));
  })

});

it('can use scaleHandles presets correctly', () => {

  const scaleHandles = ['corners'];
  const expandedHandles = Transform.SCALE_HANDLE_PRESETS['corners']

  const div = document.createElement('div');
  const element = <Transform
    {...testProps}
    scaleHandles={scaleHandles}
  >
    <div/>
  </Transform>;

  ReactDOM.render(element, div);
  ReactDOM.unmountComponentAtNode(div);

  const wrapper = mount(element)

  Transform.SCALE_HANDLE_PRESETS['all'].forEach((position) => {
    let el = wrapper.find(`.tr-transform__scale-point--${position}`)
    expect(el.length).toBe(+expandedHandles.includes(position));
  })
});

it('rotation enable/disable working', () => {

  const div = document.createElement('div');

  for(let rotateEnabled of [false, true]) {
    let element = <Transform
      {...testProps}
      rotateEnabled={rotateEnabled}
    >
      <div/>
    </Transform>;

    ReactDOM.render(element, div);
    ReactDOM.unmountComponentAtNode(div);

    let wrapper = mount(element)
    
    let el = wrapper.find('.tr-transform__rotator')
    expect(el.length).toBe(+rotateEnabled);
  }

});

it('scale enable/disable working', () => {

  const div = document.createElement('div');

  for(let scaleEnabled of [false, true]) {
    let element = <Transform
      {...testProps}
      scaleEnabled={scaleEnabled}
    >
      <div/>
    </Transform>;

    ReactDOM.render(element, div);
    ReactDOM.unmountComponentAtNode(div);

    let wrapper = mount(element)
    
    let el = wrapper.find("[className*='tr-transform__scale-point--']")
    expect(el.length).toBe((+scaleEnabled) * Transform.defaultProps.scaleHandles.length);
  }

});

it("translation enable/disable didn't crash", () => {

  const div = document.createElement('div');
  const translateEnabled = false;

  let element = <Transform
    {...testProps}
    translateEnabled={translateEnabled}
  >
    <div/>
  </Transform>;

  ReactDOM.render(element, div);
  ReactDOM.unmountComponentAtNode(div);

  let wrapper = mount(element)

  wrapper.find('.tr-transform').simulate('mousedown');
  global.document.dispatchEvent(new Event('mousemove'));
  global.document.dispatchEvent(new Event('mouseup'));

});
