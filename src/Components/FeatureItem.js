import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressArrowsAlt, faLeaf, faYinYang } from '@fortawesome/free-solid-svg-icons';

function FeatureItem(props) {
    return (
        <div className="feature-box col-lg-4">
            {props.icon === "faCompressArrowsAlt" && ( <FontAwesomeIcon className="icon" icon={faCompressArrowsAlt} size="6x" /> )}
            {props.icon === "faLeaf" && ( <FontAwesomeIcon className="icon" icon={faLeaf} size="6x" /> )}
            {props.icon === "faYinYang" && ( <FontAwesomeIcon className="icon" icon={faYinYang} size="6x" /> )}
            <h2 className="featureTitle">{props.title}</h2>
            <p className="plainText textCentered">{props.content}</p>
        </div>
      );
  }

  export default FeatureItem;