import { combineReducers } from 'redux';
import mainReducer from '../reducers/mainReducer';
import restfullReducer from '../reducers/restfullReducer';

const rootReducer = combineReducers({
  main: mainReducer,
  restFull: restfullReducer,
});

export default rootReducer;
