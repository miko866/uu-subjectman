import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import { useAuth } from "../utils/hooks/useAuth";
import {ROLES} from "../utils/constants";

const ProtectedRoute = () => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        // user is not authenticated
        return <Navigate to="/" />;
    }

    if (user?.role?.name === ROLES.waiting && location.pathname !== '/dashboard') {
      // user is not allowed to show content
      return <Navigate to="/dashboard" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
