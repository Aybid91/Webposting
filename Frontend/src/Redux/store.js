import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import userReducer from "./user.duck";
import postReducer from "./../containers/PostsPage/PostsPage.duck";
import feedReducer from "./../containers/FeedPage/FeedPage.duck";
import landingPageReducer from "./../containers/LandingPage/LandingPage.duck";
// import reducers from "./redux";
const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  combineReducers({
    USER: userReducer,
    POSTS: postReducer,
    FEED: feedReducer,
    LANDING_PAGE: landingPageReducer,
  }),
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
