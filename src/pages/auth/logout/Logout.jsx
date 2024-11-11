import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

const Logout = () => {
    const { LogOutUser } = useAuth()

    useEffect(() => {
        LogOutUser();
        
    }, [LogOutUser])
    console.log("Logged Out Successful")

    return <Navigate to="/login" />
}

export default Logout;