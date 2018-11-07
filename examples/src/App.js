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
          width: 100,
          height: 100,
          background: "linear-gradient(135deg, #0FF0B3 0%,#036ED9 100%)",
          classPrefix: "tr",
        },
        {
          id: "el-2",
          x: 225,
          y: 225,
          width: 100,
          height: 100,
          background: "linear-gradient(135deg, #fad961 0%,#f76b1c 100%)",
          classPrefix: "tr2",
          text: "Content Scale Enabled",
        },
        {
          id: "el-3",
          x: 100,
          y: 225,
          width: 100,
          height: 100,
          background: "linear-gradient(135deg, #fad961 0%,#f76b1c 100%)",
          classPrefix: "tr2",
          text: "Content Scale Disabled",
          styles: {
            width:"100%",
            height:"100%"
          },
          disableScale: true
        },
        {
          id: "el-4",
          x: 350,
          y: 225,
          width: 100,
          height: 100,
          angle: 30,
          text: 'angle=30',
          background: "linear-gradient(135deg, #b1ea4d 0%,#459522 100%)",
          classPrefix: "tr3",
        },
        {
          id: "el-5",
          x: 225,
          y: 50,
          width: 100,
          height: 100,
          scaleFromCenter: true,
          text: 'Scale From Center',
          background: "linear-gradient(135deg, #b1ea4d 0%,#459522 100%)",
          classPrefix: "tr2",
        },
        {
          id: "el-6",
          x: 350,
          y: 50,
          width: 100,
          height: 100,
          aspectRatio: true,
          text: 'Aspect Ratio',
          background: "linear-gradient(135deg, #b1ea4d 0%,#459522 100%)",
          classPrefix: "tr2",
        },
        {
          id: "el-7",
          x: 100,
          y: 400,
          width: 100,
          height: 100,
          rotateEnabled: false,
          text: 'Rotate Disabled',
          background: "linear-gradient(135deg, #b1ea4d 0%,#459522 100%)",
          classPrefix: "tr2",
        },
        {
          id: "el-8",
          x: 225,
          y: 400,
          scaleX: 1,
          scaleY: 1,
          width: 100,
          height: 100,
          scaleEnabled: false,
          text: 'Scale Disabled',
          background: "linear-gradient(135deg, #b1ea4d 0%,#459522 100%)",
          classPrefix: "tr2",
        },
        {
          id: "el-9",
          x: 350,
          y: 400,
          scaleX: 1,
          scaleY: 1,
          width: 100,
          height: 100,
          translateEnabled: false,
          text: 'Translate Disabled',
          background: "linear-gradient(135deg, #b1ea4d 0%,#459522 100%)",
          classPrefix: "tr2",
        }
      ],
      offsetX:40,
      offsetY:20,
      zoom:1,
      currentId: null,
    };

    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)

    this.workspaceRef = React.createRef();
  }

  render() {
    const { elements, currentIndex } = this.state;

    return (
      <div className="App">
        <div className="wrapper">
          <button onClick={this.zoomIn}>+</button>
          <button onClick={this.zoomOut}>-</button>
          <div className="workspace" ref={this.workspaceRef}>
            {elements.map(({styles = {}, ...element}, i) => (
              <FreeTransform
                key={element.id}
                onUpdate={payload => this.onUpdate(element.id, payload)}
                onTransformStart={() => this.onTransformStart(i)}
                onTransformEnd={() => this.onTransformEnd()}
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
                    padding: 5,
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
          <ReactJson src={currentIndex != null ? elements[currentIndex] : elements}/>
        </div>
      </div>
    );
  }

  onTransformStart(index) {
    this.setState({ currentIndex: index })
  }

  onTransformEnd() {
    this.setState({ currentIndex: null })
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