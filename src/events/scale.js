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
 * @param scaleType
 * @param startX
 * @param startY
 * @param x
 * @param y
 * @param scaleX
 * @param scaleY
 * @param width
 * @param height
 * @param angle
 * @param scaleLimit
 * @param scaleFromCenter
 * @param aspectRatio
 * @param onUpdate
 * @returns {Function}
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