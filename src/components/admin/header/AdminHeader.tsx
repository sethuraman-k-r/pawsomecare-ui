import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faClinicMedical,
  faDog,
  faHospitalUser,
  faIdBadge,
  faPaw,
  faSyringe,
  faTablets,
} from "@fortawesome/free-solid-svg-icons";

/* JS Import */
import {
  URL_PET_ADMIN_CLINC,
  URL_PET_ADMIN_PETS,
  URL_PET_ADMIN_PET_TYPES,
  URL_PET_ADMIN_STAFF,
  URL_PET_ADMIN_MEDICINE,
  URL_PET_ADMIN_VACCINE,
  URL_PET_ADMIN_GROOM,
  URL_PET_ADMIN_LICENSE,
} from "../../../config/UrlRoute";

/* CSS Import */
import "./AdminHeader.css";

const AdminHeader: React.FC = () => {
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
            to={URL_PET_ADMIN_CLINC}
            className={"list-group-item list-group-item-action"}
            activeClassName="active"
          >
            <span className={"badge mr-3"}>
              <FAIcon icon={faClinicMedical} size="1x" />
            </span>
            Clinic
          </NavLink>
          <NavLink
            to={URL_PET_ADMIN_STAFF}
            className={"list-group-item list-group-item-action"}
            activeClassName="active"
          >
            <span className={"badge mr-3"}>
              <FAIcon icon={faHospitalUser} size="1x" />
            </span>
            Staff
          </NavLink>
          <NavLink
            to={URL_PET_ADMIN_PET_TYPES}
            className={"list-group-item list-group-item-action"}
            activeClassName="active"
          >
            <span className={"badge mr-3"}>
              <FAIcon icon={faPaw} size="1x" />
            </span>
            Pet Types
          </NavLink>
          <NavLink
            to={URL_PET_ADMIN_PETS}
            className={"list-group-item list-group-item-action"}
            activeClassName="active"
          >
            <span className={"badge mr-3"}>
              <FAIcon icon={faDog} size="1x" />
            </span>
            Pets
          </NavLink>
          <NavLink
            to={URL_PET_ADMIN_MEDICINE}
            className={"list-group-item list-group-item-action"}
            activeClassName="active"
          >
            <span className={"badge mr-3"}>
              <FAIcon icon={faTablets} size="1x" />
            </span>
            Medicine
          </NavLink>
          <NavLink
            to={URL_PET_ADMIN_VACCINE}
            className={"list-group-item list-group-item-action"}
            activeClassName="active"
          >
            <span className={"badge mr-3"}>
              <FAIcon icon={faSyringe} size="1x" />
            </span>
            Vaccine
          </NavLink>
          <NavLink
            to={URL_PET_ADMIN_GROOM}
            className={"list-group-item list-group-item-action"}
            activeClassName="active"
          >
            <span className={"badge mr-3"}>
              <FAIcon icon={faBath} size="1x" />
            </span>
            Grooming
          </NavLink>
          <NavLink
            to={URL_PET_ADMIN_LICENSE}
            className={"list-group-item list-group-item-action"}
            activeClassName="active"
          >
            <span className={"badge mr-3"}>
              <FAIcon icon={faIdBadge} size="1x" />
            </span>
            License
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
