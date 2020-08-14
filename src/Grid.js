import React from 'react';
import './Grid.css';

class Grid extends React.Component {

  render() {
    let width = this.props.grid[0].length * 20;

    let cells = this.props.grid.map((row, r) => {
      return row.map((val, c) => {
        return <Cell
          boxId={r + '_' + c}
          key={r + '_' + c}
          populated={val}
          cellColor={this.props.cellColor}
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

class Cell extends React.Component {

  render() {
    let populatedStyle = {
      backgroundColor: this.props.cellColor
    }

    return (
      <div
        style={this.props.populated ? populatedStyle : {}}
        className='cell'
        onClick={() => this.props.toggleCellFunc(this.props.boxId)}
      />
    );
  }
}

export default Grid;