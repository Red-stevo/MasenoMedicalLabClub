import "../IndexPageStyles/IndexPageAboutUS.css";
import {Accordion} from "react-bootstrap";
const IndexPageAboutUs = () => {
    return (
        <div id={"aboutUs"}>
            <h2 className={"about-us-title graduate-regular"}>About Us</h2>
            <Accordion defaultActiveKey={['0']} className={"about-us-accordion"}>
                <Accordion.Item eventKey="0" className={"accordion-item-1"}>
                    <Accordion.Header className={"graduate-regular"}>
                        Foundation and Mission of MMLSSA
                    </Accordion.Header>
                    <Accordion.Body className={"accordion-text-font"}>
                        The Maseno Medical Laboratory Science Students' Association (MMLSSA) was established in June
                        2024 by first- and second-year Medical Laboratory Science (MLS) students at Maseno University.
                        Under the leadership of Sam Brian, then chairperson of the Medical Students' Association of
                        Maseno (MEDSAM), MMLSSA was created to foster unity among MLS students and support their
                        academic and professional success. The association focuses on securing sponsorships for key
                        student events and provides financial assistance to students in need, helping them cover tuition
                        and essential expenses
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className={"accordion-item-2"}>
                    <Accordion.Header className={"graduate-regular"} >
                        Building Professional Networks and Mentorship
                    </Accordion.Header>
                    <Accordion.Body className={"accordion-text-font"}>
                        MMLSSA serves as a crucial link between MLS students at Maseno and the larger medical laboratory
                        science community. It connects members with national organizations like the Kenya Medical
                        Laboratory Science Association (KEMELSA) and the Kenya National Union of Medical Laboratory
                        Officers (KNUMLO), as well as international MLS associations, enabling collaboration and
                        knowledge exchange. Through its mentorship initiatives, MMLSSA helps members grow both
                        personally and professionally, offering guidance as they navigate the challenges of medical
                        education and their future careers.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" className={"accordion-item-3"}>
                    <Accordion.Header className={"graduate-regular"}>
                        Advocacy, Development, and Community Engagement
                    </Accordion.Header>
                    <Accordion.Body className={"accordion-text-font"}>
                        Guided by its constitution, MMLSSA advocates for the rights and interests of its members,
                        ensuring their university experience is enriching and fulfilling. The association recognizes
                        excellence by awarding certificates to students with outstanding achievements and partners with
                        other organizations to enhance its members' professional development. MMLSSA also maintains a
                        strong social media presence, promoting the association’s activities and achievements. Members
                        are encouraged to actively participate, contributing to a collective mission that builds a
                        strong foundation for future careers in medical laboratory science.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default IndexPageAboutUs;