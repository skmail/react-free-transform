import React, {Component} from 'react';
import './App.css'
import Transform from 'react-free-transform'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      elements: [
        {
          id: "el-1",
          x: 100,
          y: 100,
          scaleX: 1,
          scaleY: 1,
          width: 100,
          height: 100,
          angle: 0,
          background: "linear-gradient(135deg, #0FF0B3 0%,#036ED9 100%)"
        },
        {
          id: "el-2",
          x: 300,
          y: 100,
          scaleX: 1,
          scaleY: 1,
          width: 100,
          height: 100,
          angle: 0,
          background: "linear-gradient(135deg, #fad961 0%,#f76b1c 100%)"
        },
        {
          id: "el-3",
          x: 500,
          y: 100,
          scaleX: 1,
          scaleY: 1,
          width: 100,
          height: 100,
          angle: 0,
          background: "linear-gradient(135deg, #b1ea4d 0%,#459522 100%)"
        }
      ]
    }
  }

  render() {
    return (
      <div className="App">
        {
          this.state.elements.map(element => (
            <Transform
              key={element.id}
              onUpdate={(payload) => this.onUpdate(element.id, payload)}
              {...element}>
              <div className="element" style={{
                width: element.width,
                height: element.height,
                background: element.background
              }}>
              </div>
            </Transform>
          ))
        }
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
          }
        }
        return item
      })
    })
  }
}

export default App;
