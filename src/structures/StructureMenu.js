import React from 'react';
import { Modal } from 'semantic-ui-react';

import { structures } from './structures';

class StructureMenu extends React.Component {
  render() {

    let structuresJSX = structures.map((s, i) => {
      return <p key={i}>{s.name}</p>
    });

    return (
      <Modal
        closeIcon
        onClose={this.props.closeFunc}
        open={this.props.open}
      >
        <Modal.Header>Structures</Modal.Header>
        <Modal.Content>
          {structuresJSX}
        </Modal.Content>
      </Modal>
    )
  }
}

export default StructureMenu;