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
    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(signup(user));
  };

  return (
    <form className="session-form" onSubmit={usernameSubmit}>
      <div className="errors">{errors?.firstName}</div>
      <label>
        <span>First name</span>
        <input
          type="text"
          value={firstName}
          onChange={update("firstName")}
          placeholder="First name"
        />
      </label>
      <div className="errors">{errors?.lastName}</div>
      <label>
        <span>Last name</span>
        <input
          type="text"
          value={lastName}
          onChange={update("lastName")}
          placeholder="Last name"
        />
      </label>
      <div className="errors">{errors?.email}</div>
      <label>
        <span>Email</span>
        <input
          type="text"
          value={email}
          onChange={update("email")}
          placeholder="Email"
        />
      </label>
      <div className="errors">{errors?.password}</div>
      <label>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={update("password")}
          placeholder="Password"
        />
      </label>
      <div className="errors">
        {password !== password2 && "Confirm Password field must match"}
      </div>
      <label>
        <span>Confirm Password</span>
        <input
          type="password"
          value={password2}
          onChange={update("password2")}
          placeholder="Confirm Password"
        />
      </label>
      <input
        id="session-form-submit"
        type="submit"
        value="Sign Up"
        disabled={
          !firstName ||
          !firstName ||
          !email ||
          !lastName ||
          !password ||
          password !== password2
        }
      />
    </form>
  );
}

export default SignupForm;
