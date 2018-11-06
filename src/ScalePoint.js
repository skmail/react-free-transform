import React from 'react'
import PropTypes from 'prop-types'

const ScalePoint = ({onMouseDown,classPrefix,position}) => (
  <div
    className={`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--${position}`}
    onMouseDown={onMouseDown}/>
)

ScalePoint.propTypes = {
  onMouseDown:PropTypes.func.isRequired,
  classPrefix:PropTypes.string.isRequired,
  position:PropTypes.string.isRequired,
}

export default ScalePoint