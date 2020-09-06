import React from 'react';
import './App.css';
import  { Button, Icon, Modal } from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';

import Grid from './Grid';
import ImageRadio from './ImageRadio';
import StructureMenu from './structures/StructureMenu';

class App extends React.Component {
  constructor(props) {
    super(props);

    let rows = 28;
    let cols = 40;

    this.timer = null;

    this.state = {
      rows: rows,
      cols: cols,
      grid: (new Array(rows)).fill().map(() => { return new Array(cols).fill(false) }),
      playing: false,
      interval: 500,
      color: '#242424',
      generation: 0,
      settingsModal: false,
      structureMenu: false
    }
  }

  toggleAutoPlay = () => {
    if (this.state.playing){ clearInterval(this.timer) }
    else { this.timer = setInterval(this.play, this.state.interval) }
    this.setState({ playing: !this.state.playing });
  }

  openSettingsModal = () => { this.setState({ settingsModal: true }) }
  closeSettingsModal = () => { this.setState({ settingsModal: false }) }

  openStructureMenu = () => { this.setState({ structureMenu: true }) }
  closeStructureMenu = () => { this.setState({ structureMenu: false }) }

  handleIntervalSliderChange = (val) => {this.setState({ interval: val })}
  handleColorChange = (val) => {this.setState({ color: val })}

  // steps one generation on the main grid
  play = () => {
    // step using a copy of the current grid
    let newGrid = this.step(this.state.grid.map(function(arr) { return arr.slice(); }));

    // update grid and increment generation counter
    this.setState({
      grid: newGrid,
      generation: this.state.generation + 1
    });
  }

  // returns grid of the next generation
  step = (grid) => {
    for (let r = 0; r < this.state.rows; r++){
      for (let c = 0; c < this.state.cols; c++){
        let neighours = this.nLiveNeighbours(r, c);
        if (this.cellIsPopulated(r, c)){
          // a cell dies if there are less than 2 or more than 3 neighbours
          if (neighours < 2 || neighours > 3) grid[r][c] = false;
        }
        // an empty cell becomes a live cell if there are exactly 3 neighbours
        else if (neighours === 3) grid[r][c] = true;
      }
    }

    return grid;
  }

  nLiveNeighbours = (r, c) => {
    let count = 0;
    if (this.cellIsPopulated(r - 1, c - 1)) count++;
    if (this.cellIsPopulated(r - 1, c)) count++;
    if (this.cellIsPopulated(r - 1, c + 1)) count++;
    if (this.cellIsPopulated(r, c - 1)) count++;
    if (this.cellIsPopulated(r, c + 1)) count++;
    if (this.cellIsPopulated(r + 1, c - 1)) count++;
    if (this.cellIsPopulated(r + 1, c)) count++;
    if (this.cellIsPopulated(r + 1, c + 1)) count++;
    return count;
  }

  cellIsPopulated = (r, c) => { return (r >= 0 && c >= 0 && r < this.state.rows && c < this.state.cols && this.state.grid[r][c]) }

  resetGrid = () => {
    //let grid = Array(this.state.rows).fill(Array(this.state.cols).fill(false));
    let grid = (new Array(this.state.rows)).fill().map(() => { return new Array(this.state.cols).fill(false) });
    
    this.setState({
      grid: grid,
      generation: 0
    });
  }

  randomSeedGrid = () => {
    let grid = (new Array(this.state.rows)).fill().map(() => { return new Array(this.state.cols).fill(false) });

    for (let i = 0; i < this.state.rows; i++)
      for (let j = 0; j < this.state.cols; j++)
        if (Math.floor(Math.random() * 5) === 1)
          grid[i][j] = true;
    
    this.setState({
      grid: grid,
      generation: 0
    });
  }

  toggleCell = (id) => {
    if (!this.state.playing){
      id = id.split('_');
      let r = id[0];
      let c = id[1];
  
      let grid = this.state.grid.slice();
  
      grid[r][c] = !grid[r][c];
  
      this.setState({ grid: grid });
    }
  }

  render() {
    let colors = [
      { name: 'Black', hex: '#242424' },
      { name: 'Red', hex: '#e60000' },
      { name: 'Orange', hex: '#ebab34' },
      { name: 'Yellow', hex: '#f0e446' },
      { name: 'Green', hex: '#1dc223' },
      { name: 'Blue', hex: '#1555c2' },
      { name: 'Purple', hex: '#9715c2' },
      { name: 'Pink', hex: '#f760e3' }
    ];

    let colorOptions = colors.map((c, i) => {
      return <ImageRadio
        small
        name='color'
        key={i}
        solidColor={c.hex}
        value={c.hex}
        label={c.name}
        onClick={this.handleColorChange}
        checked={c.hex === this.state.color}
      />
    });

    return (
      <div className='app'>
        <h1>Game of Life</h1>
        <Grid
          interactive
          grid={this.state.grid}
          toggleCellFunc={this.toggleCell}
          cellColor={this.state.color}
        />
        <p>Generation: {this.state.generation}</p>

        <div className='button-container'>
          <Button primary icon onClick={this.toggleAutoPlay}><Icon name={this.state.playing ? 'pause' : 'play'} /></Button>
          <Button onClick={this.play} disabled={this.state.playing}>Step</Button>
          <Button icon onClick={this.openStructureMenu} disabled={this.state.playing}>
            <Icon name='folder outline' />
          </Button>
          <Button onClick={this.resetGrid} disabled={this.state.playing}>Reset Grid</Button>
          <Button onClick={this.randomSeedGrid} disabled={this.state.playing}>Seed</Button>
          <Button icon onClick={this.openSettingsModal} disabled={this.state.playing}>
            <Icon name='setting' />
          </Button>
        </div>

        <Modal
          closeIcon
          onClose={this.closeSettingsModal}
          open={this.state.settingsModal}
        >
          <Modal.Header>Settings</Modal.Header>
          <Modal.Content>
            <label>Play Speed</label>
            <Slider
              discrete 
              color='blue'
              settings={{
                start: 1000/this.state.interval,
                min: 1,
                max: 5,
                step: 1,
                onChange: value => this.handleIntervalSliderChange(1000/value)
              }}
            />

            <label>Color</label><br />
            {colorOptions}
          </Modal.Content>
        </Modal>

        <StructureMenu
          open={this.state.structureMenu}
          closeFunc={this.closeStructureMenu}
        />
      </div>
    );
  }
}

export default App;