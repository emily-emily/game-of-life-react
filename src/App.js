import React from 'react';
import './App.css';
import  { Button, Icon, Modal } from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';

import Grid from './Grid';

class App extends React.Component {
  constructor(props) {
    super(props);

    let rows = 30;
    let cols = 30;

    this.timer = null;

    this.state = {
      rows: rows,
      cols: cols,
      grid: (new Array(rows)).fill().map(() => { return new Array(cols).fill(false) }),
      playing: false,
      interval: 500,
      color: '#f0e446',
      settingsModal: false
    }
  }

  togglePlay = () => {
    if (this.state.playing){ clearInterval(this.timer) }
    else { this.timer = setInterval(this.step, this.state.interval) }
    this.setState({ playing: !this.state.playing });
  }

  openSettingsModal = () => { this.setState({ settingsModal: true }) }
  closeSettingsModal = () => { this.setState({ settingsModal: false }) }

  handleIntervalSliderChange = (val) => {this.setState({ interval: val })}

  step = () => {
    var gridCopy = this.state.grid.map(function(arr) { return arr.slice(); });

    for (let r = 0; r < this.state.rows; r++){
      for (let c = 0; c < this.state.cols; c++){
        let neighours = this.nLiveNeighbours(r, c);
        if (this.cellIsPopulated(r, c)){
          // a cell dies if there are less than 2 or more than 3 neighbours
          if (neighours < 2 || neighours > 3) gridCopy[r][c] = false;
        }
        // an empty cell becomes a live cell if there are exactly 3 neighbours
        else if (neighours === 3) gridCopy[r][c] = true;
      }
    }

    this.setState({ grid: gridCopy });
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
    
    this.setState({ grid: grid });
  }

  randomSeedGrid = () => {
    let grid = (new Array(this.state.rows)).fill().map(() => { return new Array(this.state.cols).fill(false) });

    for (let i = 0; i < this.state.rows; i++)
      for (let j = 0; j < this.state.cols; j++)
        if (Math.floor(Math.random() * 5) === 1)
          grid[i][j] = true;
    
    this.setState({ grid: grid });
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
    return (
      <div className='app'>
        <h1>Game of Life</h1>
        <Grid
          grid={this.state.grid}
          toggleCellFunc={this.toggleCell}
          cellColor={this.state.color}
        />

        <div className='button-container'>
          <Button primary icon onClick={this.togglePlay}><Icon name={this.state.playing ? 'pause' : 'play'} /></Button>
          <Button onClick={this.step} disabled={this.state.playing}>Step</Button>
          <Button onClick={this.resetGrid} disabled={this.state.playing}>Reset Grid</Button>
          <Button onClick={this.randomSeedGrid} disabled={this.state.playing}>Seed</Button>
          <Button
            icon
            onClick={this.openSettingsModal}
            disabled={this.state.playing}
          >
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
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default App;