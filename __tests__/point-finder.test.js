import {
  getTL,
  getTR,
  getBL,
  getBR,
  getMR,
  getBM,
  getTM,
  getML,
  getPoint,
  getCenter,
  getMovePoint,
  getSineCosine,
  getOppositePoint,
} from '../src/point-finder'

const roundPoint = ({x, y}) => {
  return {
    x: Math.round(x),
    y: Math.round(y),
  }
}
it('calculate the center of element', function () {
  expect(getCenter({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1
  })).toEqual({
    x: 50,
    y: 50
  })
});

it('calculate the center of scaled element', function () {
  expect(getCenter({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1.1,
    scaleY: 1.1
  })).toEqual({
    x: (100 + (100 - 100 * 1.1)) / 2,
    y: (100 + (100 - 100 * 1.1)) / 2,
  })
});

it('calculate the center of moved & scaled element', function () {
  expect(getCenter({
    x: 15,
    y: 15,
    width: 100,
    height: 100,
    scaleX: 1.1,
    scaleY: 1.1
  })).toEqual({
    x: 15 + (100 + (100 - 100 * 1.1)) / 2,
    y: 15 + (100 + (100 - 100 * 1.1)) / 2,
  })
});

it('calculate the position of top left point', function () {
  expect(getTL({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  })).toEqual({
    x: 0,
    y: 0
  })
});


it('calculate the position of top left point on scale', function () {
  expect(getTL({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1.1,
    scaleY: 1.1,
    angle: 0
  })).toEqual({
    x: 0,
    y: 0
  })
});

it('calculate the position of top left point on scale and rotation', function () {
  expect(roundPoint(getTL({
    x: 20,
    y: 20,
    width: 100,
    height: 100,
    scaleX: 1.1,
    scaleY: 1.1,
    angle: 90
  }))).toEqual({
    x: Math.round(20 + (100 + (100 - 100 * 1.1))),
    y: 20
  })
});


it('calculate the position of top right point', function () {
  expect(getTR({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  })).toEqual({
    x: 100,
    y: 0
  })
});


it('calculate the position of top right point on scale', function () {
  expect(roundPoint(getTR({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1.1,
    scaleY: 1.1,
    angle: 0
  }))).toEqual({
    x: Math.round((100 - (100 - 100 * 1.1))),
    y: 0
  })
});


it('calculate the position of top right on scale and rotation', function () {
  const x = 0;
  const y = 0;
  const scaleX = 1.1
  const scaleY = 1.1
  const width = 100
  const height = 100
  const angle = 90

  const center = getCenter({
    x,
    y,
    scaleX,
    scaleY,
    width,
    height
  })

  const rad = angle * (Math.PI / 180)

  const xx = x + (width * scaleX)
  const yy = y

  expect(roundPoint(getTR({
    x,
    y,
    width,
    height,
    scaleX,
    scaleY,
    angle
  }))).toEqual({
    x: Math.round(
      (xx - center.x) * Math.cos(rad) - (yy - center.y) * Math.sin(rad) + center.x,
    ),
    y: Math.round(
      (xx - center.x) * Math.sin(rad) + (yy - center.y) * Math.cos(rad) + center.y
    ),
  })
});


it('calculate the position of Left Bottom point', function () {
  expect(getBL({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  })).toEqual({
    x: 0,
    y: 100
  })
})

it('calculate the position of Left Bottom point on scale', function () {
  expect(roundPoint(getBL({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1.1,
    scaleY: 1.1,
    angle: 0
  }))).toEqual({
    x: 0,
    y: Math.round(20 + (100 + (100 - 100 * 1.1))),
  })
})

