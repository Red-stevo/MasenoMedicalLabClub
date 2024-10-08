import "./../Styles/UserManagement.css";
import {Button, Form, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, registerUsers, selectAll} from "../../../../ReduxStorage/UserManagementStore.js";
import DisplayUpdateState from "./DisplayUpdateState.jsx";
import {FaPlus} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {TbFaceIdError} from "react-icons/tb";
import NewUsersDisplay from "./NewUsersDisplay.jsx";

const UserManagement = () => {
    const users = useSelector(selectAll);
    const loading = useSelector(state => state.userManagementReducer.loading);
    const error = useSelector(state => state.userManagementReducer.error);
    const [newUsers, setNewUsers] = useState([]);
    const dispatch = useDispatch();
    const {register, handleSubmit,
        reset, watch} = useForm();
    const [createUserError, setCreateUserError] = useState(null);
    const registrationComplete = useSelector(state => state.userManagementReducer.registrationComplete);

    useEffect(() => {
        dispatch(getUsers());
    }, []);


    useEffect(() => {
        setTimeout(() => {
            setCreateUserError(null);
        }, 5000)
    }, [createUserError])

    const handleAddUser = (data) => {

        /*Check if the email exist in the saved users.*/
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === data.email) {
                setCreateUserError("User Email Already Exist!");
                return;
            }
        }

        /*Check if the user exist in the new added users.*/
        for (let i = 0; i < newUsers.length; i++) {
            if (newUsers[i].email === data.email) {
                setCreateUserError("User Email Already Exist!");
                return;
            }
        }

        /*add user to the new list state*/
        setNewUsers((prevUsers) => [...prevUsers, {...data}]);

        /*reset the form fields*/
        reset();


    }

    /*refresh the state after a successful user creation.*/
    useEffect(() => {
        if (registrationComplete)
            window.location.reload();
    }, [registrationComplete]);

    const saveUsers = () => {
        const data = watch();
        if(data.email){
            setCreateUserError("Please Add This Last Field.");
            return;
        }

        /*called backend API to save new users.*/
        dispatch(registerUsers(newUsers));
    }

    return (
        <div className={"user-management-page"}>
            <div className={"user-display-title title-user-management"}>
                <div>ID</div>
                <div>Email</div>
                <div>Position</div>
                <div>Role</div>
            </div>
            <div className={"user-field-spacer"}>
                {loading && <Spinner animation={"grow"} className={"loading-component"}/>}
            {(!loading && users.length > 0) &&
                    users.map(({userId, email, position, roles}, index) =>
                        <DisplayUpdateState key={index}
                            userId={userId} position={position} roles={roles} email={email} index={index} />)
            }
                {newUsers.length > 0 && newUsers.map((newUser, index) => (
                    <NewUsersDisplay email={newUser.email} roles={newUser.roles} position={newUser.position}
                                     key={index+"unique"}/>
                ))}
            </div>

            <Button onClick={() => window.location.reload()} className={"cancel-changes-button"}>Cancel</Button>
            <Button onClick={saveUsers} className={"apply-button"}>Apply</Button>
            <div className={"form-error-holder"}>
                <Form className={"user-reg-form"} onSubmit={handleSubmit(handleAddUser)}>

                    <Button type={"submit"} className={"add-user-button"}><FaPlus className={"add-user-form"} /></Button>

                    <input className={"form-control email-input"} placeholder={"Email e.g. jameskago@gmail.com"}
                      type={"email"} required={true} {...register("email")}/>

                    <select className={"form-select position-select"} defaultValue={"6"}
                            {...register("position")}>
                        <option value={0}>Chair Person</option>
                        <option value={1}>Vise Chair Person</option>
                        <option value={2}>Treasure</option>
                        <option value={3}>Vise Treasure</option>
                        <option value={4}>Secretary</option>
                        <option value={5}>Vise Secretary</option>
                        <option value={6}>Member</option>
                    </select>

                    <select className={"form-select role-select"} defaultValue={"USER"} {...register("roles")}>
                        <option value={"USER"}>USER</option>
                        <option value={"ADMIN"}>ADMIN</option>
                    </select>

                </Form>
                {createUserError && <span className={"add-user-error"}>
                    <TbFaceIdError />{createUserError}</span>}
            </div>
        </div>
    );
};

export default UserManagement;