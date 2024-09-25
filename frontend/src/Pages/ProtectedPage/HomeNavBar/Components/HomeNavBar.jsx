import "../Styles/HomeNavBar.css"
import {Container, Nav, Navbar} from "react-bootstrap";
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
const HomeNavBar = () => {
    const role = useSelector(state => state.loginReducer.userRole);


    return (
        <div className={"home-nav-bar"}>
            <Navbar expand="md" className="home-bar">
                <Navbar.Brand className={"home-title"} href="#">MMLSA</Navbar.Brand>
                <Navbar.Toggle className={"responsive-toggle"} aria-controls={"basic-navbar-nav"} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav variant="underline" defaultActiveKey="/home/events" className={"nav-items"}>
                        <Nav.Item>
                            <Nav.Link href={"/home/events"}>Events</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href={"#"}>Messaging</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href={"#"}>Constitution</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href={"#"}>Profile</Nav.Link>
                        </Nav.Item>
                        {role === "ADMIN" &&
                        <Nav.Item>
                            <Nav.Link href={"/home/admin/user-management"}>Members</Nav.Link>
                        </Nav.Item>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container className={"home-outlet"}> <Outlet /></Container>
        </div>
    );
};

export default HomeNavBar;