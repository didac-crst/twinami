import React from "react";
import ArticleCard from './ArticleCard';
import { CardColumns } from 'react-bootstrap';


function Articles(props) {
    return (
        <section id="items" className="sectionColoured">
            <CardColumns>
                {(props.loadDB && props.loadCont) && props.jsonDB.map((article, index) => (
                    <ArticleCard
                        key = {index}
                        id = {index}
                        linkAPI = {props.linkAPI}
                        lang = {props.lang}
                        jsonArticle = {props.loadDB && article}
                        loadDB = {props.loadDB}
                        tags = {props.jsonCont.tags}
                        authenticated={props.authenticated}
                        authUser={props.authUser}
                        linkAPI={props.linkAPI}
                        setLoadDB = {props.setLoadDB}
                    />
                ))}
            </CardColumns>
        </section>
      );
  }

  export default Articles;


