import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ component: RouteComponent, ...rest }) {
  const authObject = useSelector((state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }));

  // const approvedUser = approved === true && isAuthenticated ? true : false
  const approvedUser = () => {
    if ((authObject.auth.isLoaded) && !authObject.auth.isEmpty ) {
      // let approved =
      //   authObject.profile.token.claims.moderator === undefined
      //     ? false
      //     : authObject.profile.token.claims.moderator;
      // if (!approved) {
      //   return false;
      // }

      return true;
    } else {
      return false;
    }
  };

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        approvedUser() ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
}
