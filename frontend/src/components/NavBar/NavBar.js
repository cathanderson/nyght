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
    setShowLoginModal(false);
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link className="logged-in-nav-link" to={"/about"}>
            About
          </Link>
          <Link className="logged-in-nav-link" to={"/profile"}>
            Profile
          </Link>
          <div
            id="logout-nav-link"
            className="logged-in-nav-link"
            onClick={logoutUser}
          >
            Logout
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className="links-auth">
            <Link className="logged-in-nav-link" to={"/about"}> {/* fix janky class name here later... user is logged out when they see this link but we need this class name for spacing purposes*/}
              About
            </Link>
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
          <img id="main-logo" src={logo}/>
          {/* <h1>Nyght</h1> */}
        </Link>
        <div id="nav-links-container">{getLinks()}</div>
      </nav>
    </>
  );
}

export default NavBar;
