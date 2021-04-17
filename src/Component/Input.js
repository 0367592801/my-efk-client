import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onChange = (event) => {
    this.props.funInput(event.target.value);
  };
  render() {
    const { type, placeholder, value } = { ...this.props };
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={this.onChange}
        style={this.props.style}
        autoComplete="off"
      />
    );
  }
}

export default Input;
