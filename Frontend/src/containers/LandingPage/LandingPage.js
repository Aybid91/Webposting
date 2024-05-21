import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import HeroImg from "../../assets/LandingPageImages/heroImg.jpg";
import SecImg from "../../assets/LandingPageImages/secondImage.jpg";
import css from "./LandingPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "../../components/FeedCard/FeedCard";
import { MdSupervisorAccount } from "react-icons/md";
import { FaComments } from "react-icons/fa6";
import { BsFilePost } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { getLandingPageFeed } from "./LandingPage.duck";
import { useNavigate } from "react-router";
import classNames from "classnames";
const gettingStartedContent = [
  {
    key: 1,
    logo: <MdSupervisorAccount />,
    title: "Join",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    key: 2,
    logo: <BsFilePost />,
    title: "Post",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    key: 3,
    logo: <FaComments />,
    title: "Comment",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
];

const moreAbout = [
  {
    key: 1,
    title: "Join",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    key: 2,
    title: "Post",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    key: 3,
    title: "Comment",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
];
const LandingPage = () => {
  const state = useSelector((state) => state.LANDING_PAGE);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLandingPageFeed({ limit: 3 }));
  }, [dispatch]);
  const { feedLoading, feed, feedError } = state;
  return (
    <div>
      <Header />
      <div className={css.heroContainer}>
        <img className={css.heroImg} src={HeroImg} alt="Hero-Image" />
        <div className={css.overlay}>
          <p className={css.heroHead1}>Let's Get Social</p>
          <p></p>
        </div>
      </div>
      <div className={classNames(css.section, css.gettingStartedSection)}>
        <p className={css.sectionHeading}>GETTING STARTED</p>
        <div className={css.gettingStartedDiv}>
          {gettingStartedContent.map((start) => (
            <div className={css.gettingStartedItems} key={start.key}>
              {start.logo}
              <p className={css.getStrtTitle}>{start.title}</p>
              <p>{start.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={css.section}>
        <p className={css.sectionHeading}>HERE ARE SOME LATEST POSTS FOR YOU</p>
        <div className={css.feeds}>
          {feed.map((f, i) => {
            const { title, content, _id } = f;
            return (
              <FeedCard
                title={title}
                content={content}
                mainClassName={css.landingPageFeedCard}
                authorName={f.authorId.name}
                _id={_id}
                key={i}
                idx={i}
                renderReadMore={false}
              />
            );
          })}
        </div>
        <button
          className={css.seeAllBtn}
          type="button"
          onClick={() => navigate("/feed")}
        >
          See All Posts
        </button>
      </div>
      <div className={classNames(css.section, css.moreAboutSection)}>
        <div>
          <p className={css.mreabtHeading}>Lorem Ipsum Dolor Imit</p>
          {moreAbout.map((m) => (
            <div key={m.key} className={css.moreAboutItem}>
              <FaStar />
              <div>
                <p>{`${m.key}.  ${m.title}`}</p>
                <p>{m.content}</p>
              </div>
            </div>
          ))}
        </div>
        <img src={SecImg} />
      </div>
    </div>
  );
};

export default LandingPage;
