import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { apiUrl } from "../const/apiUrl";
import Menu from "./Menu";
import Header from "./Header";
import Footer from "./Footer";
import { getTestExam } from "../Service/api";
import "./supportedFile/Book.css";
import Swal from "sweetalert2";

class TestExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testExam: null,
      quizIndex: 0,
      answerArrays: [],
    };
  }

  componentDidMount() {
    this.getTestExam(this.props.match.params.testId);
  }

  getTestExam = async (id) => {
    try {
      let res = await getTestExam(id);
      console.log(res);
      await this.setState({
        testExam: res.data,
      });
    } catch (e) {}
  };

  priviouQuiz = async () => {
    await this.setState({ quizIndex: this.state.quizIndex - 1 });
  };

  nextQuiz = async () => {
    await this.setState({ quizIndex: this.state.quizIndex + 1 });
  };

  clickAnswer = async (answerContent) => {
    try {
      let answerIndex;
      switch (answerContent) {
        case this.state.testExam?.questions[this.state.quizIndex].first_answer:
          answerIndex = 1;
          break;
        case this.state.testExam?.questions[this.state.quizIndex].second_answer:
          answerIndex = 2;
          break;
        case this.state.testExam?.questions[this.state.quizIndex].third_answer:
          answerIndex = 3;
          break;
        case this.state.testExam?.questions[this.state.quizIndex].fourth_answer:
          answerIndex = 4;
          break;
        default:
          break;
      }
      let answer = {
        answerIndex: answerIndex,
        quizIndex: this.state.quizIndex,
      };

      this.state.answerArrays.push(answer);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Answered",
        showConfirmButton: false,
        timer: 1500,
      });
      if (this.state.quizIndex !== this.state.testExam.questions.length - 1) {
        await this.nextQuiz();
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong, please try again!",
      });
    }
  };

  render() {
    let ques = this.state.testExam?.questions[this.state.quizIndex];
    console.log(this.state.answerArrays);
    return (
      <React.Fragment>
        <Menu />
        {this.state.testExam && (
          <React.Fragment>
            <Header
              content={`${this.state.testExam.exam_name} (${this.state.testExam.exam_des})`}
            />
            <div className="test-exam">
              <span
                style={{
                  display: this.state.quizIndex === 0 ? "none" : "block",
                }}
                className="button"
                onClick={() => this.priviouQuiz()}
              >
                <img
                  style={{ transform: "rotate(180deg)" }}
                  src="/img/button.png"
                  width="50px"
                  height="50px"
                />
              </span>
              <div className="ques-content">
                <div className="ques">
                  <h2>{ques?.question_content}</h2>
                </div>
                {ques.question_img ? (
                  <img
                    style={{ margin: "20px 20px" }}
                    src={`${apiUrl}${ques.question_img.url}`}
                    height="500px"
                  />
                ) : (
                  ""
                )}
                <div className="answer-1-2">
                  <div
                    className="answer-1"
                    onClick={() => this.clickAnswer(ques?.first_answer)}
                  >
                    <h2>A: {ques?.first_answer}</h2>
                  </div>
                  <div
                    className="answer-2"
                    onClick={() => this.clickAnswer(ques?.second_answer)}
                  >
                    <h2>B: {ques?.second_answer}</h2>
                  </div>
                </div>
                <div className="answer-1-2">
                  <div
                    className="answer-3"
                    onClick={() => this.clickAnswer(ques?.third_answer)}
                  >
                    <h2>C: {ques?.third_answer}</h2>
                  </div>
                  <div
                    className="answer-4"
                    onClick={() => this.clickAnswer(ques?.fourth_answer)}
                  >
                    <h2>D: {ques?.fourth_answer}</h2>
                  </div>
                </div>
              </div>
              <span
                style={{
                  marginLeft: "40px",
                  display:
                    this.state.quizIndex ===
                    this.state.testExam.questions.length - 1
                      ? "none"
                      : "block",
                }}
                className="button"
                onClick={() => this.nextQuiz()}
              >
                <img src="/img/button.png" width="50px" height="50px" />
              </span>
            </div>
          </React.Fragment>
        )}
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(TestExam);
