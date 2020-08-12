import React from 'react';
import './Cell.css';

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

export default Cell;