import React from 'react'
import PropTypes from 'prop-types'

const POSITIONING = {
  l: '0', r: '100%',
  t: '0', b: '100%',
  m: '50%',
}

const ScalePoint = ({ onMouseDown, classPrefix, position, styles }) => (
  <div
    className={`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--${position}`}
    onMouseDown={onMouseDown}
    style={{
        position: 'absolute',
        top: POSITIONING[position[0]],
        left: POSITIONING[position[1]],
        transform: 'translate(-50%, -50%)',
        ...styles
    }} />
)

ScalePoint.defaultProps = {
  classPrefix: 'tr',
  styles: {},
}

ScalePoint.propTypes = {
  onMouseDown: PropTypes.func.isRequired,
  classPrefix: PropTypes.string,
  position: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
}

export default ScalePoint