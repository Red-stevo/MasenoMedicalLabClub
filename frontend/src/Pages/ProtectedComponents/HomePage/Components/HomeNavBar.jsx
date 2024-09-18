import "../Styles/HomeNavBar.css"
import {Nav, Navbar} from "react-bootstrap";
import {useSelector} from "react-redux";
const HomeNavBar = () => {
    const role = useSelector(state => state.loginReducer.userRole);


    return (
        <div className={"home-nav-bar"}>
            <Navbar expand="md" className="home-bar">
                <Navbar.Brand className={"home-title"} href="#">MMLSA</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav variant="underline" defaultActiveKey="#" className={"nav-items"}>
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
                            <Nav.Link href={"#"}>Members</Nav.Link>
                        </Nav.Item>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default HomeNavBar;