import React, { useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/reducers";
import {
  URL_PET_ADMIN,
  URL_PET_PASSWORD,
  URL_PET_PROFILE,
  URL_PET_STAFF,
  URL_PET_USERS,
} from "../../config/UrlRoute";
import PetAdmin from "../admin/PetAdmin";
import Error from "../../hoc-components/error/Error";
import { joinArrayToString } from "../../utils/array.utils";
import Header from "../nav/header/Header";
import UserProfile from "../admin/userprofile/UserProfile";
import Password from "../admin/password/Password";
import { toggleSidebar } from "../../store/actions";
import PetClient from "../client/PetClient";
import PetStaff from "../staff/PetStaff";

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

const Home: React.FC<Props> = (props) => {
  const history = useHistory();

  useEffect(() => {
    if (props.user.role) {
      const userRole = props.user.role;
      if (userRole === "ROLE_ADMIN") {
        history.push(URL_PET_ADMIN);
      } else if (
        userRole === "ROLE_VETERINARIAN" ||
        userRole === "ROLE_GROOMING"
      ) {
        history.push(URL_PET_STAFF);
      } else {
        history.push(URL_PET_USERS);
      }
    }
  }, [props.user.role]);

  return (
    <div className="d-flex flex-row h-100">
      <div
        className={joinArrayToString([
          "p-0",
          props.showSidebar ? "col-md-1" : "col-md-2",
        ])}
      >
        <Header toggleSidebar={(toggle) => props.toggleSidebar(toggle)} />
      </div>

      <Switch>
        <Redirect from="/home" to={URL_PET_PROFILE} exact />
        <Route path={URL_PET_ADMIN}>
          <PetAdmin />
        </Route>
        <Route path={URL_PET_STAFF}>
          <PetStaff />
        </Route>
        <Route path={URL_PET_USERS}>
          <PetClient />
        </Route>
        <Route path={URL_PET_PROFILE}>
          <UserProfile />
        </Route>
        <Route path={URL_PET_PASSWORD}>
          <Password />
        </Route>
        <Route path="**">
          <Error />
        </Route>
      </Switch>
    </div>
  );
};

export default connector(Home);
