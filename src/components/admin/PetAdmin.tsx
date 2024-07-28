import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

/* TS Import */
import {
  URL_PET_ADMIN,
  URL_PET_ADMIN_CLINC,
  URL_PET_ADMIN_PET_TYPES,
  URL_PET_ADMIN_STAFF,
  URL_PET_ADMIN_PETS,
  URL_PET_ADMIN_MEDICINE,
  URL_PET_ADMIN_VACCINE,
  URL_PET_ADMIN_GROOM,
  URL_PET_ADMIN_LICENSE,
} from "../../config/UrlRoute";

/* COMPONENT Import */
import { RootState } from "../../store/reducers";
import { toggleSidebar } from "../../store/actions";
import { connect, ConnectedProps } from "react-redux";
import { joinArrayToString } from "../../utils/array.utils";
import PetCategory from "./petcategory/PetCategory";
import PetGrooming from "./petgrooming/PetGrooming";
import PetVaccine from "./petvaccine/PetVaccine";
import PetMedicine from "./petmedicine/PetMedicine";
import PetClinic from "./petclinic/PetClinic";
import PetAdopt from "./petadopt/PetAdopt";
import AdminHeader from "./header/AdminHeader";
import PetStaff from "./petstaff/PetStaff";

import Error from "../../hoc-components/error/Error";
import PetLicense from "./petlicense/PetLicense";

const mapStateToProps = (state: RootState) => ({
  showSidebar: state.sidebar,
});

const connector = connect(mapStateToProps, {
  toggleSidebar,
});

type Props = ConnectedProps<typeof connector>;

const PetAdmin: React.FC<Props> = (props) => (
  <Fragment>
    <div className={"p-0 col-md-2"}>
      <AdminHeader />
    </div>
    <div
      className={joinArrayToString([
        "p-0 overflow-hidden px-0",
        props.showSidebar ? "col-md-9" : "col-md-8",
      ])}
    >
      <Switch>
        <Redirect path={URL_PET_ADMIN} to={URL_PET_ADMIN_PETS} exact />
        <Route path={URL_PET_ADMIN_CLINC}>
          <PetClinic />
        </Route>
        <Route path={URL_PET_ADMIN_STAFF}>
          <PetStaff />
        </Route>
        <Route path={URL_PET_ADMIN_PET_TYPES}>
          <PetCategory />
        </Route>
        <Route path={URL_PET_ADMIN_PETS}>
          <PetAdopt />
        </Route>
        <Route path={URL_PET_ADMIN_MEDICINE}>
          <PetMedicine />
        </Route>
        <Route path={URL_PET_ADMIN_VACCINE}>
          <PetVaccine />
        </Route>
        <Route path={URL_PET_ADMIN_GROOM}>
          <PetGrooming />
        </Route>
        <Route path={URL_PET_ADMIN_LICENSE}>
          <PetLicense />
        </Route>
        <Route path="**">
          <Error />
        </Route>
      </Switch>
    </div>
  </Fragment>
);

export default connector(PetAdmin);
