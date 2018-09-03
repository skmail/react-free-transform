import React from 'react'

import FreeTransform from "react-free-transform";

export default class Transform extends React.Component{

  render(){
    return(
      <FreeTransform {...this.props}/>
    )
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.scaleX !== nextProps.scaleX ||
      this.props.scaleY !== nextProps.scaleY ||
      this.props.x !== nextProps.x ||
      this.props.y !== nextProps.y ||
      this.props.angle !== nextProps.angle ||
      this.props.disableScale !== nextProps.disableScale ||
      this.props.scaleLimit !== nextProps.scaleLimit ||
      this.props.classPrefix !== nextProps.classPrefix ||
      this.props.width !== nextProps.width ||
      this.props.height !== nextProps.height ||
      this.props.offsetX !== nextProps.offsetX ||
      this.props.offsetY !== nextProps.offsetY
    );
  }


}