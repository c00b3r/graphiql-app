import { combineReducers } from 'redux';
import mainReducer from '../reducers/mainReducer';
import userReducer from '../reducers/userSlice';

const rootReducer = combineReducers({
  main: mainReducer,
  user: userReducer,
});

export default rootReducer;
