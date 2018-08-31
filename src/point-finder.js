/**
 * Find the actual point position of a transformed point
 *
 * @param {Object} payload an object holding required information to find actual point
 * @param {number} payload.x position of x
 * @param {number} payload.y position of y
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center  {{x,y}} the center of element
 * @param {number} payload.rad the a computed radians of a provided angle
 *
 * @returns {{x: number, y: number}} an object holding the position
 */
const findPoint = ({x, y, angle, center, rad = angle * (Math.PI / 180)}) => ({
  x: (x - center.x) * Math.cos(rad) - (y - center.y) * Math.sin(rad) + center.x,
  y: (x - center.x) * Math.sin(rad) + (y - center.y) * Math.cos(rad) + center.y
})


/**
 * Get the Center point of a box
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 *
 * @returns {{x: *, y: *}} the center of point of element
 */
export const getCenter = ({x, y, scaleX, scaleY, width, height}) => {
  const changedWidth = width * scaleX
  const changedHeight = height * scaleY

  const changedWidthDiff = changedWidth - width
  const changedHeightDiff = changedHeight - height

  return {
    x: x - changedWidthDiff + changedWidth / 2,
    y: y - changedHeightDiff + changedHeight / 2
  }
}

/**
 * get the TopLeft point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
export const getTL = ({x, y, scaleX, scaleY, width, height, angle, center = getCenter({x, y, scaleX, scaleY, width, height})}) => (
  findPoint({
    x,
    y,
    angle,
    center
  })
)

/**
 * get the LeftBottom point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
export const getBL = ({x, y, scaleX, scaleY, width, height, angle, center = getCenter({x, y, scaleX, scaleY, width, height})}) => {

  return findPoint({
    angle,
    center,
    x,
    y: y + (height * scaleY),
  })
}


/**
 * Get TopRight point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
export const getTR = ({x, y, scaleX, scaleY, width, height, angle, center = getCenter({x, y, scaleX, scaleY, width, height})}) => (
  findPoint({
    angle,
    center,
    x: x + (width * scaleX),
    y,
  })
)


/**
 * Get BottomRight point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
export const getBR = ({x,y, scaleX, scaleY, width, height, angle, center = getCenter({x, y, scaleX, scaleY, width, height})}) => {
  return findPoint({
    angle,
    center,
    x: x + width * scaleX,
    y: y + height * scaleY,
  })
}

/**
 * get MiddleRight point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
export const getMR = ({x,y, scaleX, scaleY, width, height, angle, center = getCenter({x, y, scaleX, scaleY, width, height})}) => (
  findPoint({
    x: x + (width * scaleX),
    y: y + (height * scaleY) / 2,
    center,
    angle
  })
)

/**
 * get MiddleBottom point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
export const getBM = ({x,y, scaleX, scaleY, width, height, angle, center = getCenter({x, y, scaleX, scaleY, width, height})}) => (
  findPoint({
    x: x + (width * scaleX) / 2,
    y: y + (height * scaleY),
    center,
    angle
  })
)

/**
 * get MiddleTop point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
export const getTM = ({x,y, scaleX, scaleY, width, height, angle, center = getCenter({x, y, scaleX, scaleY, width, height})}) => (
  findPoint({
    x: x + (width * scaleX) / 2,
    y: y,
    center,
    angle
  })
)

/**
 * get MiddleLeft point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
export const getML = ({x,y, scaleX, scaleY, width, height, angle, center = getCenter({x, y, scaleX, scaleY, width, height})}) => (
  findPoint({
    x: x ,
    y: y + (height * scaleY) / 2,
    center,
    angle
  })
)

/**
 * given a point, get it's opposite point
 *
 * @param {string} scaleType scale point position name
 * @param {Object} props element information
 * @param {number} props.x the position of x
 * @param {number} props.y the position of y
 * @param {number} props.scaleX the scaleX of element
 * @param {number} props.scaleY the scaleY of element
 * @param {number} props.width the original width of element
 * @param {number} props.height the original height of element
 * @param {number} props.angle the  rotation angle
 * @param {Object} props.center {{x:number, y:number}}
 *
 * @returns {{x:number, y:number}} point position
 */
