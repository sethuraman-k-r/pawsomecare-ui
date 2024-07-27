import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faHistory } from "@fortawesome/free-solid-svg-icons";

/* JS Import */
import {
  URL_PET_STAFF_APPT,
  URL_PET_STAFF_APPT_HISTORY,
} from "../../../config/UrlRoute";

/* CSS Import */
import "./StaffHeader.css";

const StaffHeader: React.FC = () => {
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
            to={URL_PET_STAFF_APPT}
            className={"list-group-item list-group-item-action"}
            activeClassName="active"
          >
            <span className={"badge mr-3"}>
              <FAIcon icon={faCalendarCheck} size="1x" />
            </span>
            Appointments
          </NavLink>
          <NavLink
            to={URL_PET_STAFF_APPT_HISTORY}
            className={"list-group-item list-group-item-action"}
            activeClassName="active"
          >
            <span className={"badge mr-3"}>
              <FAIcon icon={faHistory} size="1x" />
            </span>
            History
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default StaffHeader;
