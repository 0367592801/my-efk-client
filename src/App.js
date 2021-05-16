import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./Page/LoginPage/LoginPage";
import HomePage from "./Page/HomePage/HomePage";
import SeasonPage from "./Page/SeasonPage/SeasonPage";
import Menu from "./Component/Menu";
import LessonPage from "./Page/LessonPage/LessonPage";
import Book from "./Component/Book";
import AddMultiPage from "./Page/AddMultiPage/AddMultiPage";
import View3DScreenPage from "./Page/View3DScreenPage/View3DScreenPage";
import Video from "./Component/Video";
import ABCGame from "./Component/Game/ABCGame";
import TestExam from "./Component/TestExam";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/homepage">
            <HomePage />
          </Route>
          <Route path="/seasons">
            <SeasonPage />
          </Route>
          <Route path="/lessons/:seasonId">
            <LessonPage />
          </Route>
          <Route path="/book/:lessonId">
            <Book />
          </Route>
          <Route path="/video/:lessonId">
            <Video />
          </Route>
          <Route path="/addmultilpage">
            <AddMultiPage />
          </Route>
          <Route path="/3dview">
            <View3DScreenPage />
          </Route>
          <Route path="/ABCGame">
            <ABCGame />
          </Route>
          <Route path="/test/:testId">
            <TestExam />
          </Route>
        </Switch>
      </Router>
    );
  }
}
