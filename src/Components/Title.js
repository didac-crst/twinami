import React, {useState} from "react";
import Countdown from "./Countdown";

function Title(props) {

    const [counter, setCounter] = useState(true);

    const counterDisplay = () => {
        if(window.scrollY >= 30) {
            setCounter(false);
        } else {
            setCounter(true);
        }
    }


    window.addEventListener('scroll', counterDisplay);


    return (
        <section id="title">
            {counter  ? (
                <div className="d-flex justify-content-center mt-5">
                    {props.loadCont && ( <Countdown pre = {props.jsonCont.preDays} post = {props.jsonCont.postDays}/> )}
                </div>
            ) : (
                <div className="clockSpaceSubst"/>
            )}
        </section>
      );
  }

  export default Title;