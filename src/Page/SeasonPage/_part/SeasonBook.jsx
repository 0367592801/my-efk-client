import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./SeasonBook.css";
import { apiUrl } from "../../../const/apiUrl";
import { Link } from "react-router-dom";

class SeasonBook extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <div className="bookWrap">
          <div className="book2">
            <Link to={`/lessons/${this.props.season.id}`}>
              <img
                className="cover"
                src={`${apiUrl}${this.props.season?.season_img?.url}`}
                alt=""
              />
            </Link>

            <div className="spine"></div>
          </div>
          <h2 style={{ textAlign: "center" }}>
            {this.props.season.season_name}
          </h2>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(SeasonBook);
