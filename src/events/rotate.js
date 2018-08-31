import {getCenter} from "../point-finder";

export default ({x, y, scaleX, scaleY, width, height, angle, startX, startY, offsetX, offsetY},onUpdate) => {

  const center = getCenter({x, y, scaleX, scaleY, width, height})

  const pressAngle = Math.atan2((startY - offsetY) - center.y, (startX - offsetX) - center.x) * 180 / Math.PI

  return (event) => {

    const degree = Math.atan2((event.pageY - offsetY) - center.y, (event.pageX - offsetX) - center.x) * 180 / Math.PI;

    if(isNaN(pressAngle)){
      throw new Error("s")
    }
    let ang = angle + degree - pressAngle

    if (event.shiftKey) {
      ang = (ang / 15 >> 0) * 15;
    }

    onUpdate({
      angle: ang
    })

  }
}