import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

/* COMPONENT Import */
import Login from "./components/login/Login";
import Error from "./hoc-components/error/Error";
import GuardedRoute from "./hoc-components/guard/GuardedRoute";

/* JS/TS Import */
import {
  URL_LOGIN,
  URL_SIGNUP,
  URL_PET_HOME,
  URL_PET_LANDING,
} from "./config/UrlRoute";
import { RootState } from "./store/reducers";
import Signup from "./components/signup/Signup";
import Home from "./components/home/Home";
import Landing from "./components/landing/Landing";

const mapStateToProps = (state: RootState) => ({
  token: state.auth.accessToken,
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

const App: React.FC<Props> = (props) => (
  <Switch>
    <Redirect from="/" to={URL_PET_LANDING} exact />
    <Route path={URL_PET_LANDING}>
      <Landing />
    </Route>
    <Route path={URL_SIGNUP}>
      <Signup />
    </Route>
    <Route path={URL_LOGIN}>
      <Login />
    </Route>
    <GuardedRoute
      component={Home}
      isAuthenticated={props.token !== ""}
      path={URL_PET_HOME}
    />
    <Route path="**">
      <Error />
    </Route>
  </Switch>
);

export default connector(App);
