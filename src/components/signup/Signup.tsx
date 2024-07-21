import React, { useState, useEffect, Fragment } from "react";
import { connect, ConnectedProps } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

/* COMPONENT Import */
import Backdrop from "../../hoc-components/UI/backdrop/Backdrop";

/* TS Import */
import { addAuthToken } from "../../store/actions";
import { RootState } from "../../store/reducers";
import { URL_LOGIN, URL_PET_HOME } from "../../config/UrlRoute";
import { Auth } from "../../services/auth.services";

/* CSS Import */
import "./Signup.css";

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

const connector = connect(mapStateToProps, {
  addAuthToken,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Signup: React.FC<Props> = (props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
    async function checkUserAuthStatus() {
      const { accessToken, username, email, role } = props.auth;
      if (accessToken && username && email && role) {
        history.push(URL_PET_HOME);
      } else {
        try {
          const { name, email, token, role } = Auth.currentUserInfo();
          if (name && email && token && role) {
            props.addAuthToken(token, email, name, role);
            history.push(URL_PET_HOME);
          } else {
            setIsVerifying(false);
          }
        } catch (err) {
          setIsVerifying(false);
        }
      }
    }

    if (!props.auth.accessToken) {
      checkUserAuthStatus();
    }
  });

  const doSignup = async () => {
    if (username && password && email) {
      try {
        setIsSigningUp(true);
        const response = await Auth.signUp(email, username, password);
        setEmail("");
        setPassword("");
        setUsername("");
        response === 200 && alert("Account created successfully");
        setIsSigningUp(false);
      } catch (err: any) {
        const message = err?.message;
        setIsSigningUp(false);
        setPassword("");
        if (message) {
          alert(message);
        }
      }
    }
  };

  const doUpdateFields = (
    ev: React.ChangeEvent<HTMLInputElement>,
    updateFn: React.Dispatch<React.SetStateAction<string>>
  ) => {
    updateFn(ev.target.value);
  };

  return (
    <Fragment>
      {isVerifying && <Backdrop message="Please wait for a while..." />}
      {isSigningUp && (
        <Backdrop message="Please wait while we are creating an account" />
      )}
      <div className="container-fluid d-flex flex-row row h-100 m-0 p-0">
        <div className="col-md-12 d-flex flex-column p-0">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ flexGrow: 14 }}
          >
            <div className="login-form">
              <div className="text-center">
                <img
                  src={"./assets/logo.svg"}
                  width="100"
                  height="100"
                  alt="icon"
                  className="mb-4"
                />
              </div>
              <div className="form-group">
                <label className="text-secondary">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(ev) => doUpdateFields(ev, setEmail)}
                />
              </div>
              <div className="form-group">
                <label className="text-secondary">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(ev) => doUpdateFields(ev, setUsername)}
                />
              </div>
              <div className="form-group">
                <label className="text-secondary">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(ev) => doUpdateFields(ev, setPassword)}
                />
              </div>
              <div className="form-group">
                <button
                  className="btn bg-primary form-control mt-4 mb-2 text-white login-button"
                  onClick={doSignup}
                >
                  Create an account
                </button>
              </div>
              <NavLink
                to={URL_LOGIN}
                className="d-flex justify-content-center small text-primary"
                style={{ flexGrow: 1 }}
              >
                Already have an account? &nbsp;
                <span className="font-weight-bold">Sign in</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default connector(Signup);
