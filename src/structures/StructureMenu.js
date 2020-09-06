import React from 'react';
import { Modal } from 'semantic-ui-react';
import './StructureMenu.css';

import { structures as data } from './structures';
import Grid from './../Grid';

class StructureMenu extends React.Component {
  render() {
    let structures = data.map((s, i) => {
      return <StructureItem key={i} structure={s} stepFunc={this.props.stepFunc} />
    });

    return (
      <Modal
        closeIcon
        onClose={this.props.closeFunc}
        open={this.props.open}
      >
        <Modal.Header>Structures</Modal.Header>
        <Modal.Content>
          <div className='modal-content'>
            {structures}
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
      generation: 0,
      hover: false,
      structure: this.props.structure,
      grid: this.props.structure.grid,
      timer: setInterval(this.play, 1000)
    }
  }

  toggleHover = () => { this.setState({ hover: !this.state.hover}) }

  play = () => {
    if (this.state.hover) this.setState({ grid: this.props.stepFunc(this.state.grid) });
  }

  render() {
    return(
      <div className='structure-item' onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <p>{this.props.structure.name}</p>
        <Grid
          grid={this.state.grid}
          cellColor={'#616161'}
        />
      </div>
    );
  }
}

export default StructureMenu;