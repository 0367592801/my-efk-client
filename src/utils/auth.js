/* /lib/auth.js */

import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { uploadAvatar } from './user';
import strapi from "./strapi"

export const strapiRegister = (username, email, password, avatar) => {
  return new Promise((resolve, reject) => {
    if (!process.browser) {
      reject();
    }
    strapi.register(username, email, password).then(res => {
      setToken(res);
      if (avatar) {
        uploadAvatar(res.user.id, avatar)
        .then(res => {})
        .catch(err => {
          reject(err);
        })
      }
      resolve(res);
    })
    .catch(err => {
      reject(err)
    });
  });
};
//use strapi to get a JWT and token object, save
//to approriate cookei for future requests
export const strapiLogin = async (email, password) => {
  return new Promise((resolve, reject) => {
    if (!process.browser) {
      reject();
    }
    // Get a token
    return strapi.login(email, password)
    .then(res => {
      setToken(res);
      resolve(res);
    })
    .catch(err => {
      reject(err);
    });
  })
};

export const setToken = token => {
  if (!process.browser) {
    return;
  }
  Cookies.set("username", token.user.username);
  Cookies.set("user", JSON.stringify(token.user));
  Cookies.set("jwt", token.jwt);
  // if (Cookies.get("username")) {
  //   Router.push("/");
  // }
};

export const unsetToken = () => {
  if (!process.browser) {
    return;
  }
  Cookies.remove("jwt");
  Cookies.remove("username");
  Cookies.remove("user");
  Cookies.remove("cart");

  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
};

export const getUserFromServerCookie = req => {
  if (!req.headers.cookie || "") {
    return undefined;
  }

  let username = req.headers.cookie
    .split(";")
    .find(user => user.trim().startsWith("username="));
  if (username) {
    username = username.split("=")[1];
  }

  const jwtCookie = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith("jwt="));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split("=")[1];
  return jwtDecode(jwt), username;
};

export const getUserFromLocalCookie = () => {
  return Cookies.get("username");
};

export const getCurrentUserFromLocalCookie = () => {
  return Cookies.get("user");
}

//these will be used if you expand to a provider such as Auth0
const getQueryParams = () => {
  const params = {};
  window.location.href.replace(
    /([^(?|#)=&]+)(=([^&]*))?/g,
    ($0, $1, $2, $3) => {
      params[$1] = $3;
    }
  );
  return params;
};
export const extractInfoFromHash = () => {
  if (!process.browser) {
    return undefined;
  }
  const { id_token, state } = getQueryParams();
  return { token: id_token, secret: state };
};