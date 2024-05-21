import React from "react";
import Header from "../../components/Header/Header";
import css from "./CommentsPage.module.css";
const CommentsPage = () => {
  return (
    <div>
      <Header />
      <div className={css.container}>
        <div className={css.topdiv}>
          <span>POST</span>
        </div>{" "}
      </div>
    </div>
  );
};

export default CommentsPage;
