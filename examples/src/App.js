import React from "react";
import ReactDOM from "react-dom";
import FreeTransform from "react-free-transform";
import ReactJson from "react-json-view";

import "./App.css";
import "./tr.css";

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
          x: 100,
          y: 225,
          scaleX: 1,
          scaleY: 1,
          width: 100,
          height: 100,
          angle: 45,
          background: "linear-gradient(135deg, #fad961 0%,#f76b1c 100%)",
          classPrefix: "tr",
        },
        {
          id: "el-3",
          x: 100,
          y: 400,
          scaleX: 1,
          scaleY: 1,
          width: 100,
          height: 100,
          angle: 90,
          background: "linear-gradient(135deg, #b1ea4d 0%,#459522 100%)",
          classPrefix: "tr",
        }
      ]
    };
  }

  render() {
    return (
      <div className="App">
        <div className="workspace">
          {this.state.elements.map(element => (
            <FreeTransform
              key={element.id}
              onUpdate={payload => this.onUpdate(element.id, payload)}
              {...element}
            >
              <div
                className="element"
                style={{
                  width: element.width,
                  height: element.height,
                  background: element.background
                }}
              />
            </FreeTransform>
          ))}
        </div>
        <div class="json-view">
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
}

export default App