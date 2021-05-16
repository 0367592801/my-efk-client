import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./supportedFile/Book.css";
import { getDetailLesson, getPage } from "../Service/api";
import { apiUrl } from "../const/apiUrl";
import Menu from "./Menu";
import Header from "./Header";
import Footer from "./Footer";
import ReactPlayer from "react-player";

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = { urlVideo: null };
  }
  componentDidMount() {
    this.getPages(this.props.match.params.lessonId);
  }
  getPages = async (id) => {
    try {
      let res = await getDetailLesson(id);
      await this.setState({
        urlVideo: res.data.practice_video.url,
      });
    } catch (e) {}
  };
  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <Menu />
        <Header content="Lets go!" />
        <ReactPlayer
          height="800px"
          width="auto"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px",
          }}
          url={this.state.urlVideo ? `${apiUrl}${this.state.urlVideo}` : ""}
          playing={true}
          controls={true}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <button
            className="big-button homebutton"
            style={{ marginTop: "50px" }}
            onClick={() => this.props.history.push("/ABCGame")}
          >
            Play Game
          </button>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(Video);
