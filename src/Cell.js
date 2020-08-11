import React from 'react';
import './Cell.css';

class Cell extends React.Component {

  render() {
    return (
      <div
        className={this.props.populated ? 'populated cell' : 'cell'}
        onClick={() => this.props.toggleCellFunc(this.props.boxId)}
      />
    );
  }
}

export default Cell;