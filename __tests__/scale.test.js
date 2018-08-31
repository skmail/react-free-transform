import scale from '../src/events/scale'

const roundPayload = ({x, y, scaleX, scaleY}) => {
  const precision = 2
  return {
    x: x.toFixed(precision),
    y: y.toFixed(precision),
    scaleX: scaleX.toFixed(precision),
    scaleY: scaleY.toFixed(precision),
  }
}

it('scale tl', () => {
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
    scaleFromCenter: false
  };

  scale('tl', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.14",
      scaleY: "1.00",
      x: "2.07",
      y: "-5.00",
    })
  })({
    pageX: -10,
    pageY: -10
  })

})


it('scale tl from center', () => {
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
    scaleFromCenter: true
  };

  scale('tl', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.28",
      scaleY: "1.00",
      x: "14.14",
      y: "0.00",
    })
  })({
    pageX: -10,
    pageY: -10,
    altKey: true
  })

})
// same to release resizing from centers/
// point position will be reset
it('scale tl, activate from center while resizing', () => {
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
    scaleFromCenter: false
  };

  scale('tl', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.00",
      scaleY: "1.00",
      x: "0.00",
      y: "0.00",
    })
  })({
    pageX: -10,
    pageY: -10,
    altKey: true
  })

})

// reset startX and startY since there are no multiple movements allowed in test
// element will not resized, but resetting position proofed

it('scale tl with release shift while resizing', () => {
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
    scaleFromCenter: true
  };
  scale('tl', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.00",
      scaleY: "1.00",
      x: "0.00",
      y: "0.00",
    })
  })({
    pageX: -10,
    pageY: -10,
    altKey:false
  })
})

it('scale tl from with aspect ratio', () => {
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
    scaleFromCenter: false,
    aspectRatio: true
  };

  scale('tl', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.14",
      scaleY: "1.14",
      x: "7.07",
      y: "-2.93",
    })
  })({
    pageX: -10,
    pageY: -10,
    shiftKey: true
  })

})



it('scale tl  with disable aspect ratio while resizing', () => {
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
    scaleFromCenter: false,
    aspectRatio: true
  };

  scale('tl', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.14",
      scaleY: "1.00",
      x: "2.07",
      y: "-5.00",
    })
  })({
    pageX: -10,
    pageY: -10,
    shiftKey: false
  })

})


it('scale tl from with enable aspect ratio on resizing', () => {
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
    scaleFromCenter: false,
    aspectRatio: false
  };

  scale('tl', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.14",
      scaleY: "1.14",
      x: "7.07",
      y: "-2.93",
    })
  })({
    pageX: -10,
    pageY: -10,
    shiftKey: true
  })

})


it('scale tl from center with aspect ratio', () => {
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
    scaleFromCenter: true,
    aspectRatio: true
  };

  scale('tl', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.28",
      scaleY: "1.28",
      x: "14.14",
      y: "14.14",
    })
  })({
    pageX: -10,
    pageY: -10,
    altKey: true,
    shiftKey: true
  })
})

it('scale bl', () => {
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
    scaleFromCenter: false
  };

  scale('bl', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.14",
      scaleY: "1.00",
      x: "2.07",
      y: "-5.00",
    })
  })({
    pageX: -10,
    pageY: -10
  })
})

it('scale ml', () => {
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
    scaleFromCenter: false
  };

  scale('ml', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.21",
      scaleY: "1.00",
      x: "3.11",
      y: "-7.50",
    })
  })({
    pageX: -15,
    pageY: -15
  })
})

it('scale ml with aspect ratio', () => {
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
    aspectRatio: true
  };

  scale('ml', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.21",
      scaleY: "1.21",
      x: "3.11",
      y: "3.11",
    })
  })({
    pageX: -15,
    pageY: -15,
    shiftKey: true
  })
})


it('scale tr', () => {
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
    scaleLimit: 0.1,
    scaleFromCenter: false
  };

  scale('tr', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.21",
      scaleY: "1.00",
      x: "18.11",
      y: "7.50",
    })
  })({
    pageX: 100 + 15,
    pageY: 100 + 15
  })
})


it('scale tm', () => {
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
    scaleFromCenter: false
  };

  scale('tm', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.00",
      scaleY: "1.11",
      x: "3.75",
      y: "1.55",
    })
  })({
    pageX: 0,
    pageY: -15
  })
})


it('scale tm with aspect ratio', () => {
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
    aspectRatio: true
  };

  scale('tm', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.11",
      scaleY: "1.11",
      x: "9.05",
      y: "1.55",
    })
  })({
    pageX: 0,
    pageY: -15,
    shiftKey: true
  })
})


it('scale bm', () => {
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
    scaleFromCenter: false
  };

  scale('bm', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.00",
      scaleY: "1.11",
      x: "-3.75",
      y: "9.05",
    })
  })({
    pageX: 0,
    pageY: 15
  })
})


it('scale bm with aspect ratio', () => {
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
    aspectRatio: true
  };

  scale('bm', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.11",
      scaleY: "1.11",
      x: "1.55",
      y: "9.05",
    })
  })({
    pageX: 0,
    pageY: 15,
    shiftKey: true
  })
})


it('scale br', () => {
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
    scaleFromCenter: false
  };

  scale('br', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.21",
      scaleY: "1.00",
      x: "18.11",
      y: "7.50",
    })
  })({
    pageX: 15,
    pageY: 15
  })
})

it('scale mr', () => {
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
    scaleFromCenter: false
  };

  scale('mr', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.21",
      scaleY: "1.00",
      x: "18.11",
      y: "7.50",
    })
  })({
    pageX: 15,
    pageY: 15,

  })
})


it('scale mr with aspect ratio', () => {
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
    aspectRatio: true
  };

  scale('mr', state, (payload) => {
    expect(roundPayload(payload)).toEqual({
      scaleX: "1.21",
      scaleY: "1.21",
      x: "18.11",
      y: "18.11",
    })
  })({
    pageX: 15,
    pageY: 15,
    shiftKey: true
  })
})

