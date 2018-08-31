import {
  scale,
  rotate,
  translate,
  transform,
  toCSS
} from 'transformation-matrix';

//https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
const roundTo = (n, digits = 2) => {
  const multiplicator = Math.pow(10, digits)
  n = parseFloat((n * multiplicator).toFixed(11))
  const test = (Math.round(n) / multiplicator)
  return +(test.toFixed(2));
}

export default ({x, y, angle, scaleX, scaleY, width, height}) => {

  const changedWidth = width * (1 - scaleX);
  const newWidth = width - changedWidth;
  const changedHeight = height * (1 - scaleY);
  const newHeight = height - changedHeight;

  const mat = transform(
    translate(roundTo(x + changedWidth / 2), roundTo(y + changedHeight / 2)),
    rotate(angle * (Math.PI / 180)),
    scale(scaleX, scaleY)
  );

  return {
    element: {
      width,
      height,
      transform: toCSS(mat),
      position: "absolute",
    },
    controls: {
      width: newWidth,
      height: newHeight,
      transform: toCSS(
        transform(
          translate(roundTo(x + changedWidth), roundTo(y + changedHeight)),
          rotate(angle * (Math.PI / 180)),
        )
      ),
      position: "absolute",
    }
  }
}