import {
  getPoint,
  getOppositePoint,
  getMovePoint,
  getSineCosine,
  getCenter,
} from '../point-finder'

/**
 * Perform Scaling based on a positioned handle
 *
 * @param {string} scaleType scale point position name
 * @param {Object} payload an object holding element information
 * @param {number} payload.startX mouse down position on X axis
 * @param {number} payload.startY mouse down position on Y axis
 * @param {number} payload.x position of x
 * @param {number} payload.y position of y
 * @param {number} payload.scaleX amount of scale for x (width)
 * @param {number} payload.scaleY amount of scale for y (height)
 * @param {number} payload.width original width
 * @param {number} payload.height original height
 * @param {number} payload.angle the angle of rotation
 * @param {number} payload.scaleLimit minimum scale limit
 * @param {boolean} payload.scaleFromCenter is scale from center
 * @param {boolean} payload.aspectRatio is scale on aspect ration
 * @param {Function} onUpdate a callback on mouse up
 *
 * @returns {Function} a function for mouse move
 */
export default (scaleType, {
  startX,
  startY,
  x,
  y,
  scaleX,
  scaleY,
  width,
  height,
  angle,
  scaleLimit,
  scaleFromCenter = false,
  aspectRatio = false
}, onUpdate) => {

  let point

  const ratio = (width * scaleX) / (height * scaleY)

  if (scaleFromCenter) {
    point = getCenter({x, y, scaleX, scaleY, width, height})
  } else {
    point = getPoint(scaleType, {x, y, scaleX, scaleY, width, height, angle});
  }

  const oppositePoint = getOppositePoint(scaleType, {
    x,
    y,
    scaleX,
    scaleY,
    width,
    height,
    angle
  })

  return (event) => {

    const moveDiff = {
      x: event.pageX - startX,
      y: event.pageY - startY
    }

    const movePoint = getMovePoint(scaleType, oppositePoint, point, moveDiff)

    if (scaleFromCenter) {
      movePoint.x *= 2
      movePoint.y *= 2
    }

    const {sin, cos} = getSineCosine(scaleType, angle);
    const rotationPoint = {
      x: movePoint.x * cos + movePoint.y * sin,
      y: movePoint.y * cos - movePoint.x * sin
    }

    const props = {
      scaleX: (rotationPoint.x / width) > scaleLimit ? rotationPoint.x / width : scaleLimit,
      scaleY: (rotationPoint.y / height) > scaleLimit ? rotationPoint.y / height : scaleLimit,
    };

    switch (scaleType) {
    case 'ml':
    case 'mr':
      props.scaleY = scaleY
      if (aspectRatio) {
        props.scaleY = ((width * props.scaleX) * (1 / ratio)) / height;
      }
      break;
    case 'tm':
    case 'bm':
      props.scaleX = scaleX
      if (aspectRatio) {
        props.scaleX = ((height * props.scaleY) * ratio) / width;
      }
      break;
    default:
      if (aspectRatio) {
        props.scaleY = ((width * props.scaleX) * (1 / ratio)) / height;
      }
    }

    if (scaleFromCenter) {
      const center = getCenter({
        x,
        y,
        width,
        height,
        scaleX: props.scaleX,
        scaleY: props.scaleY,
      })

      props.x = x + (point.x - center.x)
      props.y = y + (point.y - center.y)

    } else {
      const freshOppositePoint = getOppositePoint(scaleType, {
        width,
        height,
        angle,
        x,
        y,
        scaleX: props.scaleX,
        scaleY: props.scaleY,
      });

      props.x = x + (oppositePoint.x - freshOppositePoint.x)
      props.y = y + (oppositePoint.y - freshOppositePoint.y)
    }

    onUpdate(props)
  }
}