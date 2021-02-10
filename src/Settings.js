import React from 'react';
import './Settings.css';
import { Modal } from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';

import ImageRadio from './ImageRadio';


/* Settings displays the settings modal
 * 
 * Props: * settings: contains settings data from App
 *        * open: determines whether Settings is open
 *        * updateSettingsFunc: function to update settings in App state
 *        * closeFunc: function to close Settings
*/
class Settings extends React.Component {

  handleIntervalSliderChange = (val) => {
    let newSettings = {...this.props.settings};
    newSettings.interval = val;

    this.props.updateSettingsFunc(newSettings);
  }

  handleColorChange = (val) => {
    let newSettings = {...this.props.settings};
    newSettings.color = val;

    this.props.updateSettingsFunc(newSettings);
  }

  render() {
    // color options
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
        solidColor={c.hex}
        value={c.hex}
        label={c.name}
        onClick={this.handleColorChange}
        checked={c.hex === this.props.settings.color}
        key={i}
      />
    });

    return (
      <Modal
        closeIcon
        onClose={this.props.closeFunc}
        open={this.props.open}
      >
        <Modal.Header>Settings</Modal.Header>
        <Modal.Content>
          <div className='settings-item'>
            <label>Play Speed</label>
            <Slider
              discrete 
              color='blue'
              settings={{
                start: 1000 / this.props.settings.interval,
                min: 1,
                max: 5,
                step: 1,
                onChange: value => this.handleIntervalSliderChange(1000 / value)
              }}
            />
          </div>
          <div className='settings-item'>
            <label>Color</label><br />
            {colorOptions}
          </div>
        </Modal.Content>
      </Modal>
    )
  }
}

export default Settings;