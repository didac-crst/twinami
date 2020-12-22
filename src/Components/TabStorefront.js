import React, {useState, useEffect} from "react";
import Loading from './Loading';
import Title from './Title';
import Introduction from './Introduction';
import PhotoEco from './PhotoEco';
import Features from './Features';
import Articles from './Articles';
import Donation from './Donation';


function AppBody(props) {

  const page = "routeHome";

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

  //FETCHING DB DATA
  const linkDB = props.linkAPI+"db/"+page;
  const [jsonDB, setJsonDB] = useState({});
  const [loadDB, setLoadDB] = useState(false);

  useEffect(() => {
    if (!loadDB){
      fetch(linkDB)
        .then(res => res.json())
        .then(json => {
          setJsonDB(json);
          setLoadDB(true);
        }
      );
    }
  });

  // RELOAD INFO
  useEffect (() => {
    if (props.reloadData){
        setLoadCont(false);
        setLoadDB(false);
        props.setReloadData(false);
    }
  });

  if (!(loadDB && loadCont)){
    return(
      <Loading />
    );
  } else {
    return (
      <div id="TabStorefront">     
        <Title
          jsonCont = {loadCont && jsonCont.title}
          loadCont = {loadCont}
          setLoadCont = {setLoadCont}
          setLoadDB = {setLoadDB}
        />
        <Introduction 
          jsonCont = {loadCont && jsonCont.introduction}
          loadCont = {loadCont}
        />
        <PhotoEco 
          linkAPI = {props.linkAPI}
          jsonCont = {loadCont && jsonCont.photoEco}
          loadCont = {loadCont}
        />
        <Features
          jsonCont = {loadCont && jsonCont.listDescription}
          loadCont = {loadCont}
        />
        <Articles
          linkAPI = {props.linkAPI}
          lang = {props.lang}
          jsonCont = {loadCont && jsonCont.articles}
          loadCont = {loadCont}
          jsonDB = {loadDB && jsonDB.articlesDB}
          loadDB = {loadDB}
        />
        <Donation  
          linkAPI = {props.linkAPI}
          jsonCont = {loadCont && jsonCont.paypal}
          loadCont = {loadCont}
        />
      </div>
    );
  }
}

  export default AppBody;