import React from "react";
import ReactJson from "react-json-view";
import FreeTransform from './Transform'

import "./App.css";
import "./tr.css";
import "./tr2.css";
import "./tr3.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [
        {
          id: "el-1",
          x: 100,
          y: 50,
          scaleX: 1,
          scaleY: 1,
          width: 100,
          height: 100,
          angle: 0,
          background: "linear-gradient(135deg, #0FF0B3 0%,#036ED9 100%)",
          classPrefix: "tr",
        },
        {
          id: "el-2",
          x: 225,
          y: 225,
          scaleX: 1,
          scaleY: 1,
          width: 100,
          height: 100,
          angle: 0,
          background: "linear-gradient(135deg, #fad961 0%,#f76b1c 100%)",
          classPrefix: "tr2",
          text: "Scale Enabled",
          styles: {
            padding: 5,
          },
        },
        {
          id: "el-3",
          x: 100,
          y: 225,
          scaleX: 1,
          scaleY: 1,
          width: 100,
          height: 100,
          angle: 0,
          background: "linear-gradient(135deg, #fad961 0%,#f76b1c 100%)",
          classPrefix: "tr2",
          text: "Scale Disabled",
          styles: {
            padding: 5,
            width:"100%",
            height:"100%"
          },
          disableScale: true
        },
        {
          id: "el-4",
          x: 100,
          y: 400,
          scaleX: 1,
          scaleY: 1,
          width: 100,
          height: 100,
          angle: 45,
          background: "linear-gradient(135deg, #b1ea4d 0%,#459522 100%)",
          classPrefix: "tr3",
        }
      ],
      offsetX:40,
      offsetY:20,
      zoom:1
    };

    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)

    this.workspaceRef = React.createRef();
  }

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <button onClick={this.zoomIn}>+</button>
          <button onClick={this.zoomOut}>-</button>
          <div className="workspace" ref={this.workspaceRef}>
            {this.state.elements.map(({styles = {}, ...element}) => (
              <FreeTransform
                key={element.id}
                onUpdate={payload => this.onUpdate(element.id, payload)}
                offsetX={this.state.offsetX}
                offsetY={this.state.offsetY}
                {...element}
              >
                <div
                  className="element"
                  style={{
                    width: element.width,
                    height: element.height,
                    background: element.background,
                    ...styles
                  }}
                >
                  {element.text}
                </div>

              </FreeTransform>
            ))}
          </div>
        </div>
        <div className="json-view">
          <ReactJson src={this.state.elements}/>
        </div>
      </div>
    );
  }

  onUpdate(id, payload) {
    this.setState({
      elements: this.state.elements.map(item => {
        if (item.id === id) {
          return {
            ...item,
            ...payload
          };
        }
        return item;
      })
    });
  }

  zoomIn(){
    const zoom = this.state.zoom + 0.5;
    this.setState({
      zoom,
      elements:this.resizeElements(zoom)
    })
  }

  zoomOut(){
    const zoom = this.state.zoom - 0.5;
    this.setState({
      zoom,
      elements:this.resizeElements(zoom)
    })
  }

  resizeElements(zoom){
    return this.state.elements.map(element => ({
      ...element,
      scaleX: element.scaleX + zoom ,
      scaleY: element.scaleY + zoom
    }))
  }


  componentDidMount(){
    this.setState({
      offsetX:this.workspaceRef.current.offsetLeft,
      offsetY:this.workspaceRef.current.offsetTop
    })
  }
}

export default App