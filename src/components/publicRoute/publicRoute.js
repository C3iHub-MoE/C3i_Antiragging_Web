import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children })=> {
    const { user } = useAuth();
    console.log("user", user)
    if(user) {
        return <Navigate to="/" />
    }
    return children;
}
export default PublicRoute;