import React from 'react'
import PropTypes from 'prop-types'
import ScalePoint from './ScalePoint'
import Rotator from './Rotator'
import {scale, rotate, translate, styler} from 'free-transform'

const ANCHOR_PRESETS = {
  'corners': ['tl', 'tr', 'bl', 'br'],
  'sides': ['tm', 'mr', 'bm', 'ml']
}

export default class Transform extends React.Component {

  constructor(props) {
    super(props)
    this.handleTranslation = this.handleTranslation.bind(this)
    this.handleScale = this.handleScale.bind(this)
    this.handleRotation = this.handleRotation.bind(this)
  }

  render() {

    const {children, classPrefix, 
      x, y, scaleX, scaleY, 
      width, height, angle, 
      disableScale,
      rotateEnabled, scaleEnabled, 
      translateEnabled, scaleHandles,
      open, //...props
    } = this.props
    
    // replace anchor shortcuts
    for(var name in ANCHOR_PRESETS) {
      var index = scaleHandles.indexOf(name);
      if (index !== -1) {
        scaleHandles.splice(index, 1, ...ANCHOR_PRESETS[name]);
      }
    }

    const {
      element: elementStyle,
      controls: controlsStyles
    } = styler({x, y, scaleX, scaleY, width, height, angle, disableScale});

    return (
      <div className={`${classPrefix}-transform`} onMouseDown={open && translateEnabled && this.handleTranslation}>
        
        <div className={`${classPrefix}-transform__content`} style={elementStyle}>
          {children}
        </div>

        {open && <div className={`${classPrefix}-transform__controls`} style={controlsStyles}>

          {scaleEnabled && scaleHandles.map(position => 
            <ScalePoint key={position} position={position} classPrefix={classPrefix} onMouseDown={(event) => this.handleScale(position, event)} />
          )}

          {rotateEnabled && <Rotator onMouseDown={this.handleRotation} classPrefix={classPrefix}/>}
        </div>}
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
      scaleFromCenter: event.altKey || this.props.scaleFromCenter,
      aspectRatio: event.shiftKey || this.props.aspectRatio,
    }, this.props.onUpdate);

    const up = () => {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener("mousemove", drag)
    document.addEventListener("mouseup", up)
  }

  handleRotation(event) {
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
      offsetX: this.props.offsetX,
      offsetY: this.props.offsetY
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
  disableScale: false,
  scaleX: 1,
  scaleY: 1,
  angle: 0,
  offsetX: 0,
  offsetY: 0,
  onUpdate: function () {},
  rotateEnabled: true,
  scaleEnabled: true,
  translateEnabled: true,
  scaleHandles: ['tl', 'ml', 'tr', 'tm', 'mr', 'bl', 'bm', 'br'],
  open: true,
  scaleFromCenter: false, 
  aspectRatio: false,
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
  onUpdate: PropTypes.func,
  children: PropTypes.element,
  disableScale: PropTypes.bool,
  offsetX: PropTypes.number.isRequired,
  offsetY: PropTypes.number.isRequired,
  rotateEnabled: PropTypes.bool,
  scaleEnabled: PropTypes.bool,
  translateEnabled: PropTypes.bool,
  scaleHandles: PropTypes.array,
  open: PropTypes.bool,
  scaleFromCenter: PropTypes.bool,
  aspectRatio: PropTypes.bool,
}
