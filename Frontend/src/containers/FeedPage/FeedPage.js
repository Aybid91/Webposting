import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import debounce from "lodash/debounce";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "../../components/FeedCard/FeedCard";
import css from "./FeedPage.module.css";
import { getFeed } from "./FeedPage.duck";

const FeedPage = () => {
  const state = useSelector((state) => state.FEED);
  const location = useLocation();
  const navigate = useNavigate();
  const search = queryString.parse(location.search);
  const dispatch = useDispatch();
  const { feedLoading, feed, feedError } = state;
  useEffect(() => {
    dispatch(getFeed({}));
  }, [dispatch]);
  const handleKeywordChange = debounce((value) => {
    if (value) {
      dispatch(getFeed({ keyword: value }));
      navigate(`/feed?keyword=${value}`);
    } else {
      dispatch(getFeed({}));
      navigate(`/feed`);
    }
  }, 700);
  return (
    <div className={css.root}>
      <Header />
      <div className={css.container}>
        <div className={css.topdiv}>
          <span>YOUR FEED</span>
        </div>
        <div className={css.filters}>
          {/* <div> */}
          {/* <label>Search by keyword</label> */}
          <input
            value={search.keyword}
            placeholder="Search by post title or description"
            type="text"
            onChange={(e) => {
              const value = e.target.value;
              handleKeywordChange(value);
            }}
          />
          {/* </div> */}
          {/* <div>
            <label>Search by author</label>
            <input
              value={search.includes("postType=private")}
              type="text"
              onChange={(e) => {
                const value = e.target.value;
                if (value) {
                  dispatch(getCurrentUserPosts("?postType=private"));
                  navigate("/posts?postType=private");
                } else {
                  dispatch(getCurrentUserPosts(""));
                  navigate("/posts");
                }
              }}
            />
          </div> */}
        </div>
        <div>
          {feedLoading
            ? feedLoading
            : feed?.length > 0
            ? feed.map((f, i) => {
                const { title, content, _id } = f;
                return (
                  <FeedCard
                    title={title}
                    content={content}
                    authorName={f.authorId.name}
                    _id={_id}
                    key={i}
                    idx={i}
                  />
                );
              })
            : feedError && (
                <div>
                  <div>Unable to fetch feed</div>
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
