import { combineReducers } from 'redux';
import WeatherReducer from './reducer_weather';
// Our application state
// Using combineReducers, now all the reducers
// can be used and seen! Dark Magic
const rootReducer = combineReducers({
  weather: WeatherReducer
});

export default rootReducer;
