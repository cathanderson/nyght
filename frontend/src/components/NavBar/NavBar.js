import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import { logout } from "../../store/session";

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          {/* <Link to={"/tweets"}>All Tweets</Link> */}
          <Link className="nav-link" to={"/profile"}>
            Profile
          </Link>
          {/* <Link to={"/tweets/new"}>Write a Tweet</Link> */}
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link id="signup-form-nav-link" className="nav-link" to={"/signup"}>
            Signup
          </Link>
          <Link className="nav-link" to={"/login"}>
            Login
          </Link>
        </div>
      );
    }
  };

  return (
    <>
      <nav id="main-nav">
        <h1 id="main-logo">Nyght</h1>
        <div id="nav-links-container">{getLinks()}</div>
      </nav>
    </>
  );
}

export default NavBar;
