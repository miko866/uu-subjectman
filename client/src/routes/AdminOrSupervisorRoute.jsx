import React from "react";
import {Outlet,Navigate} from "react-router-dom";

import { useAuth } from 'utils/hooks/useAuth';

const AdminOrSupervisorRoute = () => {
    const {isAdmin, isSupervisor} = useAuth();

    if (!isAdmin && !isSupervisor) {
        return <Navigate to={"/dashboard"}/>;
    }

    return <Outlet />;
}

export default AdminOrSupervisorRoute;
