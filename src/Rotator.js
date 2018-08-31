import React from 'react'
import PropTypes from 'prop-types'
const Rotator = ({onMouseDown,classPrefix}) => (
  <div
    className={`${classPrefix}-transform__rotator`}
    onMouseDown={onMouseDown}/>
)

Rotator.propTypes = {
  onMouseDown:PropTypes.func.isRequired,
  classPrefix:PropTypes.string.isRequired
}

export default Rotator