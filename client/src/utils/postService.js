import tokenService from "./tokenService.js";
// const BASE_URL = "/api/v1/posts/";

export const getPosts = async (userID) => {
  try {
    const token = tokenService.getToken();
    let response = await fetch(`/api/v1/users/${userID}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (userID) => {
  try {
    const token = tokenService.getToken();
    let response = await fetch(`/api/v1/posts/${userID}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const removeBlog = async (userID) => {
  try {
    const token = tokenService.getToken();
    let response = await fetch(`/api/v1/posts/${userID}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