it('calculate the position of Left Bottom point on scale and angle', function () {

  const x = 0;
  const y = 0;
  const scaleX = 1.1
  const scaleY = 1.1
  const width = 100
  const height = 100
  const angle = 90

  const center = getCenter({
    x,
    y,
    scaleX,
    scaleY,
    width,
    height
  })

  const rad = angle * (Math.PI / 180)

  const yy = y + (height * scaleY);

  expect(roundPoint(getBL({
    x,
    y,
    width,
    height,
    scaleX,
    scaleY,
    angle
  }))).toEqual({
    x: Math.round(
      (x - center.x) * Math.cos(rad) - (yy - center.y) * Math.sin(rad) + center.x,
    ),
    y: Math.round(
      (x - center.x) * Math.sin(rad) + (yy - center.y) * Math.cos(rad) + center.y
    ),
  })
})

it('calculate the position of middle right point', function () {
  const x = 0;
  const y = 0;
  const scaleX = 1.1
  const scaleY = 1.1
  const width = 100
  const height = 100
  const angle = 90

  const center = getCenter({
    x,
    y,
    scaleX,
    scaleY,
    width,
    height
  })

  const rad = angle * (Math.PI / 180)

  const xx = x + (width * scaleX)
  const yy = y + (height * scaleY) / 2

  expect(roundPoint(getMR({
    x,
    y,
    width,
    height,
    scaleX,
    scaleY,
    angle
  }))).toEqual({
    x: Math.round(
      (xx - center.x) * Math.cos(rad) - (yy - center.y) * Math.sin(rad) + center.x,
    ),
    y: Math.round(
      (xx - center.x) * Math.sin(rad) + (yy - center.y) * Math.cos(rad) + center.y
    ),
  })

})

it('calculate the position of middle bottom point', function () {
  const x = 0;
  const y = 0;
  const scaleX = 1.1
  const scaleY = 1.1
  const width = 100
  const height = 100
  const angle = 90

  const center = getCenter({
    x,
    y,
    scaleX,
    scaleY,
    width,
    height
  })

  const rad = angle * (Math.PI / 180)

  const xx = x + (width * scaleX) / 2
  const yy = y + (height * scaleY)

  expect(roundPoint(getBM({
    x,
    y,
    width,
    height,
    scaleX,
    scaleY,
    angle
  }))).toEqual({
    x: Math.round(
      (xx - center.x) * Math.cos(rad) - (yy - center.y) * Math.sin(rad) + center.x,
    ),
    y: Math.round(
      (xx - center.x) * Math.sin(rad) + (yy - center.y) * Math.cos(rad) + center.y
    ),
  })
})

it('calculate the position of middle top point', function () {
  const x = 0;
  const y = 0;
  const scaleX = 1.1
  const scaleY = 1.1
  const width = 100
  const height = 100
  const angle = 90

  const center = getCenter({
    x,
    y,
    scaleX,
    scaleY,
    width,
    height
  })

  const rad = angle * (Math.PI / 180)

  const xx = x + (width * scaleX) / 2
  const yy = y

  expect(roundPoint(getTM({
    x,
    y,
    width,
    height,
    scaleX,
    scaleY,
    angle
  }))).toEqual({
    x: Math.round(
      (xx - center.x) * Math.cos(rad) - (yy - center.y) * Math.sin(rad) + center.x,
    ),
    y: Math.round(
      (xx - center.x) * Math.sin(rad) + (yy - center.y) * Math.cos(rad) + center.y
    ),
  })
})
it('calculate the position of middle left point', function () {
  const x = 0;
  const y = 0;
  const scaleX = 1.1
  const scaleY = 1.1
  const width = 100
  const height = 100
  const angle = 90

  const center = getCenter({
    x,
    y,
    scaleX,
    scaleY,
    width,
    height
  })

  const rad = angle * (Math.PI / 180)

  const xx = x
  const yy = y + (height * scaleY) / 2

  expect(roundPoint(getML({
    x,
    y,
    width,
    height,
    scaleX,
    scaleY,
    angle
  }))).toEqual({
    x: Math.round(
      (xx - center.x) * Math.cos(rad) - (yy - center.y) * Math.sin(rad) + center.x,
    ),
    y: Math.round(
      (xx - center.x) * Math.sin(rad) + (yy - center.y) * Math.cos(rad) + center.y
    ),
  })
})

