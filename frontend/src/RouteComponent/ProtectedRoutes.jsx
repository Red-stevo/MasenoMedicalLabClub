import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const ProtectedRoutes = ({children}) => {
    const isAuthenticated = useSelector(state => state.loginReducer.isAuthenticated);

    if(!isAuthenticated) return <Navigate to={"/login"} />

    return children;
};
export default ProtectedRoutes;