import React from "react";
import { Button } from 'react-bootstrap';

function Donation(props) {
    return (
        <section id="donation">
            <h2 className="sectionTitle">{props.loadCont && props.jsonCont.poolTitle}</h2>
            <p className="plainText textCentered">{props.loadCont && props.jsonCont.poolContent}</p>
            
            <div className="d-flex justify-content-center pb-4">
                <a target="_blank" rel="noopener noreferrer" href="https://paypal.me/pools/c/8tXmfiKTQP">
                    <Button className="buttonPaypal" variant="outline-primary" size="lg" block>
                        {props.loadCont && (<img className="imagePaypal" id="paypal" alt="Paypal" src={props.linkAPI+props.jsonCont.button} />)}
                    </Button>
                </a>
            </div>
            <h2 className="thanksMsg pt-4">{props.loadCont && props.jsonCont.thanksMsg}</h2>
            <div className="finalMargin"></div>
        </section>
      );
  }

  export default Donation;