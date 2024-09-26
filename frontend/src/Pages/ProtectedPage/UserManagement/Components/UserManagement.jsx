import "./../Styles/UserManagement.css";
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useState} from "react";

const UserManagement = () => {
    const [usersState, setUsersState] = useState([]);
    const [editUserState, setEditUserState] = useState(null);
    const {register, handleSubmit, reset
    } = useForm();

    const handleAddUsers = (data) => {

    }


    return (
        <div className={"user-management-page"}>
            <div className={"user-display-title title-user-management"}>
                <div>ID</div>
                <div>Email</div>
                <div>Position</div>
                <div>Role</div>
            </div>

            <div className={"users-holder"} onDoubleClick={() => {}}>
                <div className={"user-display-title users-view"}>
                    <div>1</div>
                    <div>stephen.muiru22@students.dkut.ac.ke</div>
                    <div>ChairPerson</div>
                    <div>Admin</div>
                </div>

                <Form className={"user-reg-form"}>
                    <span className={"space"}></span>
                    <input className={"form-control email-input"} placeholder={"Email e.g. jameskago@gmail.com"}
                           {...register("email") }/>

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

                    <select className={"form-select role-select"} defaultValue={"USER"}
                            {...register("role")}>
                        <option value={"USER"}>USER</option>
                        <option value={"ADMIN"}>ADMIN</option>
                    </select>

                </Form>
                <Button className={"apply-button"}>Apply</Button>
                <Button onClick={() => window.location.reload()} className={"cancel-changes-button"}>Cancel</Button>
            </div>
        </div>
    );
};

export default UserManagement;