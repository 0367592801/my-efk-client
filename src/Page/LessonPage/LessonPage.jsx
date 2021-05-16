import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Book from "../../Component/Book";
import Menu from "../../Component/Menu";
import { Link } from "react-router-dom";
import { getSeason } from "../../Service/api";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import Swal from "sweetalert2";
// const LessonModal = (props) => {
//   let style = {
//     height: "100vh",
//     width: "90vh",
//     float: "right",
//     zIndex: "1000",
//   };
//   return (
//     <div style={style}>
//       <Book pages={props.book.pages} />
//     </div>
//   );
// };

class LessonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: null,
      isError: false,
      book: null,
    };
  }

  componentDidMount() {
    this.getLessons();
    console.log(this.props);
  }

  getLessons = async () => {
    try {
      let res = await getSeason(this.props.match.params.seasonId);
      console.log(res);
      await this.setState({ lessons: res.data.lessons });
    } catch (e) {
      this.setState({ isError: true });
    }
  };

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <Menu />
        <Header content="CHOSE LESSON TO LEARN!" />
        {this.state.lessons !== null ? (
          <React.Fragment>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "20px 20px",
                justifyContent: "center",
                justifyContent: "space-around",
              }}
            >
              {this.state.lessons.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: "300px",
                      display: "flex",
                      flexDirection: "column",

                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: "#97b534 ",
                      borderRadius: "12px",
                    }}
                  >
                    <img src="/img/pricing1.png" />
                    <div
                      style={{
                        width: "70%",
                        borderRadius: "10px",
                        textAlign: "center",
                        backgroundColor: "white",
                      }}
                    >
                      <h1 style={{ color: "#9b9b9b" }}>{item.description}</h1>
                      <h4 style={{ color: "#9b9b9b" }}>{item.lesson_name}</h4>
                    </div>
                    <h3
                      className="get-start-lesson"
                      // to={{ pathname: `/book/${item.id}` }}
                      onClick={() => {
                        console.log("ok");
                        Swal.fire({
                          title:
                            "<strong>Choose the part that you want to learn.</strong>",
                          icon: "question",
                          html:
                            "<a style='color:green' href='" +
                            `/book/${item.id}` +
                            "'>Read book.</a><br/>" +
                            "<a style='color:red' href='" +
                            `/video/${item.id}` +
                            "'>Watch practice video of this lesson.</a><br/>" +
                            "<a style='color:blue' href='" +
                            `/ABCGame` +
                            "'}}>Play game.</a><br/>" +
                            "<a style='color:purple' href='" +
                            `/test/${item.test_exam}` +
                            "'>Do test exam.</a><br/>",
                          showCancelButton: true,
                        });
                      }}
                    >
                      Get start!
                    </h3>
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(LessonPage);
