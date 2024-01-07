import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import css from "./ViewPostPage.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
const ViewPostPage = () => {
  const userState = useSelector((state) => state.USER);
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = userState;
  const params = useParams();
  const [postComment, setPostComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [postState, setPostState] = useState({ loading: false, error: null });
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const postId = params?.id;
  const showPost = async () => {
    try {
      setPostState({ loading: true, error: null });
      const resp = await axios.get(
        `http://localhost:3500/api/public/showpost?id=${postId}`
      );
      setPostState({ loading: false, error: null });
      setPost(resp.data.post);
      setComments(resp.data.comments);
    } catch (error) {
      setPostState({ loading: false, error });
    }
  };
  useEffect(() => {
    showPost();
  }, []);
  const { title, content } = post || {};
  const authorName = post?.authorId?.name;
  return (
    <div className={css.root}>
      <Header />
      <div className={css.container}>
        <div className={css.topdiv}>
          <span>POST</span>
        </div>
        <div className={css.postdetcont}>
          <div>
            <div>
              <label>Title</label>
              <p>{title}</p>
            </div>
            <div>
              <label>Author</label>
              <p>{authorName}</p>
            </div>
            <div>
              <label>Desciption</label>
              <p>{content}</p>
            </div>
            <div>
              <div>Comments</div>
              <div>
                {" "}
                <button
                  type="button"
                  onClick={(e) => {
                    if (!isAuthenticated) {
                      navigate("/auth");
                    }
                    if (newComment) {
                      axios
                        .post(
                          "http://localhost:3500/api/profile/addComment",
                          {
                            postId,
                            comment: newComment,
                            commentor: currentUser?._id,
                          },
                          {
                            withCredentials: true,
                          }
                        )
                        .then((res) => {
                          setComments([
                            ...comments,
                            { ...res.data, commentor: { ...currentUser } },
                          ]);
                          setPostComment(false);
                          setNewComment("");
                        });
                    } else {
                      setPostComment(!postComment);
                    }
                  }}
                >
                  {postComment
                    ? newComment
                      ? "Submit"
                      : "Close"
                    : "Post a comment"}
                </button>
                {postComment ? (
                  <input
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewComment(value);
                    }}
                    value={newComment}
                  />
                ) : null}
              </div>
              <div>
                {comments?.length > 0
                  ? comments.map((com) => {
                      const { comment } = com;
                      const authorName = com?.commentor?.name;

                      return (
                        <div>
                          <p>{authorName}</p>
                          <p>{comment}</p>
                        </div>
                      );
                    })
                  : "No comments"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPostPage;
