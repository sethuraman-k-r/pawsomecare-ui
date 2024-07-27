import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

/* TS Import */
import {
  URL_PET_STAFF,
  URL_PET_STAFF_APPT,
  URL_PET_STAFF_APPT_HISTORY,
} from "../../config/UrlRoute";

/* COMPONENT Import */
import { RootState } from "../../store/reducers";
import { toggleSidebar } from "../../store/actions";
import { connect, ConnectedProps } from "react-redux";
import { joinArrayToString } from "../../utils/array.utils";

import Error from "../../hoc-components/error/Error";
import StaffHeader from "./header/StaffHeader";
import PetAppt from "./petappt/PetAppt";
import ApptHistory from "./appthistory/ApptHistory";

const mapStateToProps = (state: RootState) => ({
  showSidebar: state.sidebar,
});

const connector = connect(mapStateToProps, {
  toggleSidebar,
});

type Props = ConnectedProps<typeof connector>;

const PetStaff: React.FC<Props> = (props) => (
  <Fragment>
    <div className={"p-0 col-md-2"}>
      <StaffHeader />
    </div>
    <div
      className={joinArrayToString([
        "p-0 overflow-hidden px-0",
        props.showSidebar ? "col-md-9" : "col-md-8",
      ])}
    >
      <Switch>
        <Redirect path={URL_PET_STAFF} to={URL_PET_STAFF_APPT} exact />
        <Route path={URL_PET_STAFF_APPT}>
          <PetAppt />
        </Route>
        <Route path={URL_PET_STAFF_APPT_HISTORY}>
          <ApptHistory />
        </Route>
        <Route path="**">
          <Error />
        </Route>
      </Switch>
    </div>
  </Fragment>
);

export default connector(PetStaff);
