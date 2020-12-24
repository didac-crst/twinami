import React, {useState, useEffect} from "react";
import Countdown from "./Countdown";

function Title(props) {

    const page = "title";

    //FETCHING CONTENT DATA
    const linkContent = props.linkAPI+"content/"+page+":"+props.lang;
    const [jsonCont, setJsonCont] = useState({});
    const [loadCont, setLoadCont] = useState(false);

    useEffect(() => {
        if (!loadCont){
        fetch(linkContent)
            .then(res => res.json())
            .then(json => {
            setJsonCont(json);
            setLoadCont(true);
            }
        );
        }
    });

    // RELOAD INFO
    useEffect (() => {
        if (props.reloadTitle){
            setLoadCont(false);
            props.setReloadTitle(false);
        }
    });


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
                    {loadCont && ( <Countdown pre = {jsonCont.preDays} post = {jsonCont.postDays}/> )}
                </div>
            ) : (
                <div className="clockSpaceSubst"/>
            )}
        </section>
      );
  }

  export default Title;