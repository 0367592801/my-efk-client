import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import Menu from "../../Component/Menu";
import Footer from "../../Component/Footer";
import "antd/dist/antd.css";
import { Carousel } from "antd";
import "./home.css";

const carouselStyle = {
  width: "100%",
  height: "600px",
  backgroundColor: "#652442",
};
const contentStyle = {
  color: "#fff",
  marginBottom: "20px",
  textAlign: "center",
};
const carou1 = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  backgroundImage: `url("/img/home1-sl2.jpg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "600px",
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let jwt = sessionStorage.getItem("token");
    if (!jwt) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <React.Fragment>
        <Menu />
        <Carousel style={carouselStyle}>
          <div>
            <div style={carou1}>
              <h3 style={contentStyle}>LEARNING AND FUN</h3>
              <h2 style={contentStyle}>ENGLISH FOR CHILD</h2>
              <button
                className="big-button homebutton"
                style={{ marginTop: "50px" }}
                onClick={() => this.props.history.push("/seasons")}
              >
                START LEARNING NOW!
              </button>
              <img
                src="http://goodiez.zooka.io/wp-content/uploads/revslider/home-1/airplane1.png"
                alt=""
                width="433"
                height="263"
                style={{ position: "absolute", top: "20px" }}
              />
            </div>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
        </Carousel>

        <div
          className="container-fluid mt-12"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <div className="row">
            <div className="col-12 p-5" style={{ textAlign: "center" }}>
              <h4 style={{ color: "#ababab" }}>WE ARE THE BEST SCHOOL</h4>
              <h2
                style={{
                  fontSize: "48px",
                  marginTop: "20px",
                  marginBottom: "50px",
                }}
              >
                Welcome to
                <span
                  style={{ color: "#fb0", fontSize: "48px", marginLeft: "5px" }}
                >
                  KidzGoodie!
                </span>
              </h2>
              <div className="col-12 container-fluid">
                <div className="row">
                  <div className="column col-3">
                    <img src="/img/learnfun.png" width="70%" />
                    <h3 style={{ color: "#48cfe6" }}>Learning &amp; Fun </h3>
                    <p>
                      Learning doesn't have to be boring or dull, your child
                      will be able to learn and have fun at the same time at
                      KidzGoodie.
                    </p>
                  </div>
                  <div className="column col-3">
                    <img src="/img/creative-lessions.png" width="70%" />
                    <h3 style={{ color: "#48cfe6" }}>Creative Lessions</h3>
                    <p>
                      We have specially designed lessons to help your kids
                      develop skills related to artistry, creativity, and
                      originality.
                    </p>
                  </div>
                  <div className="column col-3">
                    <img src="/img/Happy-Environment.png" width="70%" />
                    <h3 style={{ color: "#48cfe6" }}>Happy Environment</h3>
                    <p>
                      At KidzGoodie, your children will be given the best
                      facilities, guidances, and chances to learn without any
                      concern.
                    </p>
                  </div>
                  <div className="column col-3">
                    <img src="/img/Playground.png" width="70%" />
                    <h3 style={{ color: "#48cfe6" }}>Safe Playground</h3>
                    <p>
                      All of our playgrounds are equipped with latest camera
                      systems, your kids are always under our staff's
                      observation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-7">
          <div className="row mb-6">
            <section className="col-lg-6 mb-lg-0 mb-5">
              <div className="tm-intro">
                <h3 className="tm-title-gray mb-4">English world for Kid!</h3>
                <hr className="mb-5 tm-hr" />
                <p className="mb-5">
                  Header is a parallax background just like in{" "}
                  <a href="" target="_blank">
                    Real Dynamic design
                  </a>{" "}
                  on TemplateMo. Business Oriented HTML Template is specifically
                  designed for your corporate website.
                </p>
                <p className="mb-5">
                  You can download and use this template for your commercial
                  purpose. Please do not re-distribute the template ZIP file on
                  any template collection website.
                </p>
                <img
                  src="/img/childrenworking-770x458.jpg"
                  alt="Company Background Image"
                  className="img-fluid tm-mb-3"
                />
              </div>
            </section>
            <section className="col-lg-6">
              <h3 className="tm-title-gray mb-4">
                Native teachers for learning!
              </h3>
              <hr className="mb-5 tm-hr" />
              <div className="tm-strategy-box mb-5">
                <img
                  src="/img/about-03.jpg"
                  alt="Image"
                  className="img-fluid tm-strategy-img"
                />
                <div>
                  <h4 className="tm-text-primary">
                    Maecenas molestie varius ipsum
                  </h4>
                  <p className="tm-strategy-text">
                    Quisque consectetur ipsum justo, sed posuere massa pretium
                    nec. In scelerisque, odio et maximus feugiat, nisl libero
                    porta turpis, quis imperdiet odio.
                  </p>
                </div>
              </div>
              <div className="tm-strategy-box mb-5">
                <img
                  src="img/about-04.jpg"
                  alt="Image"
                  className="img-fluid tm-strategy-img"
                />
                <div>
                  <h4 className="tm-text-primary">
                    Etiam consequat placerat convallis
                  </h4>
                  <p className="tm-strategy-text">
                    Fusce non diam vel diam egestas accumsan quis aliquam metus.
                    Nulla porta ullamcorper mauris maximus feugiat. Donec ac
                    tincidunt dui.
                  </p>
                </div>
              </div>
              <div className="tm-strategy-box mb-5">
                <img
                  src="img/about-05.jpg"
                  alt="Image"
                  className="img-fluid tm-strategy-img"
                />
                <div>
                  <h4 className="tm-text-primary">
                    Aenean varius velit eu ligula
                  </h4>
                  <p className="tm-strategy-text">
                    Suspendisse gravida, ipsum a gravida euismod, metus enim
                    hendrerit ante, vel hendrerit sapien sem non nisl. Maecenas
                    tempus risus ipsum.
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className="row mb-7">
            <div className="col-lg-4 col-md-6">
              <div className="tm-bg-gray tm-box">
                <div className="text-center mb-3">
                  <i className="fas fa-cloud-sun fa-5x p-5"></i>
                </div>
                <h4 className="tm-text-primary tm-h3 mb-5">
                  Suspendisse at nunc leo
                </h4>
                <p>
                  Phasellus malesuada aliquam arcu, et ultricies metus
                  scelerisque id. Curabitur finibus ornare blandit. Donec a
                  luctus nulla. Vivamus ac felis sapien.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="tm-bg-gray tm-box">
                <div className="text-center mb-3">
                  <i className="fas fa-spa fa-5x p-5"></i>
                </div>
                <h4 className="tm-text-primary tm-h3 mb-5">
                  Etiam viverra elit vel efficitur
                </h4>
                <p>
                  Nunc ultrices imperdiet orci, a ultrices orci luctus vel.
                  Etiam consequat placerat convallis. Donec consequat
                  consectetur est, eget pretium nisl.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <img
                src="img/biz-oriented-2.jpg"
                alt="Image"
                className="img-fluid"
              />
              <div className="tm-box tm-box-s">
                <p className="tm-mb-5">
                  Suspendisse gravida, ipsum a gravida euismod, metus enim
                  hendrerit ante, vel hendrerit sapien sem non nisl. Maecenas
                  tempus risus ipsum.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(HomePage);
