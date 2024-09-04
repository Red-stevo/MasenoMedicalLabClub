import "./IndexPageStyles/IndexPageHeader.css"
import {Button, Container, Image, Nav, Navbar, NavItem} from "react-bootstrap";
import masenoLogo from "./IndexPageAssets/MasenoSchoolLogo.jpeg";
import { ReactTyped } from "react-typed";

const IndexPageHeader = () => {
    return (
        <div className={"index-page-header"}>
            <Navbar expand="lg" className={"index-page-navbar"}>
                <Navbar.Brand href="#">
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
                            <Button>Signin</Button>
                        </NavItem>
                    </Nav>
            </Navbar>
            <div className="custom-shape-divider-top-1725299348">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                     preserveAspectRatio="none">
                    <path
                        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,
                        11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,
                        1055.71,111.31,985.66,92.83Z"
                        className="shape-fill"></path>
                </svg>
            </div>
        </div>
    );
};

export default IndexPageHeader;