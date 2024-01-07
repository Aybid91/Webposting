import React, { useState } from "react";
import isEqual from "lodash/isEqual";
import css from "./LoginPage.module.css";
const initialState = {
  email: "",
  password: "",
};
const LoginPage = (props) => {
  const { onSubmit } = props;
  const [user, setUser] = useState(initialState);
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const pristine = isEqual(user, initialState);
  return (
    <form
      method="post"
      action="/"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(user);
      }}
    >
      <div className={css.inputdiv}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={user.email}
          placeholder="Enter your email"
          onChange={handleInputChange}
        />
      </div>
      <div className={css.inputdiv}>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          value={user.password}
          placeholder="Enter your password"
          onChange={handleInputChange}
        />
      </div>

      <div className={css.btndiv}>
        <button className={`${css.finalbtn} ${css.signupbtn}`}>Login</button>
        <button
          className={`${css.finalbtn} ${css.resetbtn}`}
          onClick={(e) => setUser(initialState)}
          type="button"
          disabled={pristine}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
