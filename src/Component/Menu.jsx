import { formatCountdown } from "antd/lib/statistic/utils";
import { withRouter } from "react-router-dom";
import React, { Children, Component } from "react";
import "./supportedFile/Menu.css";
import { Link } from "react-router-dom";
// import "./supportedFile/Menu.js";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: null,
    };
  }

  componentDidMount() {
    this.setState({ pathname: this.props.location.pathname });
    console.log(sessionStorage.getItem("isAdmin"));
  }

  render() {
    const logoStyle = {
      height: "150px",
      width: "100%",
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
    const active = {
      color: "#fb0",
      borderBottom: "solid #fb0 5px",
    };
    console.log(this.state);
    return (
      <div className="menu-container">
        <div className="logo" style={logoStyle}>
          <img src="/img/logo3.png" alt="" />
        </div>
        {this.state.pathname !== null ? (
          <React.Fragment>
            <div className="menu">
              <ul className="ul-menu">
                <li>
                  <Link to={{ pathname: "/homepage" }}>
                    <span
                      style={this.state.pathname === "/homepage" ? active : {}}
                    >
                      Homepage
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={{ pathname: "/seasons" }}>
                    <span
                      style={this.state.pathname === "/seasons" ? active : {}}
                    >
                      All Seasons
                    </span>
                  </Link>
                </li>
                <li>
                  <Link>
                    <span>About us</span>
                  </Link>
                </li>
                <li>
                  <Link>
                    <span>News</span>
                  </Link>
                </li>
                <li>
                  <Link>
                    <span>Videos</span>
                  </Link>
                </li>
                <li>
                  <Link>
                    <span>Game</span>
                  </Link>
                </li>
                {sessionStorage.getItem("isAdmin") === "true" ? (
                  <li>
                    <Link to={{ pathname: "/addmultilpage" }}>
                      <span>Add Multil Page</span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
        <React.Fragment>
          <input type="checkbox" id="openmenu" className="hamburger-checkbox" />
          <div className="hamburger-icon">
            <label for="openmenu" id="hamburger-label">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>

          <div className="menu-pane" id="menu">
            <nav>
              <ul className="menu-links">
                <li>
                  <Link href="###" for="openmenu">
                    MAIN MENU
                  </Link>
                  <span id="QC-info">
                    <p>+84 367592801</p>
                  </span>
                </li>

                <li>
                  <Link to={{ pathname: "/homepage" }}>Home page</Link>
                </li>
                <li>
                  <Link href="###">Our Staff</Link>
                </li>
                <li>
                  <Link href="###">Email: phantuanminhnh117@gmail.com</Link>
                </li>
              </ul>
              <ul className="menu-links">
                <li>
                  <Link href="###">LET'S LEARNING</Link>
                  <span id="DC-info">
                    <p>Best english website ever!</p>
                  </span>
                </li>

                <li>
                  <Link to={{ pathname: "/seasons" }}>All Season</Link>
                </li>
                <li>
                  <Link href="###">Video</Link>
                </li>
                <li>
                  <Link href="###">Game</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="body-text">{this.props.children}</div>
        </React.Fragment>
      </div>
    );
  }
}

export default withRouter(Menu);
