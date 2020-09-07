import React from 'react';
import { Modal } from 'semantic-ui-react';
import './StructureMenu.css';

import { structures as data } from './structures';
import Grid from './../Grid';

class StructureMenu extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selected: 0,
      detailsOpen: false,
      selectedGrid: data[0].grid,
      generation: 0
    }
  }

  selectItem = (i) => {
    console.log('selecting ' + i)
    this.setState({
      selected: i,
      detailsOpen: true,
      selectedGrid: data[i].grid,
      generation: 0
    });
  }

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
                <button onClick={() => this.setState({detailsOpen: false})}>back</button>
              </div>
              <div id='structure-grid'>
                <Grid
                  grid={this.state.selectedGrid}
                  cellColor={'#616161'}
                />
                <p>Generation {this.state.generation}</p>
                <button onClick={this.nextGen}>Step</button>
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

  toggleHover = () => { this.setState({ hover: !this.state.hover}) }

  play = () => { if (this.state.hover) this.setState({ grid: this.props.stepFunc(this.state.grid) }) }

  render() {
    return(
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
          cellSize='17px'
        />
      </div>
    );
  }
}

export default StructureMenu;