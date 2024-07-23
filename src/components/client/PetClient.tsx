import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

/* TS Import */
import {
  URL_PET_USERS,
  URL_PET_USERS_ADOPT,
  URL_PET_USERS_LICENSE,
  URL_PET_USERS_PETS,
} from "../../config/UrlRoute";

/* COMPONENT Import */
import { RootState } from "../../store/reducers";
import { toggleSidebar } from "../../store/actions";
import { connect, ConnectedProps } from "react-redux";
import { joinArrayToString } from "../../utils/array.utils";

import Error from "../../hoc-components/error/Error";
import ClientHeader from "./header/ClientHeader";
import PetAdopt from "./petadopt/PetAdopt";
import MyPet from "./mypets/MyPet";
import PetLicense from "./petlicense/PetLicense";

const mapStateToProps = (state: RootState) => ({
  showSidebar: state.sidebar,
});

const connector = connect(mapStateToProps, {
  toggleSidebar,
});

type Props = ConnectedProps<typeof connector>;

const PetClient: React.FC<Props> = (props) => (
  <Fragment>
    <div className={"p-0 col-md-2"}>
      <ClientHeader />
    </div>
    <div
      className={joinArrayToString([
        "p-0 overflow-hidden px-0",
        props.showSidebar ? "col-md-9" : "col-md-8",
      ])}
    >
      <Switch>
        <Redirect path={URL_PET_USERS} to={URL_PET_USERS_PETS} exact />
        <Route path={URL_PET_USERS_PETS}>
          <MyPet />
        </Route>
        <Route path={URL_PET_USERS_ADOPT}>
          <PetAdopt />
        </Route>
        <Route path={URL_PET_USERS_LICENSE}>
          <PetLicense />
        </Route>
        <Route path="**">
          <Error />
        </Route>
      </Switch>
    </div>
  </Fragment>
);

export default connector(PetClient);
