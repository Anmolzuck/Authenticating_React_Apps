import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth_context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const isLoggedIn = authCtx.isLoggedIn;

  const changePasswordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const updatedPassword = changePasswordRef.current.value;

    if (isLoggedIn) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBmfGAROx7VNa2BMpD9FiDah2Tye1lxst4",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            password: updatedPassword,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        history.replace("/");
      });
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          ref={changePasswordRef}
          type="password"
          minLength="7"
          id="new-password"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
