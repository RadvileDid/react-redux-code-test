import { combineReducers, createStore } from "redux";
import VideosReducer from "./Reducers/VideosReducer";
const reducers = combineReducers({
  videos: VideosReducer
});

const store = createStore(reducers);

export type ReduxState = ReturnType<typeof store.getState>;

export default store;
