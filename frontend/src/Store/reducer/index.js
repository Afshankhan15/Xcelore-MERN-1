
import { combineReducers } from 'redux';
import userReducer from './userReducer';
const reducerObj = {
  UserResponseIndex: userReducer,
};

const rootReducer = combineReducers(reducerObj);
export default rootReducer;