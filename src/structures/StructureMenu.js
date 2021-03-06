import React from 'react';
import { Modal, Button, Popup, Icon } from 'semantic-ui-react';
import './StructureMenu.css';

import { structures as data } from './structures';
import Grid from './../Grid';

/* StructureMenu displays the structure menu.
 * 
 * Props: * open: whether the menu is visible
 *        * stepFunc: function to step a grid forward
 *        * closeFunc: function to close the menu
 *        * placeStructFunc: function to start placing a structure
*/
class StructureMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0, // id of selected structure
      detailsOpen: false, // details pane open?
      selectedGrid: data[0].grid, // grid data for selected structure
      generation: 0 // generation of the structure in the details pane
    }
  }

  // selects a new item to view in the details pane
  selectItem = (i) => {
    this.setState({
      selected: i,
      detailsOpen: true,
      selectedGrid: data[i].grid,
      generation: 0
    });
  }

  // steps a grid forward
  nextGen = () => {
    this.setState({
      selectedGrid: this.props.stepFunc(this.state.selectedGrid),
      generation: (this.state.generation + 1) % data[this.state.selected].period
    });
  }

  // returns the grid without the padding around the structure
  removePadding = (grid) => {
    let gridCopy = grid.map(function(arr) { return arr.slice(); });

    // remove empty first and last rows
    gridCopy.shift();
    gridCopy.pop();

    // remove empty units at the beginning and end of each row
    gridCopy.forEach(row => {
      row.shift();
      row.pop();
    });

    return gridCopy;
  }

  componentDidMount = () => {

    // provide one unit of padding around the structure
    data.forEach(s => {
      // add one empty unit at the beginning and end of each row
      s.grid.forEach(row => {
        row.unshift(0);
        row.push(0);
      });
    
      // add empty first and last rows
      let emptyRow = new Array(s.grid[0].length).fill(0);
      s.grid.unshift(emptyRow);
      s.grid.push(emptyRow);
    });
  }

  render() {
    // array of structures to display
    let structures = data.map((s, i) => {
      return <StructureItem
        key={i}
        i={i}
        structure={s}
        stepFunc={this.props.stepFunc}
        selectItemFunc={this.selectItem}
      />
    });

    return (
      <Modal
        closeIcon
        onClose={this.props.closeFunc}
        open={this.props.open}
      >
        <Modal.Header>Structures</Modal.Header>
        <Modal.Content>
          <div id='modal-content'>
            {/* main panel */}
            <div id='structure-list' className={!this.state.detailsOpen ? 'visible' : null}>
              {structures}
            </div>

            {/* detail panel */}
            <div id='structure-details' className={this.state.detailsOpen ? 'visible' : null}>
              <div>
                <h3>{data[this.state.selected].name}</h3>
                <p>Dimensions: {data[this.state.selected].dimensions[0]}x{data[this.state.selected].dimensions[1]}</p>
                <p>Period: {data[this.state.selected].period}</p>
                <p>Type: {data[this.state.selected].type}</p>
                <Button icon
                  labelPosition='left'
                  onClick={() => this.props.placeStructFunc(this.removePadding(this.state.selectedGrid))}
                >
                  Place this structure!
                  <Icon name='paint brush' />
                </Button>
                <Button className='back-button' onClick={() => this.setState({ detailsOpen: false })}>Back</Button>
              </div>
              <div id='structure-grid'>
                <Grid
                  grid={this.state.selectedGrid}
                  cellSize={300 / Math.max(this.state.selectedGrid.length, this.state.selectedGrid[0].length)}
                  cellColor={'#616161'}
                />
                <p>Generation {this.state.generation}</p>
                <Popup
                  content='Animation for spaceships is currently unavailable'
                  disabled={data[this.state.selected].type !== 'spaceship'}
                  trigger={
                    <span><Button
                      onClick={this.nextGen}
                      disabled={data[this.state.selected].type === 'spaceship'}
                    >Step</Button></span>
                  }
                />
              </div>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

/* StructureItem displays a single structure in the structure menu.
 * 
 * Props: * i: id of structure
 *        * structure: structure data
 *        * stepFunc: function to step a grid forward
 *        * selectItemFunc: selects current grid to view in detail panel
*/
class StructureItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      structure: this.props.structure,
      grid: this.props.structure.grid,
      timer: setInterval(this.play, 1000)
    }
  }

  toggleHover = () => { this.setState({ hover: !this.state.hover }) }

  // steps the grid forward one
  play = () => {
    if (this.state.hover && this.props.structure.type !== 'spaceship')
      this.setState({ grid: this.props.stepFunc(this.state.grid) })
  }

  render() {
    // different cell sizes for different grid sizes
    let gridSize = Math.max(this.state.grid.length, this.state.grid[0].length);
    let cellSize = (150 / gridSize);

    return (
      <div
        className='structure-item'
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        onClick={() => this.props.selectItemFunc(this.props.i)}
      >
        <p>{this.props.structure.name}</p>
        <Grid
          grid={this.state.grid}
          cellColor='#616161'
          cellSize={cellSize}
        />
      </div>
    );
  }
}

export default StructureMenu;