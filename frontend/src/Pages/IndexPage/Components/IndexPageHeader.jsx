import "../IndexPageStyles/IndexPageHeader.css"
import {Image, Nav, Navbar, NavItem} from "react-bootstrap";
import masenoLogo from "../IndexPageAssets/MasenoSchoolLogo.jpg";
import { ReactTyped } from "react-typed";


const IndexPageHeader = () => {
    return (
        <Navbar className={"index-page-navbar"}>
            <Navbar.Brand href="/">
                <Image src={masenoLogo} alt={"Meseno University Logo"}
                       className={"meseno-logo box-shadow"} height={100} width={100}/>
            </Navbar.Brand>
                <Nav className={"nav-items-index-page"}>
                    <NavItem className={"typed-animation graduate-regular "}>
                        <ReactTyped strings={["Maseno MLSS association"]}
                        typeSpeed={180} backSpeed={40} backDelay={3} loop
                        className={"color-effect"}/>
                    </NavItem>
                    <Nav variant={"tabs"} defaultActiveKey={"/"} className={"nav-sections"}>
                        <NavItem className={"aboutUs"}>
                            <Nav.Link href={"#aboutUs"} id={"about-link"}>About Us</Nav.Link>
                        </NavItem>
                        <NavItem className={"contactUs"}>
                            <Nav.Link  href={"#contactUS"} id={"contact-link"}>Contact Us</Nav.Link>
                        </NavItem>
                        <NavItem className={"home"}>
                            <Nav.Link href={"/"} id={"home-link"}>Visitor</Nav.Link>
                        </NavItem>
                        <NavItem>
                            <Nav.Link className={"signin"} href={"/login"} id={"signin-link"}>Signin</Nav.Link>
                        </NavItem>
                    </Nav>
                </Nav>
        </Navbar>
    );
};

export default IndexPageHeader;