import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SessionForm.css";
import { signup, clearSessionErrors } from "../../store/session";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmail;
        break;
      case "firstName":
        setState = setFirstName;
        break;
      case "lastName":
        setState = setLastName;
        break;
      case "password":
        setState = setPassword;
        break;
      case "password2":
        setState = setPassword2;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => setState(e.currentTarget.value);
  };

  const usernameSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ firstName, lastName, email, password }));
  };

  const displayError = (input) => {
    let messages = {
      email: {
        1: "Wrong or invalid email address. Please correct and try again.",
        2: "Enter your email.",
      },
      firstName: {
        1: "Enter your first name",
      },
      lastName: {
        1: "Enter your last name",
      },
      password: {
        1: "Minimum 6 characters required",
      },
      secondpassword: {
        1: "Type your password again",
      },
    };
    let result = "";
    if (errors) {
      switch (input) {
        case "email":
          if (errors.email && email.length < 1) {
            result = messages.email[2];
          } else if (errors.email) {
            result = messages.email[1];
          }
          break;
        case "firstName":
        case "lastName":
        case "password":
          if (errors[input]) result = messages[input][1];
          break;
        case "secondpassword":
          if (password !== password2) {
            result = "Confirm password must match password";
          }
          break;
        default:
          break;
      }
    }

    return <p>{result}</p>;
  };

  return (
    <form className="session-form" onSubmit={usernameSubmit}>
      <label>
        <span>First name</span>
        <input
          type="text"
          value={firstName}
          onChange={update("firstName")}
          placeholder="First name"
        />
      </label>
      <div className="errors">{displayError("firstName")}</div>
      <label>
        <span>Last name</span>
        <input
          type="text"
          value={lastName}
          onChange={update("lastName")}
          placeholder="Last name"
        />
      </label>
      <div className="errors">{displayError("lastName")}</div>
      <label>
        <span>Email</span>
        <input
          type="text"
          value={email}
          onChange={update("email")}
          placeholder="Email"
        />
      </label>
      <div className="errors">{displayError("email")}</div>
      <label>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={update("password")}
          placeholder="Password"
        />
      </label>
      <div className="errors">{displayError("password")}</div>
      <label>
        <span>Confirm Password</span>
        <input
          type="password"
          value={password2}
          onChange={update("password2")}
          placeholder="Confirm Password"
        />
      </label>
      <div className="errors">{displayError("secondpassword")}</div>
      <input id="session-form-submit" type="submit" value="Sign Up" />
    </form>
  );
}

export default SignupForm;
