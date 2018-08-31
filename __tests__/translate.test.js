import translate from '../src/events/translate'

it("translate element", function () {
  const state = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    width: 100,
    height: 100,
    angle: 45,
    scaleLimit: 0.1,
  };
  translate(state, (payload) => {
    expect(payload).toEqual({
      x: 15,
      y: 15
    })
  })({
    pageX: 15,
    pageY: 15
  })
})