// src/store/actions/userActions.js
import axios from "axios";
import {
  FETCH_USERS_SUCCESS,
  CREATE_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER_FAILURE,
  UPDATE_USER_FAILURE,
  DELETE_USER_FAILURE,
} from "./types";

const token = localStorage.getItem("access-token");
const config = {
  headers: {
    "x-access-token": token,
  },
};

export const fetchUsers =
  (search = "") =>
  async (dispatch) => {
    try {
      // const response = await axios.get('http://localhost:4000/api/user/getUser', config);
      const response = await axios.get(
        `http://localhost:4000/api/user/getUser?search=${search}`,
        config
      );
      dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
  };

export const createUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/user/createUser",
      userData,
      config
    );
    dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.msg) {
      throw new Error(error.response.data.msg); // Throw an error with the message from the backend
    } else {
      throw new Error("An unexpected error occurred");
    }
    // dis`patch({ type: CREATE_USER_FAILURE, payload: error.message });
  }
};

export const updateUser = (userId, userData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/user/updateUser/${userId}`,
      userData,
      config
    );
    dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:4000/api/user/deleteUser/${userId}`,
      config
    );
    dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
  }
};
