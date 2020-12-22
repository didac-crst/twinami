import React from "react";
import FeatureItem from './FeatureItem';

function Features(props) {
    return (
        <section id="features">
            <h2 className="sectionTitle">{props.jsonCont.listTitle}</h2>
            <p className="plainText textJustified">{props.jsonCont.listContent}</p>
            <div className="row">
                {props.loadCont && props.jsonCont.listFeatures.map((feature, index) => (
                    <FeatureItem 
                        key = {index}
                        title = {feature.title}
                        content = {feature.content}
                        icon = {feature.iconType}
                    />
                ))}
            </div>
        </section>
      );
  }

  export default Features;


