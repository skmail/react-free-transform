import rotate from '../src/events/rotate'

const roundPayload = ({angle}) => {
  return {
    angle:Math.round(angle)
  }
}


it("rotate element", function () {
  const state = {
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    width: 100,
    height: 100,
    angle: 0,
    scaleLimit: 0.1,
  };
  rotate(state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      angle:84,
    })
  })({
    pageX: 90,
    pageY: 0
  })
})


it("rotate element with shift key", function () {
  const state = {
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    width: 100,
    height: 100,
    angle: 0,
    scaleLimit: 0.1,
  };
  rotate(state, (payload) => {
    expect(payload).toEqual({
      angle: 75
    })
  })({
    pageX: 90,
    pageY: 0,
    shiftKey:true
  })
})