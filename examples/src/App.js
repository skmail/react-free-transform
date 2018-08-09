import React, { Component } from 'react';

import Transform from 'react-free-transform'

class App extends Component {
  render() {
    const {prop1,...prop} = this.props
    return (
      <div className="App">

        <Transform>
          <div style={{
            width:150,
            height:150,
            backgroundColor:"#000"
          }}>

          </div>
        </Transform>
      </div>
    );
  }
}

export default App;
