import "./../Styles/UserManagement.css";
import {Form} from "react-bootstrap";

const UserManagement = () => {
    return (
        <div className={"user-management-page"}>
            <div className={"user-display-title title-user-management"}>
                <div>ID</div>
                <div>Email</div>
                <div>Position</div>
                <div>Role</div>
            </div>
            <div className={"users-holder"}>
                <div className={"user-display-title users-view"}>
                    <div>1</div>
                    <div>stephen.muiru22@students.dkut.ac.ke</div>
                    <div>ChairPerson</div>
                    <div>Admin</div>
                </div>

                <Form className={"user-reg-form"}>
                    <span className={"space"}></span>
                    <input className={"form-control email-input"} placeholder={"Email e.g. jameskago@gmail.com"} />

                    <select className={"form-select position-select"} defaultValue={"Member"}>
                        <option value={"Chair Person"}>Chair Person</option>
                        <option value={"Vise Chair Person"}>Vise Chair Person</option>
                        <option value={"Treasure"}>Treasure</option>
                        <option value={"Vise Treasure"}>Vise Treasure</option>
                        <option value={"Secretary"}>Secretary</option>
                        <option value={"Vise Secretary"}>Vise Secretary</option>
                        <option value={"Member"}>Member</option>
                    </select>

                    <select className={"form-select role-select"} defaultValue={"USER"}>
                        <option value={"USER"}>USER</option>
                        <option value={"ADMIN"}>ADMIN</option>
                    </select>

                </Form>

            </div>
        </div>
    );
};

export default UserManagement;