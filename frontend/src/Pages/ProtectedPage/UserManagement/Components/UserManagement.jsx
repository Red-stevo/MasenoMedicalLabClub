import "./../Styles/UserManagement.css";
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, selectAll} from "../../../../ReduxStorage/UserManagementStore.js";
import DisplayUpdateState from "./DisplayUpdateState.jsx";

const UserManagement = () => {
    const users = useSelector(selectAll);
    const loading = useSelector(state => state.userManagementReducer.loading);
    const error = useSelector(state => state.userManagementReducer.error);
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, []);


    useEffect(() => {
        console.log(users.length);
        console.log((!loading && users.length > 0))
    }, [users]);



    return (
        <div className={"user-management-page"}>
            <div className={"user-display-title title-user-management"}>
                <div>ID</div>
                <div>Email</div>
                <div>Position</div>
                <div>Role</div>
            </div>
            <div className={"user-field-spacer"}>
            {(!loading && users.length > 0) ?
                    users.map(({userId, email, position, roles}, index) =>
                        <DisplayUpdateState key={index}
                            userId={userId} position={position} role={roles} email={email} index={index} />
                    )
                    : <div>Loading</div>
            }
            </div>
            <Button className={"apply-button"} onClick={() => setUpdate(true)}>Apply</Button>
            <Button onClick={() => window.location.reload()} className={"cancel-changes-button"}>Cancel</Button>
        </div>
    );
};

export default UserManagement;