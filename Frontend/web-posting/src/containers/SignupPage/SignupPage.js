import React, { useState } from "react";
import isEqual from "lodash/isEqual";
import css from "./SignupPage.module.css";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  password: "",
  cnfpassword: "",
};
const SignupPage = (props) => {
  const navigate = useNavigate();
  const { onSubmit, loading, setError } = props;
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
        onSubmit(user)
          .then((res) => navigate("/feed"))
          .catch((e) => console.log(1123, e));
      }}
    >
      <div className={css.inputdiv}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={user.name}
          placeholder="Enter your name"
          onChange={handleInputChange}
        />
      </div>
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
      <div className={css.inputdiv}>
        <label htmlFor="cnfpassword">Confirm Password</label>
        <input
          type="text"
          name="cnfpassword"
          id="cnfpassword"
          value={user.cnfpassword}
          placeholder="Re-enter your password"
          onChange={handleInputChange}
        />
      </div>
      <div className={css.btndiv}>
        <button className={`${css.finalbtn} ${css.signupbtn}`}>
          {loading ? "loading..." : "Sign up"}
        </button>
        <button
          className={`${css.finalbtn} ${css.resetbtn}`}
          onClick={(e) => {
            setError(null);
            setUser(initialState);
          }}
          type="button"
          disabled={pristine}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SignupPage;