it('calculate the position of bottom right point', function () {
  const x = 0;
  const y = 0;
  const scaleX = 1.1
  const scaleY = 1.1
  const width = 100
  const height = 100
  const angle = 90

  const center = getCenter({
    x,
    y,
    scaleX,
    scaleY,
    width,
    height
  })

  const rad = angle * (Math.PI / 180)

  const xx = x + width * scaleX
  const yy = y + height * scaleY

  expect(roundPoint(getBR({
    x,
    y,
    width,
    height,
    scaleX,
    scaleY,
    angle
  }))).toEqual({
    x: Math.round(
      (xx - center.x) * Math.cos(rad) - (yy - center.y) * Math.sin(rad) + center.x,
    ),
    y: Math.round(
      (xx - center.x) * Math.sin(rad) + (yy - center.y) * Math.cos(rad) + center.y
    ),
  })
})


it('the opposite of TL is BR', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1.1,
    scaleY: 1.1,
    angle: 90
  }
  expect(getOppositePoint('tl', props)).toEqual(getPoint('br', props))
})

it('the opposite of ML is MR', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1.1,
    scaleY: 1.1,
    angle: 90
  }
  expect(getOppositePoint('ml', props)).toEqual(getPoint('mr', props))
})

it('the opposite of TR is BL', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1.1,
    scaleY: 1.1,
    angle: 90
  }
  expect(getOppositePoint('tr', props)).toEqual(getPoint('bl', props))
})

it('the opposite of BM is TM', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1.1,
    scaleY: 1.1,
    angle: 90
  }
  expect(getOppositePoint('bm', props)).toEqual(getPoint('tm', props))
})

it('the opposite of BR is TL', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1.1,
    scaleY: 1.1,
    angle: 90
  }
  expect(getOppositePoint('br', props)).toEqual(getPoint('tl', props))
})

it('the opposite of MR is ML', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1.1,
    scaleY: 1.1,
    angle: 90
  }
  expect(getOppositePoint('mr', props)).toEqual(getPoint('ml', props))
})

it('[tl] has [getTL] caller] ', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  }
  expect(getPoint('tl', props)).toEqual(getTL(props))
})

it('[ml] has [getML] caller] ', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  }
  expect(getPoint('ml', props)).toEqual(getML(props))
})

it('[tr] has [getTR] caller] ', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  }
  expect(getPoint('tr', props)).toEqual(getTR(props))
})

it('[tm] has [getTM] caller] ', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  }
  expect(getPoint('tm', props)).toEqual(getTM(props))
})

it('[bl] has [getBL] caller] ', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  }
  expect(getPoint('bl', props)).toEqual(getBL(props))
})

it('[bm] has [getBM] caller] ', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  }
  expect(getPoint('bm', props)).toEqual(getBM(props))
})

it('[br] has [getBR] caller] ', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  }
  expect(getPoint('br', props)).toEqual(getBR(props))
})

it('[mr] has [getMR] caller] ', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  }
  expect(getPoint('mr', props)).toEqual(getMR(props))
})

it('sine an cosine for tl', function () {
  const angle = 90
  const {sin, cos} = getSineCosine('tl', angle)

  expect(sin).toBe(Math.sin(angle * (Math.PI / 180)))
  expect(cos).toBe(Math.cos(angle * (Math.PI / 180)))
})

it('sine an cosine for ml', function () {
  const angle = 90
  const {sin, cos} = getSineCosine('ml', angle)

  expect(sin).toBe(Math.sin(angle * (Math.PI / 180)))
  expect(cos).toBe(Math.cos(angle * (Math.PI / 180)))
})

it('sine an cosine for tr', function () {
  const angle = 90
  const {sin, cos} = getSineCosine('tr', angle)

  expect(sin).toBe(Math.sin(-angle * (Math.PI / 180)))
  expect(cos).toBe(Math.cos(-angle * (Math.PI / 180)))
})

