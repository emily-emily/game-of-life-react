import React from 'react';
import { Modal } from 'semantic-ui-react';
import './StructureMenu.css';

import { structures as data } from './structures';

class StructureMenu extends React.Component {
  render() {
    let structures = data.map((s, i) => {
      return <StructureItem structure={s} />
    });

    return (
      <Modal
        closeIcon
        onClose={this.props.closeFunc}
        open={this.props.open}
      >
        <Modal.Header>Structures</Modal.Header>
        <Modal.Content>
          {structures}
        </Modal.Content>
      </Modal>
    );
  }
}

class StructureItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      generation: 0
    }
  }

  render() {
    return(
      <div className='item'>
        <p>{this.props.structure.name}</p>
      </div>
    );
  }
}

export default StructureMenu;