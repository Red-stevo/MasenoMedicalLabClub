import {Alert, Button, Form, Spinner} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {update, updateUser} from "../../../../ReduxStorage/UserManagementStore.js";
import {FaTrash} from "react-icons/fa";


const DisplayUpdateState = ({index, email, position, role, userId}) => {
    const {register, handleSubmit,
        reset} = useForm();
    const [editUserState, setEditUserState] = useState(false);
    const dispatch = useDispatch();
    const updateMessage = useSelector(state => state.userManagementReducer.updateMessage);
    const isLoading = useSelector(state => state.userManagementReducer.updateLoading);
    const updateError = useSelector(state => state.userManagementReducer.updateError);
    const [stateId, setStateId] = useState(null);


    useEffect(() => {
            reset({email, role, position});
    }, [editUserState, reset]);

    useEffect(() => {

        if(updateMessage && stateId) {
            /*Set the update mode to view mode.*/
            setEditUserState(false);

            setStateId(null);
        }

        if(updateError){
            setTimeout(() => {
                //clear the update error message.
            }, 6000);
        }

    }, [updateMessage, updateError]);


    const handleStateUpdate = (data) => {
        /*set the start id.*/
        setStateId(userId);
        /*Make the backend call to update the user.*/
        dispatch(updateUser({userId,...data}));

    }


    return (
        <div className={"users-holder"} key={userId}>
            {!editUserState ?
                <div className={"user-display-title users-view"}
                     onDoubleClick={() => {
                         setEditUserState(true)
                     }}>
                    <div>{(index + 1)}</div>
                    <div>{email}</div>
                    <div>{position === "0" ? "Chair Person": position === "1" ? "Vise Chair Person":
                    position === "2" ? "Treasure" : position === "3" ? "Vise Treasure" :  position === "4" ? "Secretary":
                    position === "5" ? "Vise Secretary" : position === "6" ? "Member":position}</div>
                    <div>{role}</div>
                </div> :
                <div className={"form-error-holder"}>
                    <Form className={"user-reg-form"}
                          onDoubleClick={() => setEditUserState(false)}>
                        {!isLoading ? <Button onClick={handleSubmit(handleStateUpdate)}
                                className={"space user-update-button"}>Update</Button> :
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"
                            className={"update-loading"}/>}
                        <input className={"form-control email-input"}
                               placeholder={"Email e.g. jameskago@gmail.com"}
                               {...register("email")}/>

                        <select className={"form-select position-select"} defaultValue={"6"}
                                {...register("position")}>
                            <option value={"0"}>Chair Person</option>
                            <option value={"1"}>Vise Chair Person</option>
                            <option value={"2"}>Treasure</option>
                            <option value={"3"}>Vise Treasure</option>
                            <option value={"4"}>Secretary</option>
                            <option value={"5"}>Vise Secretary</option>
                            <option value={"6"}>Member</option>
                        </select>

                        <select className={"form-select role-select"} defaultValue={"USER"} {...register("roles")}>
                            <option value={"USER"}>USER</option>
                            <option value={"ADMIN"}>ADMIN</option>
                        </select>

                        <FaTrash/>
                    </Form>
                    {updateError && <Alert className={"alert-danger"}>{updateError}</Alert>}
                </div>
            }
        </div>
    );
};

export default DisplayUpdateState;