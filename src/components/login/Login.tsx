import React, { useState, useEffect, Fragment } from "react";
import { connect, ConnectedProps } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

/* COMPONENT Import */
import Backdrop from "../../hoc-components/UI/backdrop/Backdrop";

/* TS Import */
import { addAuthToken } from "../../store/actions";
import { RootState } from "../../store/reducers";
import { URL_SIGNUP, URL_PET_HOME } from "../../config/UrlRoute";

/* CSS Import */
import "./Login.css";
import { Auth } from "../../services/auth.services";

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

const connector = connect(mapStateToProps, {
  addAuthToken,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Login: React.FC<Props> = (props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
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

  const doLogin = async () => {
    if (username && password) {
      try {
        setIsSigningIn(true);
        const response = await Auth.signIn(username, password);
        const { token, email, role } = response;
        if (token && response.username && email && role) {
          Auth.setLocalStorage(email, response.username, role, token);
          props.addAuthToken(token, email, response.username, role);
          history.push(URL_PET_HOME);
        }
      } catch (err: any) {
        const message = err?.message;
        setIsSigningIn(false);
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
      {isSigningIn && (
        <Backdrop message="Please wait while we are verifying you" />
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
                <label className="text-secondary">Your email</label>
                <input
                  type="email"
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
                  className="btn bg-primary form-control font-weight-bold mt-4 mb-2 text-white login-button"
                  onClick={doLogin}
                >
                  Login
                </button>
              </div>
              <NavLink
                to={URL_SIGNUP}
                className="d-flex justify-content-center small text-primary"
                style={{ flexGrow: 1 }}
              >
                Don't have an account? &nbsp;
                <span className="font-weight-bold">Sign up</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default connector(Login);
