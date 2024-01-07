import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./containers/LandingPage/LandingPage";
import AuthPage from "./containers/AuthPage/AuthPage";
import FeedPage from "./containers/FeedPage/FeedPage";
import CommentsPage from "./containers/CommentsPage/CommentsPage";
import PostsPage from "./containers/PostsPage/PostsPage";
import { useEffect } from "react";
import { fetchUserData } from "./Redux/user.duck";
import { useDispatch } from "react-redux";
import ViewPostPage from "./containers/ViewPostPage/ViewPostPage";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route
          index
          key="home"
          path="/"
          Component={() => <LandingPage />}
        ></Route>
        <Route
          key="feed"
          exact
          path="/feed"
          Component={() => <FeedPage />}
        ></Route>
        <Route
          key="viewpost"
          exact
          path="/viewpost/:id"
          Component={() => <ViewPostPage />}
        ></Route>
        <Route
          key="posts"
          exact
          path="/posts"
          Component={() => <PostsPage />}
        ></Route>
        <Route
          key="comments"
          path="/comments"
          exact
          Component={() => <CommentsPage />}
        ></Route>
        <Route key="auth" path="/auth" Component={() => <AuthPage />}></Route>
      </Routes>
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
