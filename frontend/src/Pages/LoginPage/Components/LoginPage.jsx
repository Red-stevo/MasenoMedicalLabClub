import "./../LoginPageStyles/LoginPage.css";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
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
                            <Form.Label htmlFor={"email"} className={"text-font"}>Email : </Form.Label>
                            <Form.Control id={"email"} />
                        </Form.Group>

                        <Form.Group className={"password-group"}>
                            <Form.Label htmlFor={"password"} className={"text-font"}>Password : </Form.Label>
                            <Form.Control id={"password"} />
                        </Form.Group>
                    </Form>
                </div>

                <div className={"login-footer"}>
                    <Button className={"login"}>Login</Button>
                    <Link className={"visitor-link"} to={"/"}>
                        <h5 className={"visitor"}>Visitor</h5>
                        <span className={"arrow"}></span>
                        <span className={"arrow"}></span>
                        <span className={"arrow"}></span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;