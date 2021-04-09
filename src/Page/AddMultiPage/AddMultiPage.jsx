import React, { Component } from "react";
import Menu from "../../Component/Menu";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import { getSeason, getLessons, getAllSeason } from "../../Service/api";
import XLSX from "xlsx";

import {
  Grid,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Tabs,
  Tab,
  MenuItem,
  TextField,
  InputAdornment,
  Paper,
  Fab,
  // Divider,
} from "@material-ui/core";

class AddMultiPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      loading: true,
      selectedFileExcel: undefined,
      selectedFilePDF: false,
      dataExcel: [],
      dataPDF: {},
      sourceFileExcel: {
        pdf: undefined,
        status: "",
      },
      dataStories: [],
      season: null,
      lesson: null,
      lessons: null,
      seasons: null,
      isPost: false,
      successCount: false,
    };
  }
  handleChangeFilePDF = async (e) => {
    e.persist();
    const dataExcel = this.state.dataExcel;
    let successCount = 0;
    if (e.target.files && e.target.files[0]) {
      const arrayPDF = e.target.files;
      this.setState({ dataPDF: arrayPDF, selectedFilePDF: true });
      for (let element of dataExcel) {
        let success = false;
        for (let i = 0; i < arrayPDF.length; i++) {
          if (element["Tên file"] == arrayPDF[i].name) {
            element["pdf"] = arrayPDF[i];
            successCount++;
            success = true;
          }
        }
        if (!success) {
          console.log("fail" + element);
          element["pdf"] = null;
        }
      }
    }
    let dataTemp = [];
    let topics = this.state.topics;
    let levels = this.state.levels;

    dataExcel.forEach((element) => {
      console.log(element);
      //   dataTemp.push(storyModel);
    });
    this.setState({
      dataStories: dataTemp,
      successCount: successCount == this.state.dataExcel.length ? true : false,
    });
    console.log(this.state.dataExcel);
  };

  getAllSeasons = async () => {
    try {
      let res = await getAllSeason();
      await this.setState({ seasons: res.data });
    } catch (e) {
      this.setState({ isError: true });
    }
  };

  getLessons = async (seasonId) => {
    try {
      let res = await getSeason(seasonId);
      console.log(res);
      await this.setState({ lessons: res.data.lessons });
    } catch (e) {
      this.setState({ isError: true });
    }
  };

  readFileAsBinaryString = (file) => {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = function (e) {
        resolve(e.target.result);
      };
      reader.onerror = function (e) {
        reject(e);
      };
      reader.readAsBinaryString(file);
    });
  };

  handleChangeFileExcel = async (e) => {
    e.persist();
    const sourceFileExcel = this.state.sourceFileExcel;
    const { season, levels } = this.state;
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
      const fileData = await this.readFileAsBinaryString(e.target.files[0]);
      const workbook = XLSX.read(fileData, {
        type: "binary",
      });
      const rows = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[workbook.SheetNames[0]]
      );
      let dataTemp = [];
      for (let i = 0; i < rows.length; i++) {
        const rowData = Object.assign(rows[i], sourceFileExcel);
        console.log(rowData);
        // const lesson = levels.find(e => e.name == `${rowData['Cấp độ']}`.trim());

        // rowData['Môn'] = `${rowData['Môn']}`.trim();

        dataTemp.push(Object.assign(rows[i], sourceFileExcel));
      }

      this.setState({
        selectedFileExcel: e.target.files[0],
        dataExcel: dataTemp,
      });
    }
  };
  render() {
    const {
      value,
      storyInfor,
      selectedFileExcel,
      selectedFilePDF,
      dataExcel,
      dataPDF,
      isPost,
      successCount,
    } = this.state;
    return (
      <React.Fragment>
        <Menu />
        <Header content="Add multil page!" />
        <div>
          <input
            accept=".xlsx, .xls"
            id="import-file"
            type="file"
            style={{ display: "none" }}
            onChange={this.handleChangeFileExcel}
            // name='import-file'
          />
          <Button
            color="primary"
            variant="contained"
            component="span"
            style={{
              opacity: isPost == false ? "1" : "0.5",
              marginRight: "10px",
            }}
          >
            <label
              htmlFor={isPost == false ? "import-file" : ""}
              style={{ cursor: isPost == false ? "pointer" : "" }}
            >
              {" "}
              {selectedFileExcel ? selectedFileExcel.name : "Chọn file dữ liệu"}
            </label>
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default AddMultiPage;
