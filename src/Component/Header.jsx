import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const styleHeaderContent = {
      color: "black",
      fontSize: "50px",
      backgroundImage: "url('/img/bg-pagetitle.jpg')",
      backgroundPosition: "center",
      backgroundSize: "cover",
      // textAlign: "center",
      padding: "50px 30px",
      color: "white",
    };
    return (
      <React.Fragment>
        <div style={styleHeaderContent}>
          <h1 style={{ color: "white", fontSize: "50px" }}>
            {this.props.content}
          </h1>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Header);
