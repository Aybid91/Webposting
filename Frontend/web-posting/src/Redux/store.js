import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import userReducer from "./user.duck";
import postReducer from "./../containers/PostsPage/PostsPage.duck";
import feedReducer from "./../containers/FeedPage/FeedPage.duck";
// import reducers from "./redux";
const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  combineReducers({ USER: userReducer, POSTS: postReducer, FEED: feedReducer }),
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
