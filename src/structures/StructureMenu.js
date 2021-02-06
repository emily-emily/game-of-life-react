import React from 'react';
import { Modal, Button, Popup, Icon } from 'semantic-ui-react';
import './StructureMenu.css';

import { structures as data } from './structures';
import Grid from './../Grid';

// provide one unit of padding around the structure
data.forEach(s => {
  s.grid.forEach(row => {
    row.unshift(false);
    row.push(false);
  });

  let emptyRow = new Array(s.grid[0].length).fill(false);
  s.grid.unshift(emptyRow);
  s.grid.push(emptyRow);
});

class StructureMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
      detailsOpen: false,
      selectedGrid: data[0].grid,
      generation: 0
    }
  }

  // selects a new item to view in the details pane
  selectItem = (i) => {
    //console.log('selecting ' + i)
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

  render() {
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
            <div id='structure-list' className={!this.state.detailsOpen ? 'visible' : null}>
              {structures}
            </div>
            <div id='structure-details' className={this.state.detailsOpen ? 'visible' : null}>
              <div>
                <h3>{data[this.state.selected].name}</h3>
                <p>Dimensions: {data[this.state.selected].dimensions[0]}x{data[this.state.selected].dimensions[1]}</p>
                <p>Period: {data[this.state.selected].period}</p>
                <p>Type: {data[this.state.selected].type}</p>
                <Button icon labelPosition='left' onClick={() => this.props.placeStructFunc(this.state.selectedGrid)} disabled>
                  Place this structure!
                  <Icon name='paint brush' />
                </Button>
                <Button className='back-button' onClick={() => this.setState({ detailsOpen: false })}>Back</Button>
              </div>
              <div id='structure-grid'>
                <Grid
                  grid={this.state.selectedGrid}
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

  play = () => { if (this.state.hover && this.props.structure.type !== 'spaceship') this.setState({ grid: this.props.stepFunc(this.state.grid) }) }

  render() {
    // different cell sizes for different grid sizes
    let gridSize = this.state.grid.length;
    let cellSize;

    if (gridSize <= 5) cellSize = '20px';
    else if (gridSize <= 10) cellSize = '17px';
    else if (gridSize <= 15) cellSize = '13px';
    else cellSize = '10px';

    return (
      <div
        className='structure-item'
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        onClick={() => this.props.selectItemFunc(this.props.i)}
      >
        <p>{this.props.structure.name}</p>
        <Grid
          padded
          grid={this.state.grid}
          cellColor='#616161'
          cellSize={cellSize}
        />
      </div>
    );
  }
}

export default StructureMenu;