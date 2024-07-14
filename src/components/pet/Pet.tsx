import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

/* TS Import */
import {
  URL_PET_PROFILE,
  URL_PET_HOME,
  URL_PET_PASSWORD,
  URL_PET_PETS,
} from "../../config/UrlRoute";

/* COMPONENT Import */
import Header from "../nav/header/Header";
import { RootState } from "../../store/reducers";
import { toggleSidebar } from "../../store/actions";
import { connect, ConnectedProps } from "react-redux";
import { joinArrayToString } from "../../utils/array.utils";
import Password from "./password/Password";
import UserProfile from "./userprofile/UserProfile";
import PetCategory from "./petcategory/PetCategory";
import PetGrooming from "./petgrooming/PetGrooming";
import PetVaccine from "./petvaccine/PetVaccine";
import PetMedicine from "./petmedicine/PetMedicine";
import PetClinic from "./petclinic/PetClinic";
import PetAdopt from "./petadopt/PetAdopt";

const mapStateToProps = (state: RootState) => ({
  showSidebar: state.sidebar,
});

const connector = connect(mapStateToProps, {
  toggleSidebar,
});

type Props = ConnectedProps<typeof connector>;

const Pet: React.FC<Props> = (props) => (
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
        <Redirect path={URL_PET_HOME} to={URL_PET_PETS} exact />
        <Route path={URL_PET_PROFILE}>
          <UserProfile />
        </Route>
        <Route path={URL_PET_PETS}>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pet-types-tab"
                data-toggle="tab"
                data-target="#pet-types"
                type="button"
                role="tab"
                aria-controls="pet-types"
                aria-selected="true"
              >
                Pet Types
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pets-tab"
                data-toggle="tab"
                data-target="#pets"
                type="button"
                role="tab"
                aria-controls="pets"
                aria-selected="false"
              >
                Pets
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="grooming-tab"
                data-toggle="tab"
                data-target="#grooming"
                type="button"
                role="tab"
                aria-controls="grooming"
                aria-selected="false"
              >
                Grooming
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="vaccine-tab"
                data-toggle="tab"
                data-target="#vaccine"
                type="button"
                role="tab"
                aria-controls="vaccine"
                aria-selected="false"
              >
                Vaccine
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="medicine-tab"
                data-toggle="tab"
                data-target="#medicine"
                type="button"
                role="tab"
                aria-controls="medicine"
                aria-selected="false"
              >
                Medicine
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="clinic-tab"
                data-toggle="tab"
                data-target="#clinic"
                type="button"
                role="tab"
                aria-controls="clinic"
                aria-selected="false"
              >
                Clinic
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="pet-types"
              role="tabpanel"
              aria-labelledby="pet-types-tab"
            >
              <PetCategory />
            </div>
            <div
              className="tab-pane fade"
              id="pets"
              role="tabpanel"
              aria-labelledby="pets-tab"
            >
              <PetAdopt />
            </div>
            <div
              className="tab-pane fade"
              id="grooming"
              role="tabpanel"
              aria-labelledby="grooming-tab"
            >
              <PetGrooming />
            </div>
            <div
              className="tab-pane fade"
              id="vaccine"
              role="tabpanel"
              aria-labelledby="vaccine-tab"
            >
              <PetVaccine />
            </div>
            <div
              className="tab-pane fade"
              id="medicine"
              role="tabpanel"
              aria-labelledby="medicine-tab"
            >
              <PetMedicine />
            </div>
            <div
              className="tab-pane fade"
              id="clinic"
              role="tabpanel"
              aria-labelledby="clinic-tab"
            >
              <PetClinic />
            </div>
          </div>
        </Route>
        <Route path={URL_PET_PASSWORD}>
          <Password />
        </Route>
      </Switch>
    </div>
  </div>
);

export default connector(Pet);
