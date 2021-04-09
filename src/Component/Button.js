import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clickButton = () => {
    this.props.funButton();
  };

  render() {
    return (
      <button style={this.props.style} onClick={this.clickButton}>
        {this.props.value}
      </button>
    );
  }
}

export default Button;
