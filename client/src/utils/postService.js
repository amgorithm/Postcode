import tokenService from "./tokenService.js";
import { BASE_URL } from "./constants.js";

export const newPost = async (post) => {
  try {
    const token = tokenService.getToken();
    let response = await fetch(`${BASE_URL}/api/v1/posts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ title: post.title, body: post.body }),
    });

    // ? Below will return the validation err msg if err occurs
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }

    // Below will just return the response if above isn't used
    // return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async (userID) => {
  try {
    const token = tokenService.getToken();
    let response = await fetch(`${BASE_URL}/api/v1/users/${userID}`, {
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

export const getPost = async (postID) => {
  try {
    const token = tokenService.getToken();
    let response = await fetch(`${BASE_URL}/api/v1/posts/${postID}`, {
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

export const updatePost = async (post, postID) => {
  try {
    const token = tokenService.getToken();
    let response = await fetch(`${BASE_URL}/api/v1/posts/${postID}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(post),
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const removeBlog = async (userID) => {
  try {
    const token = tokenService.getToken();
    let response = await fetch(`${BASE_URL}/api/v1/posts/${userID}`, {
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
