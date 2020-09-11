import React from 'react';
import './Grid.css';

class Grid extends React.Component {

  render() {
    return (
      <table className='grid'>
        <tbody>
          {
            this.props.grid.map((row, r) => {
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
                    />;
                  })
                }
              </tr>
            })
          }
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
      />
    );
  }
}

export default Grid;