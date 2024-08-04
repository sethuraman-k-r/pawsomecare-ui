import * as React from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";

/* JS Import */
import { URL_PET_LANDING } from "../../config/UrlRoute";

interface GuardedRouteProps {
  component:
    | React.ComponentClass<any, any>
    | React.FunctionComponent<any>
    | React.ComponentClass<RouteComponentProps<any, any, unknown>, any>
    | undefined;
  path: string;
  isAuthenticated: boolean;
  [props: string]: any;
}

const GuardedRoute = ({
  component,
  path,
  isAuthenticated,
  ...props
}: GuardedRouteProps) =>
  isAuthenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to={URL_PET_LANDING} />
  );

export default GuardedRoute;
