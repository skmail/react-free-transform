import React from 'react'
import PropTypes from 'prop-types'
import rotate from './events/rotate'
import scale from './events/scale'
import ScalePoint from './ScalePoint'
import Rotator from './Rotator'
import translate from './events/translate'
import elementStyler from './ElementStyler'

export default class Transform extends React.Component {

  constructor(props) {
    super(props)
    this.handleTranslation = this.handleTranslation.bind(this)
    this.handleScale = this.handleScale.bind(this)
    this.handleRotation = this.handleRotation.bind(this)
  }

  render() {

    const {children, classPrefix, x, y, scaleX, scaleY, width, height, angle} = this.props

    const {
      element: elementStyle,
      controls: controlsStyles
    } = elementStyler({x, y, scaleX, scaleY, width, height, angle});

    return (
      <div className={`${classPrefix}-transform`} onMouseDown={this.handleTranslation}>
        <div className={`${classPrefix}-transform__content`} style={elementStyle}>
          {children}
        </div>
        <div className={`${classPrefix}-transform__controls`} style={controlsStyles}>
          <ScalePoint position="tl" onMouseDown={(event) => this.handleScale('tl', event)} classPrefix={classPrefix}/>
          <ScalePoint position="ml" onMouseDown={(event) => this.handleScale('ml', event)} classPrefix={classPrefix}/>
          <ScalePoint position="tr" onMouseDown={(event) => this.handleScale('tr', event)} classPrefix={classPrefix}/>
          <ScalePoint position="tm" onMouseDown={(event) => this.handleScale('tm', event)} classPrefix={classPrefix}/>
          <ScalePoint position="mr" onMouseDown={(event) => this.handleScale('mr', event)} classPrefix={classPrefix}/>
          <ScalePoint position="bl" onMouseDown={(event) => this.handleScale('bl', event)} classPrefix={classPrefix}/>
          <ScalePoint position="bm" onMouseDown={(event) => this.handleScale('bm', event)} classPrefix={classPrefix}/>
          <ScalePoint position="br" onMouseDown={(event) => this.handleScale('br', event)} classPrefix={classPrefix}/>
          <Rotator onMouseDown={this.handleRotation} classPrefix={classPrefix} />
        </div>
      </div>
    )
  }

  handleTranslation(event) {
    event.stopPropagation();

    const drag = translate({
      x: this.props.x,
      y: this.props.y,
      startX: event.pageX,
      startY: event.pageY
    }, this.props.onUpdate);

    const up = () => {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', up);
  }

  handleScale(scaleType, event) {

    event.stopPropagation();

    event.preventDefault();

    const drag = scale(scaleType, {
      startX: event.pageX,
      startY: event.pageY,
      x: this.props.x,
      y: this.props.y,
      scaleX: this.props.scaleX,
      scaleY: this.props.scaleY,
      width: this.props.width,
      height: this.props.height,
      angle: this.props.angle,
      scaleLimit: this.props.scaleLimit,
      scaleFromCenter:event.altKey,
      aspectRatio:event.shiftKey,
    }, this.props.onUpdate);

    const up = () => {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener("mousemove", drag)
    document.addEventListener("mouseup", up)
  }

  handleRotation(event){
    event.stopPropagation();

    const drag = rotate({
      startX: event.pageX,
      startY: event.pageY,
      x: this.props.x,
      y: this.props.y,
      scaleX: this.props.scaleX,
      scaleY: this.props.scaleY,
      width: this.props.width,
      height: this.props.height,
      angle: this.props.angle,
      offsetX:0,
      offsetY:0
    }, this.props.onUpdate);

    const up = () => {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener("mousemove", drag)
    document.addEventListener("mouseup", up)

  }
}


Transform.defaultProps = {
  classPrefix: "tr",
  scaleLimit: 0.1,
  onUpdate: function () {

  }
}

Transform.propTypes = {
  classPrefix: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scaleX: PropTypes.number.isRequired,
  scaleY: PropTypes.number.isRequired,
  scaleLimit: PropTypes.number.isRequired,
  angle: PropTypes.number.isRequired,
  onUpdate: PropTypes.func
}