export const getOppositePoint = (scaleType, props) => {

  let caller

  const center = getCenter({
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    scaleX: props.scaleX,
    scaleY: props.scaleY,
  })

  props = {
    center,
    ...props,
    x: getOriginalPositionFromScale(props.x, props.width, props.scaleX),
    y: getOriginalPositionFromScale(props.y, props.height, props.scaleY)
  }

  switch (scaleType) {
  case 'tl':
    caller = getBR
    break

  case 'ml':
    caller = getMR
    break

  case 'tr' :
    caller = getBL
    break

  case 'tm' :
    caller = getBM
    break

  case 'bl' :
    caller = getTR
    break

  case 'bm' :
    caller = getTM
    break

  case 'br' :
    caller = getTL
    break

  case 'mr' :
    caller = getML
    break
  }
  return caller(props)
}

/**
 * given a point position by it's string name
 *
 * @param {string} scaleType scale point position name
 * @param {Object} props element information
 * @param {number} props.x the position of x
 * @param {number} props.y the position of y
 * @param {number} props.scaleX the scaleX of element
 * @param {number} props.scaleY the scaleY of element
 * @param {number} props.width the original width of element
 * @param {number} props.height the original height of element
 * @param {number} props.angle the  rotation angle
 * @param {boolean} props.scaleFromCenter scaling performed from center
 * @param {Object} props.center {{x:number, y:number}}
 *
 * @returns {{x:number, y:number}} point position
 */
export const getPoint = (scaleType, props) => {

  const center = getCenter({
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    scaleX: props.scaleX,
    scaleY: props.scaleY,
  })

  if(props.scaleFromCenter){
    return center;
  }

  props = {
    center,
    ...props,
    x: getOriginalPositionFromScale(props.x, props.width, props.scaleX),
    y: getOriginalPositionFromScale(props.y, props.height, props.scaleY)
  }

  let caller
  switch (scaleType) {

  case 'tl':
    caller = getTL
    break;

  case 'ml':
    caller = getML
    break;

  case 'tr':
    caller = getTR
    break;

  case 'tm':
    caller = getTM
    break;

  case 'bl' :
    caller = getBL
    break;

  case 'bm' :
    caller = getBM
    break;

  case 'br' :
    caller = getBR
    break;

  case 'mr' :
    caller = getMR
    break;
  }

  return caller(props)
}

/**
 * get sine and cosine for a point based on angle and point name
 *
 * @param {string} scaleType scale point position name
 * @param {number} angle the  rotation angle
 *
 * @returns {{sin: number, cos: number}} the sine and cosine of scale type
 */
export const getSineCosine = (scaleType, angle) => {
  switch (scaleType) {
  case 'tr':
  case 'tm':
  case 'bl':
  case 'bm':
    return {
      cos: Math.cos(-angle * (Math.PI / 180)),
      sin: Math.sin(-angle * (Math.PI / 180))
    }
  default:
    return {
      sin: Math.sin(angle * (Math.PI / 180)),
      cos: Math.cos(angle * (Math.PI / 180))
    }
  }
}

/**
 * get the amount of movement for a point
 *
 * @param {string} scaleType scale point position name
 * @param {object} oppositePoint the opposite point position {x: number,y: number}
 * @param {object} point the point position {x: number,y: number}
 * @param {object} moveDiff the the amount of pixels that element moved {x: number,y: number}
 *
 * @returns {{x: number, y:number}} the new position of moved element
 */
export const getMovePoint = (scaleType, oppositePoint, point, moveDiff) => {
  switch (scaleType) {

  case 'tl':
    return {
      x: oppositePoint.x - (moveDiff.x + point.x),
      y: oppositePoint.y - (moveDiff.y + point.y),
    }
  case 'ml':
    return {
      x: oppositePoint.x - moveDiff.x - point.x,
      y: oppositePoint.y - moveDiff.y - point.y,
    }

  case 'tr' :
  case 'tm':
    return {
      x: point.x + (moveDiff.x - oppositePoint.x),
      y: oppositePoint.y - (moveDiff.y + point.y)
    }
  case 'mr':
  case 'br':
    return {
      x: point.x + (moveDiff.x - oppositePoint.x),
      y: point.y + (moveDiff.y - oppositePoint.y)
    }
  case 'bl':
  case 'bm':
    return {
      x: oppositePoint.x - (moveDiff.x + point.x),
      y: point.y + (moveDiff.y - oppositePoint.y)
    }
  }
}

/**
 * guess the original point position based on scale and the position after scaling
 *
 * @param {number} position the position of x or y
 * @param {number} size the size of element (width for x, height for y)
 * @param {number} scale the amount of scaled element (scaleX for x, scaleY for y)
 *
 * @returns {number} the original point position
 */
const getOriginalPositionFromScale = (position, size, scale) => {
  const changed = size * scale

  const diff = changed - size

  return position - diff
}