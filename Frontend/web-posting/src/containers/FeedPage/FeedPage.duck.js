import axios from "axios";

export const GET_FEED_REQUEST = "GET_FEED_REQUEST";
export const GET_FEED_SUCCESS = "GET_FEED_SUCCESS";
export const GET_FEED_ERROR = "GET_FEED_ERROR";

const initialState = {
  feedLoading: false,
  feed: [],
  feedError: null,
};
export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case GET_FEED_REQUEST:
      return {
        ...state,
        feedLoading: true,
        feedError: null,
      };
    case GET_FEED_SUCCESS:
      return {
        ...state,
        feedLoading: false,
        feed: payload,
        feedError: null,
      };
    case GET_FEED_ERROR:
      return {
        ...state,
        feedLoading: false,
        feedError: payload,
      };

    default:
      return state;
  }
}
export const getFeed = (params) => async (dispatch, getState) => {
  dispatch({ type: GET_FEED_REQUEST });
  axios
    .post("http://localhost:3500/api/profile/feed", params, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch({
        type: GET_FEED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((e) => {
      dispatch({
        type: GET_FEED_ERROR,
        payload: e,
      });
    });
};
