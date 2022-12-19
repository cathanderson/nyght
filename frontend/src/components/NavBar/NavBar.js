import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import { logout } from "../../store/session";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { LoginModal, SignupModal } from "../../context/Modal";
import LoginForm from "../SessionForms/LoginForm";
import SignupForm from "../SessionForms/SignupForm";
import x from "../../assets/icons/close.png"

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
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
        <>
          <div className="links-auth">
            <Link
              id="signup-form-nav-link"
              className="nav-link"
              onClick={() => setShowSignupModal(true)}
            >
              Sign up
            </Link>
            <Link className="nav-link" onClick={() => setShowLoginModal(true)}>
              Log in
            </Link>
          </div>
          {showLoginModal && (
            <LoginModal onClose={() => setShowLoginModal(false)}>
              <img
                onClick={() => setShowLoginModal(false)}
                src={x}
                className="form-x"
              />
              <h3 className="modal-title">Log in</h3>
              <LoginForm />
            </LoginModal>
          )}
          {showSignupModal && (
            <SignupModal onClose={() => setShowSignupModal(false)}>
              <img
                onClick={() => setShowSignupModal(false)}
                src={x}
                className="form-x"
              />
              <h3 className="modal-title">Sign Up</h3>
              <SignupForm />
            </SignupModal>
          )}
        </>
      );
    }
  };

  return (
    <>
      <nav id="main-nav">
        <Link id="main-logo-container" className="nav-link" to={"/"}>
          {/* <img id="main-logo" src={logo}/> */}
          <h1>Nyght</h1>
        </Link>
        <div id="nav-links-container">{getLinks()}</div>
      </nav>
    </>
  );
}

export default NavBar;
