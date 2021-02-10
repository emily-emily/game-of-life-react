import React from 'react';
import './App.css';
import  { Button, Icon, Modal, Table } from 'semantic-ui-react';

import Grid from './Grid';
import Settings from './Settings';
import StructureMenu from './structures/StructureMenu';

class App extends React.Component {
  constructor(props) {
    super(props);

    // initial number of rows/cols. Will be updated in componentDidMount()
    let initialRows = 5;
    let initialCols = 5;

    this.timer = null; // timer for auto-playing
    this.cellSize = 20; // cell size in px

    this.mouseButton = -1;
    this.startedDrag = null;

    this.state = {
      // main grid
      grid: (new Array(initialRows)).fill().map(() => { return new Array(initialCols).fill(0) }),
      playing: false,
      generation: 0,

      settings: {
        interval: 500, // auto-play interval in ms
        color: '#242424', // default cell color
      },

      // grid of the structure that is being placed
      selectedStructGrid: null,

      // modals
      settingsModalOpen: false,
      structureMenuOpen: false,
      helpModalOpen: false,

      // shows help modal (keyboard shortcuts) for large devices only
      helpEnabled: false
    }
  }

  toggleAutoPlay = () => {
    if (this.state.playing){ clearInterval(this.timer) }
    else { this.timer = setInterval(this.play, this.state.settings.interval) }
    this.setState({ playing: !this.state.playing });
  }

  openSettingsModal = () => { this.setState({ settingsModalOpen: true }) }
  closeSettingsModal = () => {console.log("close"); this.setState({ settingsModalOpen: false }) }

  openStructureMenu = () => { this.setState({ structureMenuOpen: true }) }
  closeStructureMenu = () => { this.setState({ structureMenuOpen: false }) }

  openHelpModal = () => { this.setState({ helpModalOpen: true }) }
  closeHelpModal = () => { this.setState({ helpModalOpen: false }) }

  updateSettings = (newSettings) => {
    this.setState({ settings: newSettings });
  }

  // steps one generation on the main grid
  play = () => {
    let newGrid = this.step(this.state.grid);

    // update grid and increment generation counter
    this.setState({
      grid: newGrid,
      generation: this.state.generation + 1
    });
  }

  // returns grid of the next generation
  step = (grid) => {
    // work on a copy of the grid
    let newGrid = grid.map(function(arr) { return arr.slice(); });
    for (let r = 0; r < grid.length; r++){
      for (let c = 0; c < grid[0].length; c++){
        let neighours = this.nLiveNeighbours(r, c, grid);
        if (this.cellIsPopulated(r, c, grid)){
          // a cell dies if there are less than 2 or more than 3 neighbours
          if (neighours < 2 || neighours > 3) newGrid[r][c] = 0;
        }
        // an empty cell becomes a live cell if there are exactly 3 neighbours
        else if (neighours === 3) newGrid[r][c] = 1;
      }
    }

    return newGrid;
  }

  // returns the number of living cells neighbouring the cell at row r, column c in grid g
  nLiveNeighbours = (r, c, g) => {
    let count = 0;
    if (this.cellIsPopulated(r - 1, c - 1, g)) count++;
    if (this.cellIsPopulated(r - 1, c, g)) count++;
    if (this.cellIsPopulated(r - 1, c + 1, g)) count++;
    if (this.cellIsPopulated(r, c - 1, g)) count++;
    if (this.cellIsPopulated(r, c + 1, g)) count++;
    if (this.cellIsPopulated(r + 1, c - 1, g)) count++;
    if (this.cellIsPopulated(r + 1, c, g)) count++;
    if (this.cellIsPopulated(r + 1, c + 1, g)) count++;
    return count;
  }

  cellIsPopulated = (r, c, grid) => { return (r >= 0 && c >= 0 && r < grid.length && c < grid[0].length && grid[r][c]) }

  // close structure menu and select structure to place
  startPlaceStructure = (grid) => {
    this.setState({
      structureMenuOpen: false,
      selectedStructGrid: grid
    });
  }

  // clears the main grid
  resetGrid = () => {
    let rows = this.state.grid.length;
    let cols = this.state.grid[0].length;
    let grid = (new Array(rows)).fill().map(() => { return new Array(cols).fill(0) });
    
    this.setState({
      grid: grid,
      generation: 0
    });
  }

  // fills each cell in the main grid with a random on/off state
  randomSeedGrid = () => {
    let rows = this.state.grid.length;
    let cols = this.state.grid[0].length;
    let grid = (new Array(rows)).fill().map(() => { return new Array(cols).fill(0) });

    for (let i = 0; i < rows; i++)
      for (let j = 0; j < cols; j++)
        if (Math.floor(Math.random() * 5) === 1)
          grid[i][j] = 1;
    
    this.setState({
      grid: grid,
      generation: 0
    });
  }
  
  // determines what happens when a cell is clicked
  onCellClick = (id) => {
    if (this.state.selectedStructGrid)
      this.confirmPlaceStructure(id);
  }

