
import {
  FETCH_USERS_SUCCESS,
  CREATE_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER_FAILURE,
  UPDATE_USER_FAILURE,
  DELETE_USER_FAILURE,
} from "../action/types";

const initialState = {
  users: [],
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return { ...state, users: action.payload };
    case CREATE_USER_SUCCESS:
      return { ...state, users: [...state.users, action.payload] };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case FETCH_USERS_FAILURE:
    case CREATE_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
