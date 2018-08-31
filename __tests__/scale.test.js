import scale from '../src/events/scale'

const roundPayload = ({x, y, scaleX, scaleY}) => {
  const precision = 2
  return {
    x: x.toFixed(precision),
    y: y.toFixed(precision),
    scaleX:scaleX.toFixed(precision),
    scaleY: scaleY.toFixed(precision),
  }
}

it('scale tl',() => {
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
    scaleLimit:0.1,
    scaleFromCenter:false
  };

  scale('tl',state,(payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.14",
      scaleY: "1.00",
      x: "2.07",
      y: "-5.00",
    })
  })({
    pageX:-10,
    pageY:-10
  })

})


it('scale bl',() => {
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
    scaleLimit:0.1,
    scaleFromCenter:false
  };

  scale('bl',state,(payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.14",
      scaleY: "1.00",
      x: "2.07",
      y: "-5.00",
    })
  })({
    pageX:-10,
    pageY:-10
  })
})

it('scale ml',() => {
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
    scaleLimit:0.1,
    scaleFromCenter:false
  };

  scale('ml',state,(payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.21",
      scaleY: "1.00",
      x: "3.11",
      y: "-7.50",
    })
  })({
    pageX:-15,
    pageY:-15
  })
})


it('scale tr',() => {
  const state = {
    startX: 100,
    startY: 100,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    width: 100,
    height: 100,
    angle: 45,
    scaleLimit:0.1,
    scaleFromCenter:false
  };

  scale('tr',state,(payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.21",
      scaleY: "1.00",
      x: "18.11",
      y: "7.50",
    })
  })({
    pageX:100 + 15,
    pageY:100 + 15
  })
})


it('scale tm',() => {
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
    scaleLimit:0.1,
    scaleFromCenter:false
  };

  scale('tm',state,(payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.00",
      scaleY: "1.11",
      x: "3.75",
      y: "1.55",
    })
  })({
    pageX:0,
    pageY:-15
  })
})


it('scale bm',() => {
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
    scaleLimit:0.1,
    scaleFromCenter:false
  };

  scale('bm',state,(payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.00",
      scaleY: "1.11",
      x: "-3.75",
      y: "9.05",
    })
  })({
    pageX:0,
    pageY:15
  })
})


it('scale br',() => {
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
    scaleLimit:0.1,
    scaleFromCenter:false
  };

  scale('br',state,(payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.21",
      scaleY: "1.00",
      x: "18.11",
      y: "7.50",
    })
  })({
    pageX:15,
    pageY:15
  })
})

it('scale mr',() => {
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
    scaleLimit:0.1,
    scaleFromCenter:false
  };

  scale('mr',state,(payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.21",
      scaleY: "1.00",
      x: "18.11",
      y: "7.50",
    })
  })({
    pageX:15,
    pageY:15
  })
})
