import React from 'react';
import './App.css';

import Grid from './Grid';

class App extends React.Component {
  constructor(props) {
    super(props);

    let rows = 30;
    let cols = 30;

    this.state = {
      rows: rows,
      cols: cols,
      grid: (new Array(rows)).fill().map(() => { return new Array(cols).fill(false) })
    }
  }

  resetGrid = () => {
    //let grid = Array(this.state.rows).fill(Array(this.state.cols).fill(false));
    let grid = (new Array(this.state.rows)).fill().map(() => { return new Array(this.state.cols).fill(false) })
      
    this.setState({ grid: grid });
  }

  toggleCell = (id) => {
    id = id.split('_');
    let r = id[0];
    let c = id[1];

    let grid = this.state.grid.slice();

    grid[r][c] = !grid[r][c];

    this.setState({ grid: grid });
  }

  render() {
    return (
      <div className="App">
        <h1>Game of Life</h1>
        <Grid
          grid={this.state.grid}
          toggleCellFunc={this.toggleCell}
        />

        <button onClick={this.resetGrid}>Reset Grid</button>
      </div>
    );
  }
}

export default App;