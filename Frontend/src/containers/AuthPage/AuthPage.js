import React, { useEffect, useState } from "react";
import css from "./AuthPage.module.css";
import axios from "axios";
import queryString from "query-string";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, signup } from "../../Redux/user.duck";
const tabButtonId = {
  signup: "SignupButton",
  login: "LoginButton",
};
const AuthPage = (props) => {
  const state = useSelector((state) => state.USER);
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser, loginError } = state;
  const navigate = useNavigate();
  const location = useLocation();
  const search = queryString.parse(location.search);
  const [tab, setTab] = useState(search?.tab ? search.tab : "signup");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // if (isAuthenticated) {
    //   navigate("/");
    // }
    if (!search?.tab) {
      navigate("/auth?tab=signup");
    }
  });
  const tabClickHandler = (e) => {
    const btn = e.target.id;
    const newtab =
      btn === tabButtonId.login
        ? "login"
        : btn === tabButtonId.signup
        ? "signup"
        : null;
    console.log(44555, btn, newtab);
    navigate(`/auth?tab=${newtab}`);
    setTab(newtab);
  };
  const handleSubmit = (values) => {
    setLoading(true);
    if (tab === "signup") {
      const { name, email, password } = values;
      const body = { name, email, password };
      if (email && password && name) dispatch(signup(body));
    } else {
      const { email, password } = values;
      if (email && password) dispatch(login({ email, password }));
    }
    setLoading(false);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      {" "}
      <Header />
      <div className={css.AuthPageroot}>
        {isAuthenticated ? (
          <div className={css.formtopcontainer}>
            <div>
              <span>Name:</span>
              <span>{currentUser.name}</span>
            </div>
            <div>
              <span>Email:</span>
              <span>{currentUser.email}</span>
            </div>
            <button
              className={`${tab === "login" ? css.activeTab : ""}`}
              type="button"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        ) : (
          <div className={css.contentmodal}>
            <div className={css.formtopcontainer}>
              <span>Join us now.</span>
              <div className={css.tabs}>
                <button
                  id={tabButtonId.login}
                  className={`${tab === "login" ? css.activeTab : ""}`}
                  type="button"
                  onClick={tabClickHandler}
                >
                  Login
                </button>
                <button
                  id={tabButtonId.signup}
                  className={`${tab === "signup" ? css.activeTab : ""}`}
                  type="button"
                  onClick={tabClickHandler}
                >
                  Signup
                </button>
              </div>
            </div>

            {tab === "signup" ? (
              <SignupPage onSubmit={handleSubmit} loading={loading} />
            ) : (
              <LoginPage onSubmit={handleSubmit} loading={loading} />
            )}
            {loginError ? (
              <span>Something went wrong, check password</span>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default AuthPage;
