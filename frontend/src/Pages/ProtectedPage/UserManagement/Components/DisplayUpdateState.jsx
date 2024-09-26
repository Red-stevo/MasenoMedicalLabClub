import {Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";


const DisplayUpdateState = ({index, email, position, role, userId}) => {
    const {register, handleSubmit,
        reset} = useForm();
    const [editUserState, setEditUserState] = useState(false);

    const handleUpdateUser = (data) => {
        console.log("submit called.")

    }

    useEffect(() => {
        if (editUserState)
            reset({email, role, position})

    }, [editUserState, reset])

    return (
        <div className={"users-holder"} key={userId}>
            {!editUserState ?
                <div className={"user-display-title users-view"}
                     onDoubleClick={() => {
                         setEditUserState(true)
                     }}>
                    <div>{(index + 1)}</div>
                    <div>{email}</div>
                    <div>{position}</div>
                    <div>{role}</div>
                </div> :

                <Form className={"user-reg-form"}
                      onDoubleClick={() => setEditUserState(false)}>
                    <span className={"space"}></span>
                    <input className={"form-control email-input"}
                           placeholder={"Email e.g. jameskago@gmail.com"}
                           {...register("email")}/>

                    <select className={"form-select position-select"} defaultValue={"Secretary"}
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

                </Form>}
        </div>
    );
};

export default DisplayUpdateState;