import axios from "axios";

export const GET_CURRENT_USER_REQUEST = "GET_CURRENT_USER_REQUEST";
export const GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS";
export const GET_CURRENT_USER_ERROR = "GET_CURRENT_USER_ERROR";

export const LOGGED_OUT = "LOGGED_OUT";

export const LOGGED_IN = "LOGGED_IN";

export const LOGGED_IN_FAILED = "LOGGED_IN_FAILED";

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  currentUserRequest: false,
  currentUserError: null,
  loginError: null,
};
export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case GET_CURRENT_USER_REQUEST:
      return { ...state, currentUserError: null, currentUserRequest: true };
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        isAuthenticated: true,
        currentUserRequest: false,
        currentUserError: null,
      };
    case GET_CURRENT_USER_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        currentUserRequest: false,
        currentUserError: payload,
      };
    case LOGGED_OUT:
      return {
        ...state,
        isAuthenticated: false,
        loginError: null,
        currentUserRequest: false,
        currentUserError: null,
        currentUser: null,
      };
    case LOGGED_IN:
      return {
        ...state,
        currentUser: payload,
        isAuthenticated: true,
        loginError: null,
        currentUserRequest: false,
        currentUserError: null,
      };
    case LOGGED_IN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        loginError: payload,
      };

    default:
      return state;
  }
}
export const currentUserShowRequest = () => ({
  type: GET_CURRENT_USER_REQUEST,
});

export const currentUserShowSuccess = (user) => ({
  type: GET_CURRENT_USER_SUCCESS,
  payload: user,
});

export const currentUserShowError = (e) => ({
  type: GET_CURRENT_USER_ERROR,
  payload: e,
  error: true,
});

export const loggedinAction = (user) => ({
  type: LOGGED_IN,
  payload: user,
});
export const loggedoutAction = () => ({
  type: LOGGED_OUT,
  payload: {},
});
export const loggedError = (e) => ({
  type: LOGGED_IN_FAILED,
  payload: e,
});

export const fetchUserData = () => async (dispatch, getState) => {
  try {
    dispatch(currentUserShowRequest());

    const data = await axios.get("http://localhost:5000/api/profile/getUser", {
      withCredentials: true,
    });
    dispatch(currentUserShowSuccess(data.data));
  } catch (error) {
    dispatch(currentUserShowError(error));
  }
};
export const login = (values) => async (dispatch, getState) => {
  axios
    .post("http://localhost:5000/api/auth/login", values, {
      withCredentials: true,
    })
    .then((resp) => {
      dispatch(loggedinAction(resp.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(loggedError(err));
    });
};
export const logout = () => async (dispatch, getState) => {
  axios
    .get("http://localhost:5000/api/auth/logout", {
      withCredentials: true,
    })
    .then((resp) => {
      dispatch(loggedoutAction());
    })
    .catch((error) => {
      console.log(error);
      dispatch(loggedError(error));
    });
};
export const signup = (values) => async (dispatch, getState) => {
  axios
    .post(`http://localhost:5000/api/auth/signup`, values, {
      withCredentials: true,
    })
    .then((resp) => {
      dispatch(loggedinAction(resp.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(loggedError(error));
    });
};
