import classNames from "classnames";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "./FeedCard.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
const FeedCard = (props) => {
  const state = useSelector((state) => state.USER);
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = state;
  const {
    title,
    content,
    mainClassName,
    authorName,
    idx,
    isEdit = false,
    editFunction,
    _id,
    renderReadMore = true,
  } = props;
  const [read, setRead] = useState("less");
  const initialCommentValues = {
    isOpen: false,
    postId: _id,
    comment: "",
    commentor: currentUser?._id,
  };
  const [commentValues, setCommentValues] = useState(initialCommentValues);
  const handleViewPost = (r) => {
    navigate(`/viewpost/${_id}`);
  };
  const comment = () => {
    if (!commentValues.comment && commentValues.isOpen)
      return setCommentValues({ ...commentValues, isOpen: false });
    // const updatedValues =
    else {
      axios
        .post("http://localhost:5000/api/profile/addComment", commentValues, {
          withCredentials: true,
        })
        .then((res) => {
          setCommentValues(initialCommentValues);
        });
    }
  };
  return (
    <div className={classNames(css.root, mainClassName)} key={idx}>
      <div className={css.topdiv}>
        <span className={css.title}>{title}</span>
        <span className={css.authorName}>
          {authorName}
          {isEdit ? (
            <span onClick={editFunction} className={css.edit}>
              Edit
            </span>
          ) : null}
        </span>
      </div>

      <p className={css.content}>
        {read === "less" ? content.substring(0, 250) + "..." : content}
        {renderReadMore ? (
          content.length < 250 ? null : (
            <span
              className={css.read}
              onClick={(e) => setRead(read === "less" ? "more" : "less")}
            >
              {read === "less" ? "read more" : "read less"}
            </span>
          )
        ) : null}
      </p>

      {!isAuthenticated ? null : commentValues.isOpen ? (
        <div className={css.addcomdv}>
          <button type="button" onClick={comment}>
            {!commentValues.comment && commentValues.isOpen
              ? "Close"
              : "Submit"}
          </button>
          <input
            onChange={(e) => {
              const value = e.target.value;
              setCommentValues({ ...commentValues, comment: value });
            }}
            value={commentValues.comment}
            type="text"
          />
        </div>
      ) : (
        <div className={css.addcomdv}>
          <button
            type="button"
            onClick={() => {
              if (currentUser?._id)
                setCommentValues({ ...commentValues, isOpen: true });
            }}
          >
            {"Comment"}
          </button>
        </div>
      )}
      <button className={css.viewpost} type="button" onClick={handleViewPost}>
        View Post
      </button>
    </div>
  );
};

export default FeedCard;
