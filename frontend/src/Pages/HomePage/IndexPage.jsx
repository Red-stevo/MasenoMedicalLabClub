import "./IndexPageStyles/IndexPage.css";
import IndexPageHeader from "./IndexPageHeader.jsx";
import IndexPageCarousel from "./IndexPageCarousel.jsx";
const IndexPage = () => {
    return (
        <div className={"index-page-sections"}>
            <div className={"index-header"}>
                <IndexPageHeader />
            </div>
            <div className={"index-body"} >
                <IndexPageCarousel />
            </div>
        </div>
    )
}

export default IndexPage;