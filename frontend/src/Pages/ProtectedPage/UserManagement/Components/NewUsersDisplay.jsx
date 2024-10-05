import {Button, Form, Spinner} from "react-bootstrap";
import {FaTrash} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {useEffect} from "react";


const NewUsersDisplay = ({email, position, roles}) => {
    const {register, reset} = useForm();

    useEffect(() => {
        reset({email, position, roles});
    }, []);

    return (
        <Form className={"user-reg-form"}>
            <input className={"form-control email-input"}
                   placeholder={"Email e.g. jameskago@gmail.com"}
                   {...register("email")}/>
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
    );
};

export default NewUsersDisplay;