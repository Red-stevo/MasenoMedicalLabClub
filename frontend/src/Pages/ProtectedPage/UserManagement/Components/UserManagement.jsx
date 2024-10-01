import "./../Styles/UserManagement.css";
import {Button, Form, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {checkUserExist, getUsers, selectAll} from "../../../../ReduxStorage/UserManagementStore.js";
import DisplayUpdateState from "./DisplayUpdateState.jsx";
import {FaPlus} from "react-icons/fa";
import {useForm} from "react-hook-form";

const UserManagement = () => {
    const users = useSelector(selectAll);
    const loading = useSelector(state => state.userManagementReducer.loading);
    const error = useSelector(state => state.userManagementReducer.error);
    const userExist = useSelector(state => state.userManagementReducer.exists);
    const [newUsers, setNewUsers] = useState(null);
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [createUserError, setCreateUserError] = useState(null);

    useEffect(() => {
        dispatch(getUsers());
    }, []);


    const handleAddUser = (data) => {

        /*Fetch user by email to check if the email is already register*/
        dispatch(checkUserExist(data.email));

        if (userExist){
            setCreateUserError("User Email Already Exist");
        }else {
            console.log(userExist);
        }

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
                            userId={userId} position={position} role={roles} email={email} index={index} />
                    )
            }
            </div>
            <Button onClick={() => window.location.reload()} className={"cancel-changes-button"}>Cancel</Button>
            <Button className={"apply-button"}>Apply</Button>

            <Form className={"user-reg-form"} onSubmit={handleSubmit(handleAddUser)}>

                <Button type={"submit"} className={"add-user-button"}><FaPlus className={"add-user-form"} /></Button>

                <input className={"form-control email-input"} placeholder={"Email e.g. jameskago@gmail.com"}
                  type={"email"} required={true} {...register("email")}/>

                <select className={"form-select position-select"} defaultValue={"Member"}
                        {...register("position")}>
                    <option value={"Chair Person"}>Chair Person</option>
                    <option value={"Vise Chair Person"}>Vise Chair Person</option>
                    <option value={"Treasure"}>Treasure</option>
                    <option value={"Vise Treasure"}>Vise Treasure</option>
                    <option value={"Secretary"}>Secretary</option>
                    <option value={"Vise Secretary"}>Vise Secretary</option>
                    <option value={"Member"}>Member</option>
                </select>

                <select className={"form-select role-select"} defaultValue={"USER"} {...register("roles")}>
                    <option value={"USER"}>USER</option>
                    <option value={"ADMIN"}>ADMIN</option>
                </select>

            </Form>
        </div>
    );
};

export default UserManagement;