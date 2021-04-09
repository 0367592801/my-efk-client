import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getAllSeason } from "../../Service/api";
import SeasonBook from "./_part/SeasonBook";
import Menu from "../../Component/Menu";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";

class SeasonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSeason: null,
      isError: false,
    };
  }

  componentDidMount() {
    this.getAllSeasons();
  }

  getAllSeasons = async () => {
    try {
      let res = await getAllSeason();
      await this.setState({ allSeason: res.data });
    } catch (e) {
      this.setState({ isError: true });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Menu />
        <Header content="BOOKSHELF!" />
        <div style={{ backgroundColor: "ghostwhite" }}>
          {this.state.isError !== true && this.state.allSeason !== null ? (
            <React.Fragment>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  padding: "20px 50px",
                  margin: "0 auto",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginBottom: "50px",
                }}
              >
                {(this.state.allSeason || []).map((item, index) => {
                  return <SeasonBook season={item} key={index} />;
                })}
              </div>
            </React.Fragment>
          ) : (
            ""
          )}
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(SeasonPage);
