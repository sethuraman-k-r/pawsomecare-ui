import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faLock,
  faUser,
  faUserCog,
  faCalendarCheck,
  faPaw,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

/* JS Import */
import { deleteAuthToken } from "../../../store/actions";
import {
  URL_PET_PROFILE,
  URL_PET_PASSWORD,
  URL_PET_ADMIN,
  URL_PET_STAFF,
  URL_PET_USERS,
  URL_PET_LANDING,
} from "../../../config/UrlRoute";
import { RootState } from "../../../store/reducers";
import { joinArrayToString } from "../../../utils/array.utils";

/* CSS Import */
import "./Header.css";
import { Auth } from "../../../services/auth.services";

const mapStateToProps = (state: RootState) => ({
  sidebar: state.sidebar,
  auth: state.auth,
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
    history.push(URL_PET_LANDING);
  };

  return (
    <div
      className="d-flex flex-column h-100 p-2"
      style={{
        backgroundColor: "var(--dark-primary)",
      }}
    >
      <div className="header-navigation">
        <img
          src={"./assets/logo.svg"}
          alt="logo"
          style={{
            width: !props.sidebar ? "100px" : "auto",
            background: "white",
            borderRadius: "5px",
          }}
          className="img-fluid my-4 mx-3 header-logo cursor-pointer"
          onClick={() => props.toggleSidebar(!props.sidebar)}
        />
        <div className="list-group">
          {props.auth.role === "ROLE_ADMIN" && (
            <NavLink
              to={URL_PET_ADMIN}
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
                <FAIcon icon={faUserCog} size={props.sidebar ? "2x" : "1x"} />
              </span>
              {!props.sidebar && "Manage"}
            </NavLink>
          )}
          {props.auth &&
            (props.auth.role === "ROLE_VETERINARIAN" ||
              props.auth.role === "ROLE_GROOMING") && (
              <NavLink
                to={URL_PET_STAFF}
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
                  <FAIcon
                    icon={faCalendarCheck}
                    size={props.sidebar ? "2x" : "1x"}
                  />
                </span>
                {!props.sidebar && "Appointment"}
              </NavLink>
            )}
          {props.auth && props.auth.role === "ROLE_CLIENT" && (
            <NavLink
              to={URL_PET_USERS}
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
              {!props.sidebar && "My Pets"}
            </NavLink>
          )}
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
          onClick={() => {
            history.push(URL_PET_LANDING);
          }}
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
            <FAIcon icon={faHome} size={props.sidebar ? "2x" : "1x"} />
          </span>
          {!props.sidebar && "Home"}
        </button>
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
