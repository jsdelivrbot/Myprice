import { combineReducers } from 'redux';
import productReducer from './reducer_product'

const rootReducer = combineReducers({
  product:productReducer,
});

export default rootReducer;