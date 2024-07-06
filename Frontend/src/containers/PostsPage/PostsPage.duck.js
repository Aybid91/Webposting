import axios from "axios";

export const GET_POSTS_REQUEST = "GET_POSTS_REQUEST";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_ERROR = "GET_POSTS_ERROR";

export const ADD_POSTS_REQUEST = "ADD_POSTS_REQUEST";
export const ADD_POSTS_SUCCESS = "ADD_POSTS_SUCCESS";
export const ADD_POSTS_ERROR = "ADD_POSTS_ERROR";

export const UPDATE_POSTS_REQUEST = "UPDATE_POSTS_REQUEST";
export const UPDATE_POSTS_SUCCESS = "UPDATE_POSTS_SUCCESS";
export const UPDATE_POSTS_ERROR = "UPDATE_POSTS_ERROR";

const initialState = {
  currentUserPosts: [],
  currentUserPostsRequest: false,
  currentUserPostsError: null,
  addingOrUpdatingPost: false,
  addOrUpdatePostError: null,
};
export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        currentUserPostsError: null,
        currentUserPostsRequest: true,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        currentUserPosts: payload,
        currentUserPostsRequest: false,
        currentUserPostsError: null,
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        currentUserPostsRequest: false,
        currentUserPostsError: payload,
      };

    case ADD_POSTS_REQUEST:
      return {
        ...state,
        addOrUpdatePostError: null,
        addingOrUpdatingPost: true,
      };
    case ADD_POSTS_SUCCESS:
      return {
        ...state,
        currentUserPosts: [...state.currentUserPosts, payload],
        addingOrUpdatingPost: false,
        addOrUpdatePostError: null,
      };
    case ADD_POSTS_ERROR:
      return {
        ...state,
        addingOrUpdatingPost: false,
        addOrUpdatePostError: payload,
      };

    case UPDATE_POSTS_REQUEST:
      return {
        ...state,
        addOrUpdatePostError: null,
        addingOrUpdatingPost: true,
      };
    case UPDATE_POSTS_SUCCESS:
      const currItemidx = state.currentUserPosts.findIndex(
        (post) => post._id === payload._id
      );
      let newArr = state.currentUserPosts;
      newArr[currItemidx] = payload;
      const updateArray = newArr;
      return {
        ...state,
        currentUserPosts: updateArray,
        addingOrUpdatingPost: false,
        addOrUpdatePostError: null,
      };
    case UPDATE_POSTS_ERROR:
      return {
        ...state,
        addingOrUpdatingPost: false,
        addOrUpdatePostError: payload,
      };
    default:
      return state;
  }
}
export const currentUserPostsShowRequest = () => ({
  type: GET_POSTS_REQUEST,
});

export const currentUserPostsShowSuccess = (posts) => ({
  type: GET_POSTS_SUCCESS,
  payload: posts,
});

export const currentUserPostsShowError = (e) => ({
  type: GET_POSTS_ERROR,
  payload: e,
  error: true,
});

export const addPostsShowRequest = () => ({
  type: ADD_POSTS_REQUEST,
});
export const addPostsShowSuccess = (post) => ({
  type: ADD_POSTS_SUCCESS,
  payload: post,
});
export const addPostsShowError = (e) => ({
  type: ADD_POSTS_SUCCESS,
  payload: e,
});

export const updatePostsShowRequest = () => ({
  type: UPDATE_POSTS_REQUEST,
});
export const updatePostsShowSuccess = (post) => ({
  type: UPDATE_POSTS_SUCCESS,
  payload: post,
});
export const updatePostsShowError = (e) => ({
  type: UPDATE_POSTS_SUCCESS,
  payload: e,
});
export const getCurrentUserPosts = (search) => async (dispatch, getState) => {
  dispatch(currentUserPostsShowRequest());
  axios
    .get(`http://localhost:5000/api/profile/getCurrentUserPosts${search}`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(currentUserPostsShowSuccess(res.data));
    })
    .catch((e) => {
      dispatch(currentUserPostsShowError(e));
    });
};
export const addPost = (values) => async (dispatch, getState) => {
  dispatch(addPostsShowRequest());
  axios
    .post("http://localhost:5000/api/profile/addPost", values, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(addPostsShowSuccess(res.data));
    })
    .catch((e) => {
      dispatch(addPostsShowError(e));
    });
};
export const updatePost = (values) => async (dispatch, getState) => {
  dispatch(updatePostsShowRequest());
  axios
    .patch("http://localhost:5000/api/profile/updatepost", values, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(updatePostsShowSuccess(res.data));
    })
    .catch((e) => {
      dispatch(updatePostsShowError(e));
    });
};
