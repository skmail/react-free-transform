export default ({x,y,startX,startY},onUpdate) => (
  (dragEvent) => {

    x += dragEvent.pageX - startX
    y += dragEvent.pageY - startY

    onUpdate({x,y})

    startX = dragEvent.pageX
    startY = dragEvent.pageY
  }
)