  // determines what happens when the mouse drags across the grid
  // evtype: "mouseenter" or "mousedown"
  onCellDrag = (id, evtype) => {
    if (this.mouseButton === 0)
      this.drawCell(id, 1);
    else if (this.mouseButton === 2)
      this.drawCell(id, 0);

    // mouse button has not yet been updated; store id in variable to access when it is updated
    else if (!this.startedDrag && evtype === "mousedown") {
      this.startedDrag = id;
    }
  }

  // places the structure on the grid
  confirmPlaceStructure = (id) => {
    id = id.split('_');
    let x = parseInt(id[0]);
    let y = parseInt(id[1]);
    let gridCopy = this.state.grid.map(function(arr) { return arr.slice(); });

    for (let i = 0; i < this.state.selectedStructGrid.length; i++){
      for (let j = 0; j < this.state.selectedStructGrid[0].length; j++){

        // only structure within the grid is placed
        if (x + i < gridCopy.length && y + j < gridCopy[0].length){
          
          // edit grid only if structure has a live cell at that position
          if (this.state.selectedStructGrid[i][j])
            gridCopy[x + i][y + j] = this.state.selectedStructGrid[i][j];
        }
      }
    }

    this.setState({
      grid: gridCopy,
      selectedStructGrid: null
    });
  }

  // updates a cell with a new value
  drawCell = (id, val) => {
    if (!this.state.playing){
      id = id.split('_');
      let r = id[0];
      let c = id[1];
  
      let grid = this.state.grid.map(function(arr) { return arr.slice(); });
  
      grid[r][c] = val;
  
      this.setState({ grid: grid });
    }
  }

  handleKeyup = (ev) => {
    if (this.state.selectedStructGrid){
      // escape: cancels structure placement
      if (ev.keyCode === 27){
        if (this.state.selectedStructGrid !== null)
          this.setState({ selectedStructGrid: null });
      }
  
      // f: flips structure
      if (ev.keyCode === 70){
        // f: horizontal flip
        // shift-f: vertical flip
        this.structureFlip(ev.shiftKey ? 1 : 0);
      }

      // a / left-arrow: rotates structure counter-clockwise
      if (ev.keyCode === 65 || ev.keyCode === 37){
        this.structureRotate(-1);
      }

      // d / right-arrow: rotates structure clockwise
      if (ev.keyCode === 68 || ev.keyCode === 39){
        this.structureRotate(1);
      }
    }
  }

  // flips the selected structure
  // notes: dir = 0 flips horizontally
  //        dir = 1 flips vertically
  structureFlip = (dir) => {
    let gridCopy = this.state.selectedStructGrid.map(function(arr) { return arr.slice(); });

    // horizontal flip
    if (dir === 0){
      gridCopy.forEach(row => row.reverse());
    }
    // vertical flip
    else if (dir === 1){
      gridCopy.reverse();
    }

    this.setState({ selectedStructGrid: gridCopy });
  }

  // rotates the selected structure
  // notes: if dir < 0 then structure will rotate counter-clockwise
  //        if dir > 0 then structure will rotate clockwise
  structureRotate = (dir) => {
    let currGrid = this.state.selectedStructGrid;
    // newGrid is currGrid reflected across the diagonal from the top left to the bottom right
    //   the ith column in currGrid is the ith row in newGrid.
    let newGrid = currGrid[0].map((col, i) => currGrid.map(row => row[i]));

    // flip vertically for counter-clockwise rotation
    if (dir < 0)
      newGrid.reverse();
    // flip horizontally for clockwise rotation
    else if (dir > 0)
      newGrid.forEach(row => row.reverse());

    // update grid
    this.setState({ selectedStructGrid: newGrid });
  }
  
  handleResize = (ev) => {
    this.resizeGrid();

    let deviceW = window.innerWidth;
    if (deviceW < 700 && this.state.helpEnabled){
      this.setState({
        helpModalOpen: false,
        helpEnabled: false
      });
    }
    else if (deviceW >= 700 && !this.state.helpEnabled){
      this.setState({ helpEnabled: true });
    }
  }

  // resizes the grid to match the device
  resizeGrid = () => {
    let deviceW = window.innerWidth;
    let deviceH = window.innerHeight;

    // new width and height of grid in cells
    let newW = parseInt((deviceW * 0.8) / this.cellSize);
    let newH = parseInt((deviceH - 200) / this.cellSize);

    // width and height must be at least 5
    if (newW < 5) newW = 5;
    if (newH < 5) newH = 5;

    // cap width and height at 64 and 32
    if (newW > 64) newW = 64;
    if (newH > 32) newH = 32;
    
    let gridCopy = this.state.grid.map(function(arr) { return arr.slice(); });

    // pop rows until the new height is satisfied
    if (newH < gridCopy.length){
      while (gridCopy.length > newH)
        gridCopy.pop();
    }
    // append empty rows until the new width is satisfied
    else if (newH > gridCopy.length) {
      while (gridCopy.length < newH){
        let emptyRow = new Array(gridCopy[0].length).fill(0);
        gridCopy.push(emptyRow);
      }
    }

    // pop elements from each row until the new width is satisfied
    if (newW < gridCopy[0].length){
      gridCopy.forEach(row => {
        while (row.length > newW)
          row.pop();
      });
    }
    // append 0s to each row until the new width is satisfied
    else if (newW > gridCopy[0].length){
      gridCopy.forEach(row => {
        while (row.length < newW)
          row.push(0);
      });
    }

    this.setState({ grid: gridCopy });
  }

