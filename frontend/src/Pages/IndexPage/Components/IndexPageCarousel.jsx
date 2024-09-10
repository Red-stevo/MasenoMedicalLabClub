import {Carousel, Image} from "react-bootstrap";
import "../IndexPageStyles/IndexPageCarousel.css";
import image1 from "../IndexPageAssets/img1.png"
import image2 from "../IndexPageAssets/img2.png"
import image3 from "../IndexPageAssets/img3.png"

const IndexPageCarousel = () => {
    return (
        <Carousel id={"image-holder"}>
            <Carousel.Item interval={2000}>
                <Image src={image1} alt={"Meseno Med Lab Science Index Page Image."} height={500}
                       className={"carousel-image"} />
                <Carousel.Caption className={"caption-text"}>
                    <h3>Image title</h3>
                    <p>Image description</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={3000}>
                <Image src={image2} alt={"Meseno Med Lab Science Index Page Image."} height={500}
                       className={"carousel-image"} />
                <Carousel.Caption>
                    <h3>Image title</h3>
                    <p>Image description</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={3000}>
                <Image src={image3} alt={"Meseno Med Lab Science Index Page Image."} height={500}
                       className={"carousel-image"}/>
                <Carousel.Caption>
                    <h3>Image title</h3>
                    <p>Image description</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default IndexPageCarousel;