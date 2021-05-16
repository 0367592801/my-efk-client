import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./supportedFile/Book.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const styleHeaderContent = {
      color: "black",
      fontSize: "20px",
      backgroundImage: "url('/img/bg-pagetitle.jpg')",
      backgroundPosition: "center",
      backgroundSize: "cover",
      // textAlign: "center",
      padding: "20px 10px",
      color: "white",
    };
    return (
      <React.Fragment>
        <div style={styleHeaderContent}>
          <span
            className="goback"
            style={{ fontSize: "15px", color: "white" }}
            onClick={() => this.props.history.goBack()}
          >
            Go back
          </span>
          <h1 style={{ color: "white", fontSize: "30px", textAlign: "center" }}>
            {this.props.content}
          </h1>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Header);
