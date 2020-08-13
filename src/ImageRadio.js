import React from 'react';
import './ImageRadio.css';

class ImageRadio extends React.Component {
  
  handleClick = () => {
    if (this.props.onChange) this.props.onChange(this.props.value);
    else if (this.props.onClick) this.props.onClick(this.props.value);
  }

  render() {
    let classes = 'imageRadio';
    if (this.props.large) classes += ' large';
    else if (this.props.medium) classes += ' medium';
    else if (this.props.small) classes += ' small';

    let content;
    if (this.props.imgSrc) content = <img className='imageRadioContent' src={this.props.imgSrc} alt={this.props.altText} />
    else if (this.props.solidColor) content = <div className='imageRadioContent' style={{backgroundColor: this.props.solidColor}} />

    let label;
    if (this.props.label) label=<p>{this.props.label}</p>
    return(
      <div className='imageRadioWrapper'>
        <input
          type='radio'
          checked={this.props.checked}
          name={this.props.name}
          value={this.props.value}
          onClick={this.handleClick}
        />
        <div className={classes}>
          {content}
          {label}
        </div>
      </div>
    )
  }
}

export default ImageRadio;