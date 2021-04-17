import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getAll3DModel } from "../../Service/api";
import Menu from "../../Component/Menu";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import View3DScreen from "../../Component/View3DScreen";

class View3DScreenPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all3DModel: null,
    };
  }

  componentDidMount() {
    this.getAll3DModel();
  }

  getAll3DModel = async () => {
    try {
      let res = await getAll3DModel();
      await this.setState({ all3DModel: res.data });
    } catch (e) {
      this.setState({ isError: true });
    }
  };

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <Menu />
        <Header content="BOOKSHELF!" />
        <div style={{ backgroundColor: "ghostwhite" }}>
          {this.state.all3DModel && this.state.all3DModel.length > 0 ? (
            <View3DScreen sourceModel={this.state.all3DModel[0].model_url} />
          ) : (
            ""
          )}
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(View3DScreenPage);
