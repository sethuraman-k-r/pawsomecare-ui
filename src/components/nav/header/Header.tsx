import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faLock,
  faUser,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";

/* JS Import */
import { deleteAuthToken } from "../../../store/actions";
import {
  URL_LOGIN,
  URL_PET_PROFILE,
  URL_PET_MENU,
  URL_PET_ORDER,
  URL_PET_PASSWORD,
  URL_PET_PETS,
} from "../../../config/UrlRoute";
import { RootState } from "../../../store/reducers";
import { UserProfileProps } from "../../../props/VendorProps";
import { joinArrayToString } from "../../../utils/array.utils";

/* CSS Import */
import "./Header.css";
import { Auth } from "../../../services/auth.services";

const mapStateToProps = (state: RootState) => ({
  profile: state.profile as UserProfileProps,
  sidebar: state.sidebar,
});

const connector = connect(mapStateToProps, { deleteAuthToken });

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  toggleSidebar: (toggle: boolean) => void;
};

const Header: React.FC<Props> = (props) => {
  const history = useHistory();

  const doLogout = async () => {
    await Auth.signOut();
    props.deleteAuthToken();
    history.push(URL_LOGIN);
  };

  return (
    <div
      className="d-flex flex-column h-100 p-2"
      style={{
        backgroundColor: "#ffe6f0",
      }}
    >
      <div className="header-navigation">
        <img
          src={props.sidebar ? "./assets/icon.png" : "./assets/logo.png"}
          alt="logo"
          style={{
            width: !props.sidebar ? "200px" : "auto",
          }}
          className="img-fluid my-4 mx-3 header-logo"
          onClick={() => props.toggleSidebar(!props.sidebar)}
        />
        <div className="list-group">
          <NavLink
            to={URL_PET_PETS}
            className={joinArrayToString([
              "list-group-item list-group-item-action",
              props.sidebar ? "text-center" : "",
            ])}
            activeClassName="active"
          >
            <span
              className={joinArrayToString([
                "badge",
                props.sidebar ? "" : "mr-3",
              ])}
            >
              <FAIcon icon={faPaw} size={props.sidebar ? "2x" : "1x"} />
            </span>
            {!props.sidebar && "Pets"}
          </NavLink>
          <NavLink
            to={URL_PET_PROFILE}
            className={joinArrayToString([
              "list-group-item list-group-item-action",
              props.sidebar ? "text-center" : "",
            ])}
            activeClassName="active"
          >
            <span
              className={joinArrayToString([
                "badge",
                props.sidebar ? "" : "mr-3",
              ])}
            >
              <FAIcon icon={faUser} size={props.sidebar ? "2x" : "1x"} />
            </span>
            {!props.sidebar && "Profile"}
          </NavLink>
          <NavLink
            to={URL_PET_PASSWORD}
            className={joinArrayToString([
              "list-group-item list-group-item-action",
              props.sidebar ? "text-center" : "",
            ])}
            activeClassName="active"
          >
            <span
              className={joinArrayToString([
                "badge",
                props.sidebar ? "" : "mr-3",
              ])}
            >
              <FAIcon icon={faLock} size={props.sidebar ? "2x" : "1x"} />
            </span>
            {!props.sidebar && "Password"}
          </NavLink>
        </div>
      </div>
      <div
        style={{
          flexGrow: 1,
        }}
      >
        <button
          type="button"
          onClick={doLogout}
          className={joinArrayToString([
            "list-group-item list-group-item-action",
            props.sidebar ? "text-center" : "",
          ])}
        >
          <span
            className={joinArrayToString([
              "badge",
              props.sidebar ? "" : "mr-3",
            ])}
          >
            <FAIcon icon={faSignOutAlt} size={props.sidebar ? "2x" : "1x"} />
          </span>
          {!props.sidebar && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default connector(Header);