  handleMouseDown = (ev) => {
    this.mouseButton = ev.button;

    // mouse button is updated after event fires. Call function to draw on the first cell
    if (this.startedDrag){
      // draw appropriate value to cell
      if (this.mouseButton === 0)
        this.drawCell(this.startedDrag, 1);
      else if (this.mouseButton === 2)
        this.drawCell(this.startedDrag, 0);
      
      // reset variable
      this.startedDrag = null;
    }
  }

  handleMouseUp = (ev) => { this.mouseButton = -1 }
  
  handleContextMenu = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    return false;
  }

  componentDidMount = () => {
    document.addEventListener('keyup', this.handleKeyup, false);
    document.addEventListener('mousedown', this.handleMouseDown, false);
    document.addEventListener('mouseup', this.handleMouseUp, false);
    window.addEventListener('resize', this.handleResize, false);
    document.addEventListener('contextmenu', this.handleContextMenu, false);

    // resize grid to fit device
    this.resizeGrid();
  }

  componentWillUnmount = () => {
    document.removeEventListener('keyup', this.handleKeyup, false);
    document.removeEventListener('mousedown', this.handleMouseDown, false);
    document.removeEventListener('mouseup', this.handleMouseUp, false);
    window.removeEventListener('resize', this.handleResize, false);
    document.removeEventListener('contextmenu', this.handleContextMenu , false);
  }

  render() {
    return (
      <div className='app' onMouseMove={this.updateCursorXY}>
        <div className='title'>Game of Life</div>
        <Grid
          // grid is interactive unless autoplaying or placing structure
          interactive={!this.state.playing && !this.state.selectedStructGrid}
          placingStruct={this.state.selectedStructGrid != null}
          grid={this.state.grid}
          cellClickFunc={this.onCellClick}
          cellDragFunc={this.onCellDrag}
          cellColor={this.state.settings.color}
          cellSize={this.cellSize}
          shadowGrid={this.state.selectedStructGrid}
        />
        <p>Generation: {this.state.generation}</p>

        {/* bottom action bar */}
        <div className='button-container'>
          <Button
            primary icon
            onClick={this.toggleAutoPlay}
            disabled={this.state.selectedStructGrid !== null}
          >
            <Icon name={this.state.playing ? 'pause' : 'play'} />
          </Button>
          <Button onClick={this.play} disabled={this.state.playing || this.state.selectedStructGrid !== null}>Step</Button>
          <Button icon onClick={this.openStructureMenu} disabled={this.state.playing || this.state.selectedStructGrid !== null}>
            <Icon name='folder outline' />
          </Button>
          <Button onClick={this.resetGrid} disabled={this.state.playing || this.state.selectedStructGrid !== null}>Reset Grid</Button>
          <Button onClick={this.randomSeedGrid} disabled={this.state.playing || this.state.selectedStructGrid !== null}>Seed</Button>
          <Button icon onClick={this.openSettingsModal} disabled={this.state.playing || this.state.selectedStructGrid !== null}>
            <Icon name='setting' />
          </Button>
          {
            this.state.helpEnabled
            ? <Button icon onClick={this.openHelpModal} disabled={this.state.playing || this.state.selectedStructGrid !== null}>
                <Icon name='question' />
              </Button>
            : null
          }
          
        </div>

        {/* settings modal */}
        <Settings
          settings={this.state.settings}
          open={this.state.settingsModalOpen}
          updateSettingsFunc={this.updateSettings}
          closeFunc={this.closeSettingsModal}
        />

        {/* structure menu */}
        <StructureMenu
          open={this.state.structureMenuOpen}
          stepFunc={this.step}
          closeFunc={this.closeStructureMenu}
          placeStructFunc={this.startPlaceStructure}
        />

        {/* help modal */}
        <HelpModal
          open={this.state.helpModalOpen}
          closeFunc={this.closeHelpModal}
        />
      </div>
    );
  }
}

class HelpModal extends React.Component {
  render(){
    return (
      <Modal
        closeIcon
        onClose={this.props.closeFunc}
        open={this.props.open}
      >
        <Modal.Header>Help</Modal.Header>
        <Modal.Content>
          <div id='help-content'>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Key</Table.HeaderCell>
                  <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>esc</Table.Cell>
                  <Table.Cell>Cancel structure placement</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>f</Table.Cell>
                  <Table.Cell>Flip structure horizontally</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>shift f</Table.Cell>
                  <Table.Cell>Flip structure vertically</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>a / left-arrow</Table.Cell>
                  <Table.Cell>Rotate structure counter-clockwise</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>d / right-arrow</Table.Cell>
                  <Table.Cell>Rotate structure clockwise</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </Modal.Content>
      </Modal>
    )
  }
}

export default App;