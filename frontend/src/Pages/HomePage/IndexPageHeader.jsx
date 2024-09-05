import "./IndexPageStyles/IndexPageHeader.css"
import {Image, Nav, Navbar, NavItem, NavLink} from "react-bootstrap";
import masenoLogo from "./IndexPageAssets/MasenoSchoolLogo.jpg";
import { ReactTyped } from "react-typed";


const IndexPageHeader = () => {
    return (
        <Navbar expand="lg" className={"index-page-navbar"}>
            <Navbar.Brand href="/">
                <Image src={masenoLogo} alt={"Meseno University Logo"}
                       className={"meseno-logo box-shadow"} height={100} width={100}/>
            </Navbar.Brand>
                <Nav className={"nav-items-index-page"}>
                    <NavItem className={"typed-animation graduate-regular"}>
                        <ReactTyped strings={["Maseno Medical Laboratory Science Students' Association"]}
                        typeSpeed={180} backSpeed={40} backDelay={3} loop
                        className={"color-effect"}/>
                    </NavItem>
                    <NavItem>
                        <NavLink href={"#"} id={"signin-link"}>Signin</NavLink>
                    </NavItem>
                </Nav>
        </Navbar>
    );
};

export default IndexPageHeader;