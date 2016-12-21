import { FETCH_WEATHER } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_WEATHER:
      // return state.concat([ action.payload.data ]);
      // ES6 magic: Well, more like Dark Magic for me
      // but it's fancy
      return [ action.payload.data, ...state ];
      break;
    default:
      return state;
  }
}
