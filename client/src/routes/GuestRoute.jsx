import React from "react";
import {Outlet,Navigate} from "react-router-dom";

import { useAuth } from 'utils/hooks/useAuth';

const GuestRoute = () => {
  const {user} = useAuth();

  if (user) {
    return <Navigate to={"/dashboard"}/>;
  }

  return <Outlet />;
}

export default GuestRoute;
