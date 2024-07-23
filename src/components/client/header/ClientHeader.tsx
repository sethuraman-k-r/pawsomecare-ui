import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faDog,
  faIdBadge,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";

/* JS Import */
import {
  URL_PET_USERS_ADOPT,
  URL_PET_USERS_APPT,
  URL_PET_USERS_LICENSE,
  URL_PET_USERS_PETS,
} from "../../../config/UrlRoute";

/* CSS Import */
import "./ClientHeader.css";

const ClientHeader: React.FC = () => {
  return (
    <div
      className="d-flex flex-column h-100 p-2"
      style={{
        backgroundColor: "var(--dark-primary-transparent)",
      }}
    >
      <div className="header-navigation">
        <div className="list-group">
          <NavLink
            to={URL_PET_USERS_PETS}
            className={"list-group-item list-group-item-action"}
            activeClassName="active"
          >
            <span className={"badge mr-3"}>
              <FAIcon icon={faPaw} size="1x" />
            </span>
            My Pets
          </NavLink>
          <NavLink
            to={URL_PET_USERS_ADOPT}
            className={"list-group-item list-group-item-action"}
            activeClassName="active"
          >
            <span className={"badge mr-3"}>
              <FAIcon icon={faDog} size="1x" />
            </span>
            Adopt Pets
          </NavLink>
          <NavLink
            to={URL_PET_USERS_LICENSE}
            className={"list-group-item list-group-item-action"}
            activeClassName="active"
          >
            <span className={"badge mr-3"}>
              <FAIcon icon={faIdBadge} size="1x" />
            </span>
            License
          </NavLink>
          <NavLink
            to={URL_PET_USERS_APPT}
            className={"list-group-item list-group-item-action"}
            activeClassName="active"
          >
            <span className={"badge mr-3"}>
              <FAIcon icon={faCalendarCheck} size="1x" />
            </span>
            Appointments
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ClientHeader;
