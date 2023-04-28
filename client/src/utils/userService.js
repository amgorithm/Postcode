import tokenService from "./tokenService";

import { BASE_URL } from "./constants.js";

function signup(user) {
  return fetch(BASE_URL + "/api/v1/users/signup", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (res.ok) return res.json();

      throw new Error(
        "Something went wrong. Please check that your username and email are unique."
      );
    })

    .then(({ token }) => tokenService.setToken(token));
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + "/api/v1/users/login", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(creds),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error("Bad Credentials!");
    })
    .then(({ token }) => tokenService.setToken(token));
}

export const updateAbout = async (userAbout, userID) => {
  try {
    const token = tokenService.getToken();
    let response = await fetch(`${BASE_URL}/api/v1/users/${userID}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(userAbout),
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const exports = {
  signup,
  getUser,
  logout,
  login,
};

export default exports;