it('sine an cosine for tm', function () {
  const angle = 90
  const {sin, cos} = getSineCosine('tm', angle)

  expect(sin).toBe(Math.sin(-angle * (Math.PI / 180)))
  expect(cos).toBe(Math.cos(-angle * (Math.PI / 180)))
})

it('sine an cosine for bl', function () {
  const angle = 90
  const {sin, cos} = getSineCosine('bl', angle)

  expect(sin).toBe(Math.sin(-angle * (Math.PI / 180)))
  expect(cos).toBe(Math.cos(-angle * (Math.PI / 180)))
})

it('sine an cosine for bm', function () {
  const angle = 90
  const {sin, cos} = getSineCosine('bm', angle)

  expect(sin).toBe(Math.sin(-angle * (Math.PI / 180)))
  expect(cos).toBe(Math.cos(-angle * (Math.PI / 180)))
})

it('sine an cosine for br', function () {
  const angle = 90
  const {sin, cos} = getSineCosine('br', angle)

  expect(sin).toBe(Math.sin(angle * (Math.PI / 180)))
  expect(cos).toBe(Math.cos(angle * (Math.PI / 180)))
})

it('sine an cosine for mr', function () {
  const angle = 90
  const {sin, cos} = getSineCosine('mr', angle)

  expect(sin).toBe(Math.sin(angle * (Math.PI / 180)))
  expect(cos).toBe(Math.cos(angle * (Math.PI / 180)))
})


it('move point for tl', function () {

  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  }

  const point = getOppositePoint('tl', props);
  const oppositePoint = getOppositePoint('tl', props);
  const moveDiff = {
    x: 5,
    y: 5
  }

  expect(roundPoint(
    getMovePoint('tl', point, oppositePoint, moveDiff)
  )).toEqual({
    x: -5,
    y: -5,
  })
})

it('move point for ml', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  }

  const point = getOppositePoint('ml', props);
  const oppositePoint = getOppositePoint('ml', props);
  const moveDiff = {
    x: 5,
    y: 5
  }

  expect(roundPoint(
    getMovePoint('ml', point, oppositePoint, moveDiff)
  )).toEqual({
    x: -5,
    y: -5,
  })
})

it('move point for tr', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  }

  const point = getOppositePoint('tr', props);
  const oppositePoint = getOppositePoint('tr', props);
  const moveDiff = {
    x: 5,
    y: 5
  }

  expect(roundPoint(
    getMovePoint('tr', point, oppositePoint, moveDiff)
  )).toEqual({
    x: 5,
    y: -5,
  })
})


it('move point for tm', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  }

  const point = getOppositePoint('tm', props);
  const oppositePoint = getOppositePoint('tm', props);
  const moveDiff = {
    x: 5,
    y: 5
  }

  expect(roundPoint(
    getMovePoint('tm', point, oppositePoint, moveDiff)
  )).toEqual({
    x: 5,
    y: -5,
  })
})

it('move point for mr', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  }

  const point = getOppositePoint('mr', props);
  const oppositePoint = getOppositePoint('mr', props);
  const moveDiff = {
    x: 5,
    y: 5
  }

  expect(roundPoint(
    getMovePoint('mr', point, oppositePoint, moveDiff)
  )).toEqual({
    x: 5,
    y: 5,
  })
})


it('move point for br', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  }

  const point = getOppositePoint('br', props);
  const oppositePoint = getOppositePoint('br', props);
  const moveDiff = {
    x: 5,
    y: 5
  }

  expect(roundPoint(
    getMovePoint('br', point, oppositePoint, moveDiff)
  )).toEqual({
    x: 5,
    y: 5,
  })
})


it('move point for bl', function () {
  const props = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    angle: 0
  }

  const point = getOppositePoint('bl', props);
  const oppositePoint = getOppositePoint('bl', props);
  const moveDiff = {
    x: 5,
    y: 5
  }

  expect(roundPoint(
    getMovePoint('bl', point, oppositePoint, moveDiff)
  )).toEqual({
    x: -5,
    y: 5,
  })
})
