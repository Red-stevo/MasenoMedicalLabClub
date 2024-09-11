import "./../LoginPageStyles/LoginPage.css";
import {Form, FormGroup} from "react-bootstrap";
const LoginPage = () => {
    return (
        <div className={"login-page"}>
            <div className={"login-section"}>
                <div className={"login-header"}>
                    MMLSA Login
                </div>

                <div className={"login-body"}>
                    <Form className={"login-form"}>
                        <Form.Group className={"email-group"}>
                            <Form.Label>Email : </Form.Label>
                            <Form.Control />
                        </Form.Group>

                        <Form.Group className={"password-group"}>
                            <Form.Label>Password : </Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Form>
                </div>

                <div className={"login-footer"}>
                    Footer.
                </div>

            </div>
        </div>
    );
};

export default LoginPage;