import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const AdminRouteProtection = ({children}) => {
    const navigate = useNavigate();
    const {userRole} = useSelector((state) => state.loginReducer.userRole);

    if (userRole !== "ADMIN")
        navigate("/");

    return children;
};

export default AdminRouteProtection;