import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import css from "./PostsPage.module.css";
import { addPost, getCurrentUserPosts, updatePost } from "./PostsPage.duck";
import FeedCard from "../../components/FeedCard/FeedCard";
import classNames from "classnames";
const initialStatePost = {
  title: "",
  content: "",
  postType: null,
  _id: null,
};
const PostsPage = () => {
  const state = useSelector((state) => state.POSTS);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [addOpen, setAddOpen] = useState(false);
  const [newPost, setNewPost] = useState(initialStatePost);
  useEffect(() => {
    dispatch(getCurrentUserPosts(location.search));
  }, [dispatch, location.search]);
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewPost({ ...newPost, [name]: value });
  };
  const { currentUserPosts = [] } = state || {};
  const addPostDiv = (
    <div className={css.popupdiv}>
      <div className={css.popupsecdiv}>
        <h2>Add a post</h2>
        <div className={css.inputcont}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newPost.title}
            onChange={onChange}
          />
        </div>
        <div className={css.inputcont}>
          <label htmlFor="content">Content</label>
          <textarea
            type="textarea"
            id="content"
            name="content"
            value={newPost.content}
            onChange={onChange}
          />
        </div>
        <div className={css.chkbxdv}>
          <div className={css.inputcont}>
            <label htmlFor="public">Public</label>
            <input
              type="radio"
              name="postType"
              value="public"
              id="public"
              onChange={onChange}
              checked={newPost.postType === "public"}
            />
          </div>
          <div className={css.inputcont}>
            <label htmlFor="private">Private</label>
            <input
              type="radio"
              name="postType"
              value="private"
              id="private"
              onChange={onChange}
              checked={newPost.postType === "private"}
            />
          </div>
        </div>
        <div className={css.buttndv}>
          <button
            onClick={() => {
              const { title, content, postType, _id } = newPost;
              if (_id && title && content && postType) {
                dispatch(updatePost({ title, content, postType, _id }));
              } else if (title && content && postType) {
                dispatch(addPost(newPost));
              }
              setAddOpen(false);
              setNewPost(initialStatePost);
            }}
            type="button"
          >
            Post
          </button>
          <button onClick={() => setAddOpen(false)} type="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <div className={css.root}>
      <Header />
      <div className={css.container}>
        <div className={css.topdiv}>
          <span>YOUR POSTS</span>
          <button onClick={() => setAddOpen(true)} type="button">
            ADD POST
          </button>
        </div>
        <div
          className={classNames(css.filters, {
            [css.lightup]: location.search.includes("postType=private"),
          })}
        >
          <div>
            <label htmlFor="pvtonly">Private Only</label>
            <input
              id="pvtonly"
              checked={location.search.includes("postType=private")}
              type="checkbox"
              onChange={(e) => {
                const checked = e.target.checked;
                if (checked) {
                  dispatch(getCurrentUserPosts("?postType=private"));
                  navigate("/posts?postType=private");
                } else {
                  dispatch(getCurrentUserPosts(""));
                  navigate("/posts");
                }
              }}
            />
          </div>
        </div>
        <div>
          {currentUserPosts?.length > 0 ? (
            currentUserPosts.map((post, i) => {
              const { title, content, postType, _id } = post;
              return (
                <FeedCard
                  title={title}
                  content={content}
                  authorName={post.authorId.name}
                  idx={i}
                  _id={_id}
                  isEdit={true}
                  editFunction={() => {
                    setAddOpen(true);
                    setNewPost({ title, content, postType, _id });
                  }}
                />
              );
            })
          ) : (
            <div>
              {" "}
              <h2>You have added no post</h2>
            </div>
          )}
        </div>

        {addOpen ? addPostDiv : null}
      </div>
    </div>
  );
};

export default PostsPage;
