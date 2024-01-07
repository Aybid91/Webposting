import React, { useEffect, useState } from "react";
import css from "./AuthPage.module.css";
import axios from "axios";
import queryString from "query-string";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../Redux/user.duck";
const AuthPage = (props) => {
  const state = useSelector((state) => state.USER);
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser } = state;
  const navigate = useNavigate();
  const location = useLocation();
  const search = queryString.parse(location.search);
  const [tab, setTab] = useState(search?.tab ? search.tab : "signup");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    // if (isAuthenticated) {
    //   navigate("/");
    // }
    if (!search?.tab) {
      navigate("/auth?tab=signup");
    }
  });
  const tabClickHandler = (e) => {
    const newtab = tab === "signup" ? "login" : "signup";
    navigate(`/auth?tab=${newtab}`);
    setTab(newtab);
  };
  const handleSubmit = (values) => {
    setLoading(true);
    if (tab === "signup") {
      const { name, email, password } = values;
      const body = { name, email, password };
      return axios
        .post(`http://localhost:3500/api/auth/signup`, body, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
          setError(
            typeof e?.response?.data === "string"
              ? e?.response?.data
              : e?.message || "Something went wrong"
          );
        });
    } else {
      const { email, password } = values;
      if (email && password) dispatch(login({ email, password }));
    }
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
                  className={`${tab === "login" ? css.activeTab : ""}`}
                  type="button"
                  onClick={tabClickHandler}
                >
                  Login
                </button>
                <button
                  className={`${tab === "signup" ? css.activeTab : ""}`}
                  type="button"
                  onClick={tabClickHandler}
                >
                  Signup
                </button>
              </div>
            </div>

            {tab === "signup" ? (
              <SignupPage
                onSubmit={handleSubmit}
                loading={loading}
                setError={(val) => setError(val)}
              />
            ) : (
              <LoginPage onSubmit={handleSubmit} loading={loading} />
            )}
            {error ? <span>{error}</span> : null}
          </div>
        )}
      </div>
    </>
  );
};

export default AuthPage;
