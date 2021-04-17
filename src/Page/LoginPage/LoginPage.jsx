import React, { Component } from "react";
import Input from "../../Component/Input";
import { withRouter } from "react-router-dom";
import { loginAccount, registerAccount } from "../../Service/api";
import Swal from "sweetalert2";
import "./login.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      rePassword: "",
      email: "",
      matchPassword: true,
    };
  }

  componentDidMount() {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    console.log(this.props);
  }

  loginAccount = async () => {
    console.log("login");
    var data = {
      identifier: this.state.username,
      password: this.state.password,
    };
    try {
      var res = await loginAccount(data);
      if (res.status === 200) {
        sessionStorage.setItem("token", res.data.jwt);
        sessionStorage.setItem("isAdmin", res.data.user.isAdmin);
        this.props.history.push("/homepage");
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your username or password is incorrect!",
      });
      this.setState({ username: "", password: "" });
    }
  };

  registerAccount = async () => {
    let { username, password, email } = { ...this.state };
    if (this.state.matchPassword) {
      let data = {
        username: username,
        email: email,
        password: password,
      };
      if (username === "" || email === "" || password === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please, complete your information!",
        });
        return;
      }
      try {
        let res = await registerAccount(data);
        if (res.status === 200) {
          sessionStorage.setItem("token", res.data.jwt);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your account has been registed!",
            showConfirmButton: false,
            timer: 1500,
          });
          this.props.history.push("/homepage");
        }
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong, please try again!",
        });
        this.setState({
          username: "",
          password: "",
          email: "",
          rePassword: "",
        });
      }
    }
  };

  handleKeyupLogin = async (e) => {
    if (e.keyCode === 13) {
      this.loginAccount();
    }
  };

  handleKeyupRegister = async (e) => {
    if (e.keyCode === 13) {
      this.registerAccount();
    }
  };

  onChangeUsername = (value) => {
    this.setState({ username: value });
  };
  onChangePass = (value) => {
    this.setState({ password: value });
  };
  onChangeRePass = (value) => {
    this.setState({ rePassword: value });
    if (value !== this.state.password) {
      this.setState({ matchPassword: false });
    } else this.setState({ matchPassword: true });
  };
  onChangeEmail = (value) => {
    this.setState({ email: value });
  };
  render() {
    const styleAll = {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      height: "calc(100vh)",
      backgroundColor: "#f6f5f7",
    };
    return (
      <div style={styleAll}>
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form action="#">
              <h1>Create Account</h1>
              <Input
                style={{ marginBottom: "10px" }}
                type="text"
                placeholder="User name"
                value={this.state.username}
                funInput={this.onChangeUsername}
              />
              <Input
                style={{ marginBottom: "10px" }}
                type="email"
                placeholder="Email"
                value={this.state.email}
                funInput={this.onChangeEmail}
              />
              <Input
                style={{ marginBottom: "10px" }}
                type="password"
                placeholder="Password"
                value={this.state.password}
                funInput={this.onChangePass}
              />
              <Input
                style={{ marginBottom: "10px" }}
                type="password"
                placeholder="Re-Password"
                value={this.state.rePassword}
                funInput={this.onChangeRePass}
                onKeyUp={
                  this.state.matchPassword ? this.handleKeyupRegister : ""
                }
              />
              <span
                style={{
                  display: this.state.matchPassword ? "none" : "block",
                  color: "#ff1919",
                }}
              >
                Password dosent match! Please enter again!
              </span>
              <input
                className="button_login"
                style={{ cursor: "pointer" }}
                onClick={this.registerAccount}
                value="Sign Up"
              />
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Sign in</h1>
              <Input
                style={{ marginBottom: "10px" }}
                type="text"
                placeholder="User name"
                value={this.state.username}
                funInput={this.onChangeUsername}
              />
              <Input
                style={{ marginBottom: "10px" }}
                type="password"
                placeholder="Password"
                value={this.state.password}
                funInput={this.onChangePass}
                onKeyUp={this.handleKeyupLogin}
              />
              {/* <a href="#">Forgot your password?</a> */}
              <input
                type="button"
                className="button_login"
                style={{ cursor: "pointer" }}
                onClick={this.loginAccount}
                value="Sign In"
              />
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 style={{ color: "#fff" }}>Welcome Back!</h1>
                <p style={{ color: "#fff" }}>
                  Login to get in a wonderful word of English!
                </p>
                <button className="ghost button_login" id="signIn">
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 style={{ color: "#fff" }}>Hello, Friend!</h1>
                <p style={{ color: "#fff" }}>
                  Enter your personal details and start journey with us
                </p>
                <button className="ghost button_login" id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
