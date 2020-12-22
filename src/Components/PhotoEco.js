import React from "react";
import { Carousel } from 'react-bootstrap';

function PhotoEco(props) {
    return (
        <section id="photoEco" className="sectionColoured">
            <h2 className="sectionTitle pb-3">{props.loadCont && props.jsonCont.ecoTitle}</h2>
            <Carousel>
                {props.loadCont && props.jsonCont.weeks.map((week, index) => (
                    <Carousel.Item
                        key={index}
                    >
                        <img
                            // className="d-block w-100"
                            className="ecoImage"
                            src={props.linkAPI+week.fileName}
                            alt={week.timeStamp}
                        />
                        <Carousel.Caption>
                            <h3 className="carouselNote">{week.timeStamp}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </section>
        );
  }

  export default PhotoEco;