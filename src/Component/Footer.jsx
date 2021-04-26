import React, { Component } from "react";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div style={{ width: "100%" }}>
          <img src="/img/footer.PNG" width="100%" />
          <div
            style={{ backgroundColor: "rgba(118,178,39,1)", padding: "0 20px" }}
          >
            <div className="row">
              <p className="col-lg-9 col-md-8 mb-5 mb-md-0">
                <span className="text-white">EnglishForKid Center</span>-
                <a
                  rel="nofollow"
                  target="_parent"
                  href="https://www.facebook.com/thuy.minh22/"
                  className="text-white"
                >
                  Phan Tuấn Minh
                </a>
              </p>
              <div className="col-lg-3 col-md-4 text-right">
                <a
                  rel="nofollow"
                  target="_blank"
                  href="https://www.facebook.com/thuy.minh22/"
                  className="tm-social-link"
                >
                  <i className="fab fa-facebook fa-2x tm-social-icon"></i>
                </a>
                <a href="https://twitter.com" className="tm-social-link">
                  <i className="fab fa-twitter fa-2x tm-social-icon"></i>
                </a>
                <a href="https://linkedin.com" className="tm-social-link">
                  <i className="fab fa-linkedin fa-2x tm-social-icon"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
