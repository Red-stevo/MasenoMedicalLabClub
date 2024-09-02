import "./IndexPageStyles/IndexPageHeader.css"
import {Container, Image, Navbar, NavItem} from "react-bootstrap";
import masenoLogo from "./IndexPageAssets/MasenoSchoolLogo.jpeg";
import { ReactTyped } from "react-typed";

const IndexPageHeader = () => {
    return (
        <div>
            <Container className={"index-header-navbar"}>
                <Navbar expand="lg" className="bg-body-tertiary">
                <Navbar.Brand href="#">

                </Navbar.Brand>
                    <NavItem className={"login"}>
                        <ReactTyped strings={["Maseno Medical Laboratory Science Students' Association"]}
                        typespeed={60}
                        backspeed={60}
                        loop/>
                    </NavItem>
                    <NavItem className={"image-logo"}>
                        <Image src={masenoLogo} alt={"Meseno University Logo"}
                               className={"meseno-logo box-shadow"} height={150} width={150}/>
                    </NavItem>
                </Navbar>
            </Container>

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