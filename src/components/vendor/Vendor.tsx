import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

/* TS Import */
import {
  URL_PET_PROFILE,
  URL_PET_HOME,
  URL_PET_ORDER,
  URL_PET_MENU_ITEM,
  URL_PET_PASSWORD,
} from "../../config/UrlRoute";

/* COMPONENT Import */
import Header from "../nav/header/Header";
import Profile from "./profile/Profile";
import Menu from "./menu/Menu";
import Order from "./order/Order";
import { RootState } from "../../store/reducers";
import { toggleSidebar } from "../../store/actions";
import { connect, ConnectedProps } from "react-redux";
import { joinArrayToString } from "../../utils/array.utils";
import Password from "./password/Password";
import UserProfile from "./userprofile/UserProfile";

const mapStateToProps = (state: RootState) => ({
  showSidebar: state.sidebar,
});

const connector = connect(mapStateToProps, {
  toggleSidebar,
});

type Props = ConnectedProps<typeof connector>;

const Vendor: React.FC<Props> = (props) => (
  <div className="d-flex flex-row h-100">
    <div
      className={joinArrayToString([
        "p-0",
        props.showSidebar ? "col-md-1" : "col-md-3",
      ])}
    >
      <Header toggleSidebar={(toggle) => props.toggleSidebar(toggle)} />
    </div>
    <div
      className={joinArrayToString([
        "p-0 overflow-hidden px-0",
        props.showSidebar ? "col-md-11" : "col-md-9",
      ])}
    >
      <Switch>
        <Redirect path={URL_PET_HOME} to={URL_PET_PROFILE} exact />
        <Route path={URL_PET_PROFILE}>
          <UserProfile />
        </Route>
        <Route path={URL_PET_PASSWORD}>
          <Password />
        </Route>
        <Route path={URL_PET_MENU_ITEM}>
          <Menu />
        </Route>
        <Route path={URL_PET_ORDER}>
          <Order />
        </Route>
      </Switch>
    </div>
  </div>
);

export default connector(Vendor);
