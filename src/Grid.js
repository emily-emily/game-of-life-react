import React from 'react';
import './Grid.css';

class Grid extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shadowLocation: '0_0'
    };
  }
  
  handleMouseEnter = (id) => {
    this.setState({ shadowLocation: id });
  }

  render() {
    let gridTable = null;
    
    // create grid
    if (this.props.grid){
      let gridCopy = this.props.grid.map(function(arr) { return arr.slice(); });

      // add shadow
      if (this.props.shadowGrid){
        let x = parseInt(this.state.shadowLocation.substring(0, this.state.shadowLocation.indexOf('_')));
        let y = parseInt(this.state.shadowLocation.substring(this.state.shadowLocation.indexOf('_') + 1));
  
        for (let i = 0; i < this.props.shadowGrid.length; i++){
          for (let j = 0; j < this.props.shadowGrid[0].length; j++){
            if (x + i < this.props.grid.length && y + j < this.props.grid[0].length){
              gridCopy[x + i][y + j] = this.props.shadowGrid[i][j];
            }
          }
        }
      }

      gridTable = gridCopy.map((row, r) => {
        return <tr key={r}>
          {
            row.map((val, c) => {
              return <Cell
                interactive={this.props.interactive}
                cellSize={this.props.cellSize}
                boxId={r + '_' + c}
                key={r + '_' + c}
                populated={val}
                cellColor={this.props.cellColor}
                toggleCellFunc={this.props.toggleCellFunc}
                onMouseEnter={this.handleMouseEnter}
              />;
            })
          }
        </tr>
      })
    }

    return (
      <table className='grid'>
        <tbody>
          { gridTable }
        </tbody>
      </table>
    );
  }
}

class Cell extends React.Component {

  render() {
    let cellStyle = {
      backgroundColor: this.props.populated ? this.props.cellColor : undefined,
      height: this.props.cellSize ? this.props.cellSize : '20px',
      width: this.props.cellSize ? this.props.cellSize : '20px'
    }

    return (
      <td
        style={cellStyle}
        className={this.props.interactive ? 'interactive cell' : 'cell'}
        onClick={() => {if (this.props.interactive) this.props.toggleCellFunc(this.props.boxId)}}
        onMouseEnter={() => this.props.onMouseEnter(this.props.boxId)}
      />
    );
  }
}

export default Grid;