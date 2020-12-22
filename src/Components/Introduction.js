import React from "react";

function Introduction(props) {
    return (
        <section id="introduction">
            <h2 className="sectionTitle">{props.loadCont && props.jsonCont.introTitle}</h2>
            <p className="plainText textJustified">{props.loadCont && props.jsonCont.introText}</p>
        </section>
      );
  }

  export default Introduction;