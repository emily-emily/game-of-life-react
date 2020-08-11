import React from 'react';
import Cell from './Cell';
import './Grid.css';

class Grid extends React.Component {

  render() {
    let width = this.props.grid.length * 20;

    let cells = this.props.grid.map((row, r) => {
      return row.map((val, c) => {
        return <Cell
          boxId={r + '_' + c}
          key={r + '_' + c}
          populated={val}
          toggleCellFunc={this.props.toggleCellFunc}
        />;
      });
    });

    return (
      <div
        className='grid'
        style={{width: width}}
      >
        {cells}
      </div>
    );
  }
}

export default Grid;