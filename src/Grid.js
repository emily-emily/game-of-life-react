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
    let populatedStyle = { backgroundColor: this.props.cellColor };

    return (
      <td
        style={this.props.populated ? populatedStyle : {}}
        className={this.props.interactive ? 'interactive cell' : 'cell'}
        onClick={() => {if (this.props.interactive) this.props.toggleCellFunc(this.props.boxId)}}
      />
    );
  }
}

export default Grid;