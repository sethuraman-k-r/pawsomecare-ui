import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

/* JS Import */
import { URL_PET_STAFF_APPT } from "../../../config/UrlRoute";

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
        </div>
      </div>
    </div>
  );
};

export default StaffHeader;
