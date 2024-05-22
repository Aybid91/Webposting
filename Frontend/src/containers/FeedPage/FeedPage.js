import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import { MdClose } from "react-icons/md";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "../../components/FeedCard/FeedCard";
import css from "./FeedPage.module.css";
import { getFeed } from "./FeedPage.duck";
import Footer from "../../components/Footer/Footer";

const FeedPage = () => {
  const location = useLocation();
  const search = queryString.parse(location.search);
  const state = useSelector((state) => state.FEED);
  const [searchInput, setSearchInput] = useState(search?.keyword || "");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { feedLoading, feed, feedError } = state;
  useEffect(() => {
    dispatch(getFeed({}));
  }, [dispatch]);
  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput) {
      dispatch(getFeed({ keyword: searchInput }));
      navigate(`/feed?keyword=${searchInput}`);
    } else {
      dispatch(getFeed({}));
      navigate(`/feed`);
    }
  };
  const handleClear = () => {
    setSearchInput("");
    if (search?.keyword) {
      dispatch(getFeed({}));
      navigate(`/feed`);
    }
  };
  const handleKeywordChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchInput(value);
    } else {
      setSearchInput("");
    }
  };
  return (
    <div className={css.root}>
      <Header />
      <div className={css.container}>
        <div className={css.topdiv}>
          <span className={css.heading}>Welcome to feed</span>
          <span className={css.feedDetails}>
            {" "}
            Stay updated with the latest content, engage with diverse posts.
            Whether you're looking for trending topics, personal updates, or
            creative expressions, the Feeds Page offers a seamless way to
            explore and interact with the vibrant activity on our platform.{" "}
          </span>
        </div>
        <form onSubmit={onSearchSubmit} className={css.filters}>
          <div className={css.inputDiv}>
            <input
              value={searchInput}
              placeholder="Search by post title or description"
              type="text"
              onChange={handleKeywordChange}
            />
            {searchInput ? (
              <button type="button" onClick={handleClear}>
                <MdClose />
              </button>
            ) : null}
          </div>

          <button type="submit">Search</button>
        </form>
        <div>
          {feedLoading ? (
            feedLoading
          ) : feed?.length > 0 ? (
            <div className={css.cardsContainer}>
              {feed.map((f, i) => {
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
              })}
            </div>
          ) : (
            feedError && (
              <div>
                <div>Unable to fetch feed</div>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeedPage;
