/**
 * Find the actual point position of a transformed point
 *
 * @param x {number}
 * @param y {number}
 * @param angle {number}
 * @param center {object} {{x,y}}
 * @param rad {number}
 * @returns {{x: number, y: number}}
 */
const findPoint = ({x, y, angle, center, rad = angle * (Math.PI / 180)}) => ({
  x: (x - center.x) * Math.cos(rad) - (y - center.y) * Math.sin(rad) + center.x,
  y: (x - center.x) * Math.sin(rad) + (y - center.y) * Math.cos(rad) + center.y
})


/**
 * Get the Center point of a box
 *
 * @param x {number}
 * @param y {number}
 * @param scaleX {number}
 * @param scaleY {number}
 * @param width {number}
 * @param height {number}
 *
 * @returns {{x: *, y: *}}
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
 * @param x {number}
 * @param y {number}
 * @param scaleX {number}
 * @param scaleY {number}
 * @param width {number}
 * @param height {number}
 * @param angle {number}
 * @param center {{x:number, y:number}}
 * @returns {{x: number, y: number}}
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
 * @param x {number}
 * @param y {number}
 * @param scaleX {number}
 * @param scaleY {number}
 * @param width {number}
 * @param height {number}
 * @param angle {number}
 * @param center {{x:number, y:number}}
 * @returns {{x: number, y: number}}
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
 * @param x {number}
 * @param y {number}
 * @param scaleX {number}
 * @param scaleY {number}
 * @param width {number}
 * @param height {number}
 * @param angle {number}
 * @param center {{x:number, y:number}}
 * @returns {{x: number, y: number}}
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
 * @param x {number}
 * @param y {number}
 * @param scaleX {number}
 * @param scaleY {number}
 * @param width {number}
 * @param height {number}
 * @param angle {number}
 * @param center {{x:number, y:number}}
 * @returns {{x: number, y: number}}
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
 * @param x {number}
 * @param y {number}
 * @param scaleX {number}
 * @param scaleY {number}
 * @param width {number}
 * @param height {number}
 * @param angle {number}
 * @param center {{x:number, y:number}}
 * @returns {{x: number, y: number}}
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
 * @param x {number}
 * @param y {number}
 * @param scaleX {number}
 * @param scaleY {number}
 * @param width {number}
 * @param height {number}
 * @param angle {number}
 * @param center {{x:number, y:number}}
 * @returns {{x: number, y: number}}
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
 * @param x {number}
 * @param y {number}
 * @param scaleX {number}
 * @param scaleY {number}
 * @param width {number}
 * @param height {number}
 * @param angle {number}
 * @param center {{x:number, y:number}}
 * @returns {{x: number, y: number}}
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
 * @param x {number}
 * @param y {number}
 * @param scaleX {number}
 * @param scaleY {number}
 * @param width {number}
 * @param height {number}
 * @param angle {number}
 * @param center {{x:number, y:number}}
 * @returns {{x: number, y: number}}
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
 * @param scaleType {string}
 * @param props {object} {{x: number, y: number, width: number, height: number,scaleX: number,scaleY: number, center: object}}
 * @returns {{x:number, y:number}}
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
 * @param scaleType {string}
 * @param props {object} {{x: number, y: number, width: number, height: number,scaleX: number,scaleY: number, center: object}}
 * @returns {{x:number, y:number}}
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
 * @param scaleType {string}
 * @param angle {number}
 * @returns {{sin: number, cos: number}}
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
 * @param scaleType {string}
 * @param oppositePoint {object} {x: number,y: number}
 * @param point {object} {x: number,y: number}
 * @param moveDiff {object} {x: number,y: number}
 * @returns {{x: number, y:number}}
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
 * @param position {number}
 * @param size {number}
 * @param scale {number}
 * @returns {number}
 */
const getOriginalPositionFromScale = (position, size, scale) => {
  const changed = size * scale

  const diff = changed - size

  return position - diff
}