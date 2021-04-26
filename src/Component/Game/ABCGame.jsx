import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Menu from "../../Component/Menu";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import Countdown from "react-countdown";
import "./style.css";

class ABCGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AlphaArray: this.shuffleArray([
        { value: "A", key: 0 },
        { value: "B", key: 1 },
        { value: "C", key: 2 },
        { value: "D", key: 3 },
        { value: "E", key: 4 },
        { value: "F", key: 5 },
        { value: "G", key: 6 },
        { value: "H", key: 7 },
        { value: "I", key: 8 },
        { value: "J", key: 9 },
        { value: "K", key: 10 },
        { value: "L", key: 11 },
        { value: "M", key: 12 },
        { value: "N", key: 13 },
        { value: "O", key: 14 },
        { value: "P", key: 15 },
        { value: "Q", key: 16 },
        { value: "R", key: 17 },
        { value: "S", key: 18 },
        { value: "T", key: 19 },
        { value: "U", key: 20 },
        { value: "V", key: 21 },
        { value: "W", key: 22 },
        { value: "X", key: 23 },
        { value: "Y", key: 24 },
        { value: "Z", key: 25 },
      ]),
      screenIndex: 0,
      startIndex: [],
      startKey: 0,
      seconds: 30,
    };
    this.timerRef = React.createRef();
  }
  shuffleArray = (array) => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  render() {
    const Completionist = () => {
      if (this.state.startKey == 26) return <span>Very nice, you win!</span>;
      else return <span>You lose! Try again?</span>;
    };
    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (this.state.startKey !== 0) this.state.seconds = seconds;
      if (completed || this.state.startKey === 26) {
        // Render a completed state
        return <Completionist />;
      } else {
        // Render a countdown
        return (
          <div className="timer">
            <span style={{ fontSize: "40px" }}>{this.state.seconds}</span>
          </div>
        );
      }
    };
    console.log(this.state);
    return (
      <React.Fragment>
        <Menu />
        <Header content="ABC Game" />
        <div
          className="div-title-game"
          style={{ display: this.state.screenIndex === 0 ? "block" : "none" }}
        >
          <div
            className="div-start"
            onClick={() => {
              this.setState({ screenIndex: 1 });
            }}
          ></div>
        </div>
        <div
          className="div-game-abc"
          style={{ display: this.state.screenIndex === 1 ? "flex" : "none" }}
        >
          <div className="div-timer">
            <Countdown
              ref={this.timerRef}
              date={Date.now() + this.state.seconds * 1000}
              renderer={renderer}
              autoStart={false}
            />
          </div>
          {this.state.AlphaArray.map((item) => {
            return (
              <div
                className="div-letter"
                onClick={() => {
                  if (this.state.startKey === item.key) {
                    console.log(this.timerRef);
                    if (this.state.startKey === 0)
                      this.timerRef.current.start();
                    this.setState({
                      AlphaArray: this.state.AlphaArray.filter(
                        (item) => item.key !== this.state.startKey
                      ),
                      startKey: this.state.startKey + 1,
                    });
                  }
                }}
              >
                <span
                  style={{
                    color: "rgb(17, 0, 255)",
                    fontSize: "60px",
                    fontWeight: "bold",
                  }}
                >
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default ABCGame;
