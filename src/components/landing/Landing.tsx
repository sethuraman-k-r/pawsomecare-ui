import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/reducers";
import { URL_LOGIN, URL_PET_HOME, URL_SIGNUP } from "../../config/UrlRoute";
import { toggleSidebar } from "../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { HOME_DATA } from "../../utils/home-data.util";
import { Auth } from "../../services/auth.services";

const mapStateToProps = (state: RootState) => ({
  user: state.auth,
  showSidebar: state.sidebar,
});

const connector = connect(mapStateToProps, {
  toggleSidebar,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  toggleSidebar: (toggle: boolean) => void;
};

const Landing: React.FC<Props> = (props) => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [services, setServices] = useState<Array<Array<any>>>([]);

  const processData = (data: Array<any>) => {
    const indices = [];
    for (let i = 0; i < data.length; i = i + 2) {
      indices.push([i, i + 2].filter((r) => r !== undefined || r !== null));
    }

    const result = [...indices].map((idxs) => data.slice(...idxs));

    return result;
  };

  useEffect(() => {
    if (props.user.role) {
      setLoggedIn(true);
      if (["ROLE_VETERINARIAN", "ROLE_GROOMING"].includes(props.user.role)) {
        setServices(processData(HOME_DATA.filter((d) => d.role === "STAFF")));
      } else if (["ROLE_ADMIN"].includes(props.user.role)) {
        setServices(processData(HOME_DATA.filter((d) => d.role === "ADMIN")));
      } else {
        setServices(processData(HOME_DATA.filter((d) => d.role === "CLIENT")));
      }
    } else {
      setLoggedIn(false);
      setServices(processData(HOME_DATA.filter((d) => d.showDefault)));
    }
  }, [props.user.role]);

  return (
    <Fragment>
      <nav className="site-header sticky-top py-1 bg-dark-primary">
        <div className="container d-flex flex-row justify-content-between">
          <a className="py-2" aria-label="Pawsomecare">
            <img
              src="./assets/logo.svg"
              alt="logo"
              width={50}
              className="bg-white rounded"
            />
          </a>

          <ul className="nav justify-content-center align-items-center">
            {loggedIn && (
              <>
                <li className="nav-item">
                  <NavLink
                    to={URL_PET_HOME}
                    className={"nav-link text-white"}
                    activeClassName="active"
                  >
                    <span className={"badge"}>
                      <FontAwesomeIcon icon={faUserAlt} size="1x" />
                    </span>
                    {props.user.username}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={URL_PET_HOME}
                    className={"nav-link text-white"}
                    activeClassName="active"
                    onClick={async () => {
                      await Auth.signOut();
                      window.location.reload();
                    }}
                  >
                    <span className={"badge"}>
                      <FontAwesomeIcon icon={faSignOutAlt} size="1x" />
                    </span>
                    Logout
                  </NavLink>
                </li>
              </>
            )}
            {!loggedIn && (
              <>
                <li className="nav-item">
                  <NavLink
                    to={URL_LOGIN}
                    className={"nav-link text-white"}
                    activeClassName="active"
                  >
                    <span className={"badge mr-3"}>
                      <FontAwesomeIcon icon={faSignInAlt} size="1x" />
                    </span>
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={URL_SIGNUP}
                    className={"nav-link text-white"}
                    activeClassName="active"
                  >
                    <span className={"badge mr-3"}>
                      <FontAwesomeIcon icon={faSignOutAlt} size="1x" />
                    </span>
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
        <div className="col-md-8 p-lg-5 mx-auto my-5">
          <h1 className="display-4 font-weight-normal">Pawsomecare</h1>
          <p className="lead font-weight-normal">
            At Pawsome Care, we are dedicated to providing exceptional care for
            your furry family members. Whether it's vaccination and veterinary
            appointments, pet adoption services, licensing, or booking for
            grooming and pet care, our team is here to ensure your pets receive
            the best. With several clinics located in London, Ontario, Canada,
            we are committed to making pet care accessible and convenient for
            our community. Trust us to keep your pets happy, healthy, and
            well-groomed. Your pet's well-being is our passion.
          </p>
        </div>
      </div>

      <h4
        className="display-5 text-center"
        style={{ textDecoration: "underline" }}
      >
        Services
      </h4>

      {services.map((s, i) => (
        <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3" key={i}>
          {s.length > 0 && (
            <div
              className={`w-50 mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden ${
                i / 2 === 0 ? "bg-dark-primary text-white" : "bg-light"
              }`}
            >
              <div className="my-3 py-3">
                <h2 className="display-5">{s[0].title}</h2>
                <p className="lead">{s[0].desc}</p>
              </div>
              <div
                className={`shadow-sm mx-auto d-flex flex-column align-items-center justify-content-center ${
                  i % 2 === 0 ? "bg-light" : "bg-dark-primary"
                }`}
                style={{
                  width: "80%",
                  height: "300px",
                  borderRadius: "21px 21px 0 0",
                }}
              >
                <FontAwesomeIcon
                  icon={s[0].icon}
                  className={`${
                    i % 2 !== 0 ? "text-light" : "text-dark-primary"
                  }`}
                  size="10x"
                />
                <button
                  className={`btn mt-3 ${
                    i % 2 !== 0
                      ? "text-light border-white"
                      : "text-dark-primary border-dark-primary"
                  }`}
                  onClick={() => history.push(s[0].url)}
                >
                  {s[0].text}
                </button>
              </div>
            </div>
          )}
          {s.length > 1 && (
            <div
              className={`w-50 mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden  ${
                i / 2 !== 0 ? "bg-dark-primary text-white" : "bg-light"
              }`}
            >
              <div className="my-3 p-3">
                <h2 className="display-5">{s[1].title}</h2>
                <p className="lead">{s[1].desc}</p>
              </div>
              <div
                className={`shadow-sm mx-auto d-flex flex-column align-items-center justify-content-center ${
                  i % 2 !== 0 ? "bg-light" : "bg-dark-primary"
                }`}
                style={{
                  width: "80%",
                  height: "300px",
                  borderRadius: "21px 21px 0 0",
                }}
              >
                <FontAwesomeIcon
                  icon={s[1].icon}
                  className={`${
                    i % 2 === 0 ? "text-light" : "text-dark-primary"
                  }`}
                  size="10x"
                />
                <button
                  className={`btn mt-3 ${
                    i % 2 === 0
                      ? "text-light border-white"
                      : "text-dark-primary border-dark-primary"
                  }`}
                  onClick={() => history.push(s[1].url)}
                >
                  {s[1].text}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      <footer className="container py-1">
        <div className="row">
          <div className="col-12 text-center">
            <img
              src="./assets/logo.svg"
              alt="logo"
              width={50}
              className="bg-white rounded"
              style={{ filter: "grayscale(100%)" }}
            />
            <small className="d-block mb-3 text-muted">
              &copy; Pawsomecare 2024
            </small>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default connector(Landing);
