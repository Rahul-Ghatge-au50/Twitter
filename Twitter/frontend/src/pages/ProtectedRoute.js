import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { Navigate } from "react-router-dom";
import LoadingPage from "./LodingPage";

const ProtectedRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [googleUser, googleLoading] = useAuthState(auth);
    //console.log(googleUser)

    if (loading || googleLoading) {
        return <LoadingPage />
    }

    if (!user || !googleUser) {
        return <Navigate to='/login' />
    } else {
        return children
    }


}

export default ProtectedRoute;