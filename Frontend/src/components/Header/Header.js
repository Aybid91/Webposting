import React from "react";
import { useNavigate, Link } from "react-router-dom";
import classNames from "classnames";
import { MdAccountCircle } from "react-icons/md";
import css from "./Header.module.css";
import logo from "./../../assets/web-posting-high-resolution-logo-transparent.png";
import { useSelector } from "react-redux";
const Header = (props) => {
  const { headerClassName } = props;
  const navigate = useNavigate();
  const state = useSelector((state) => state.USER);
  const { isAuthenticated } = state;
  const headerClass = classNames(css.root, headerClassName);
  const profileBtnHandler = (e) => {
    navigate("/auth?tab=signup");
  };
  return (
    <div className={headerClass}>
      <div className={css.logocontainer}>
        <img src={logo} alt="logo" onClick={() => navigate("/")} />
      </div>
      <div className={css.menucontainer}>
        <nav className={css.menunav}>
          <Link to="/feed">Feed</Link>
          <Link to="/posts">Posts</Link>
          {/* <Link to="/comments">Comments</Link> */}
        </nav>

        <button
          className={classNames(css.profilebtn, {
            [css.loggedin]: isAuthenticated,
          })}
          type="button"
          onClick={profileBtnHandler}
        >
          <MdAccountCircle />
        </button>
      </div>
    </div>
  );
};

export default Header;
