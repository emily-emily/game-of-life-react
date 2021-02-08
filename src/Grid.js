import React from 'react';
import './Grid.css';
    
/* Grid displays a grid.
 * 
 * Props: * interactive (bool): determines whether cells can be toggled
 *        * grid (matrix): grid data
 *        * cellClickFunc(cellId): function on cell click
 *        * cellColor: hex cell color
 *        * cellSize: cell size in pixels
 *        * shadowGrid: grid of structure being placed
*/
class Grid extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // shadow cell on mouse hover
      shadowLocation: '0_0'
    };
  }
  
  // set shadow to cell
  handleMouseEnter = (id) => {
    this.setState({ shadowLocation: id });
  }

  render() {
    // grid to be displayed
    let gridTable = null;
    
    // create grid
    if (this.props.grid){
      let gridCopy = this.props.grid.map(function(arr) { return arr.slice(); });

      // add shadow of the grid that is being placed
      if (this.props.shadowGrid){
        let cellId = (this.state.shadowLocation.slice()).split('_');
        let x = parseInt(cellId[0]);
        let y = parseInt(cellId[1]);
  
        for (let i = 0; i < this.props.shadowGrid.length; i++){
          for (let j = 0; j < this.props.shadowGrid[0].length; j++){
            if (x + i < this.props.grid.length && y + j < this.props.grid[0].length){
              gridCopy[x + i][y + j] = this.props.shadowGrid[i][j];
            }
          }
        }
      }

      // add cells to table
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
                cellClickFunc={this.props.cellClickFunc}
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

/* Cell displays a cell.
 * 
 * Props: * interactive (bool): determines whether the cell can be toggled
 *        * cellSize: cell size in pixels
 *        * boxId: id of the box. Format: r_c
 *        * populated (bool): whether the cell is populated or not
 *        * cellColor: hex cell color
 *        * cellClickFunc: function to call when a cell is clicked
 *        * onMouseEnter: function for mouse hover
*/
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
        onClick={this.props.interactive ? () => {this.props.cellClickFunc(this.props.boxId)} : null}
        onMouseEnter={() => this.props.onMouseEnter(this.props.boxId)}
      />
    );
  }
}

export default Grid;