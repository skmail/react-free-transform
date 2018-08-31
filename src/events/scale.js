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

  const ratio = (width * scaleX) / (height * scaleY)

  let point = getPoint(scaleType, {x, y, scaleX, scaleY, width, height, angle, scaleFromCenter});

  let oppositePoint = getOppositePoint(scaleType, {
    x,
    y,
    scaleX,
    scaleY,
    width,
    height,
    angle
  })

  const currentProps = {
    x,
    y,
    scaleX,
    scaleY,
  }

  return (event) => {

    if(event.altKey && !scaleFromCenter){
      startX = event.pageX
      startY = event.pageY
      scaleFromCenter = true
      point = getPoint(scaleType, {
        x:currentProps.x,
        y:currentProps.y,
        scaleX:currentProps.scaleX,
        scaleY:currentProps.scaleY,
        width, height, angle, scaleFromCenter});
      oppositePoint = getOppositePoint(scaleType, {
        x:currentProps.x,
        y:currentProps.y,
        scaleX:currentProps.scaleX,
        scaleY:currentProps.scaleY,
        width,
        height,
        angle
      })
    } else if(!event.altKey && scaleFromCenter){
      scaleFromCenter = false
      startX = event.pageX
      startY = event.pageY
      point = getPoint(scaleType, {
        x:currentProps.x,
        y:currentProps.y,
        scaleX:currentProps.scaleX,
        scaleY:currentProps.scaleY,
        width,
        height,
        angle,
        scaleFromCenter
      });
      oppositePoint = getOppositePoint(scaleType, {
        x:currentProps.x,
        y:currentProps.y,
        scaleX:currentProps.scaleX,
        scaleY:currentProps.scaleY,
        width,
        height,
        angle
      })
    }

    if(!event.shiftKey && aspectRatio ){
      aspectRatio = false
    } else if(event.shiftKey && !aspectRatio ){
      aspectRatio = true
    }

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

    currentProps.scaleX = (rotationPoint.x / width) > scaleLimit ? rotationPoint.x / width : scaleLimit
    currentProps.scaleY = (rotationPoint.y / height) > scaleLimit ? rotationPoint.y / height : scaleLimit


    switch (scaleType) {
    case 'ml':
    case 'mr':
      currentProps.scaleY = scaleY
      if (aspectRatio) {
        currentProps.scaleY = ((width * currentProps.scaleX) * (1 / ratio)) / height;
      }
      break;
    case 'tm':
    case 'bm':
      currentProps.scaleX = scaleX
      if (aspectRatio) {
        currentProps.scaleX = ((height * currentProps.scaleY) * ratio) / width;
      }
      break;
    default:
      if (aspectRatio) {
        currentProps.scaleY = ((width * currentProps.scaleX) * (1 / ratio)) / height;
      }
    }

    if (scaleFromCenter) {
      const center = getCenter({
        x,
        y,
        width,
        height,
        scaleX: currentProps.scaleX,
        scaleY: currentProps.scaleY,
      })
      currentProps.x = x + (point.x - center.x)
      currentProps.y = y + (point.y - center.y)
    } else {
      const freshOppositePoint = getOppositePoint(scaleType, {
        width,
        height,
        angle,
        x,
        y,
        scaleX: currentProps.scaleX,
        scaleY: currentProps.scaleY,
      });

      currentProps.x = x + (oppositePoint.x - freshOppositePoint.x)
      currentProps.y = y + (oppositePoint.y - freshOppositePoint.y)
    }

    onUpdate(currentProps)
  }
}