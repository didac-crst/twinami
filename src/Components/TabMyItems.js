import React, {useState, useEffect} from "react";
import Loading from './Loading';
import MyItemCard from './MyItemCard';
import { CardColumns } from 'react-bootstrap';

function TabMyItems(props) {

    const page = "myItems";

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
    const getItems = props.linkAPI+page;
    const [jsonDB, setJsonDB] = useState({});
    const [loadDB, setLoadDB] = useState(false);

    useEffect(() => {
        if (!loadDB){
        fetch(getItems)
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
      if (props.reloadItems){
          setLoadCont(false);
          //setLoadDB(false);
          props.setReloadItems(false);
      }
    });

    if (!(loadDB && loadCont)){
        return(
          <Loading />
        );
      } else {
        return (
            <>  
                <section id="introduction">
                    <h2 className="sectionTitle mb-4">{jsonCont.title}</h2>
                    {(jsonDB.length === 0) ? (
                      <h4 className="mt-4 pt-4" style={{color:'grey'}}><em>{jsonCont.empty}</em></h4>
                    ):(
                      <CardColumns className="mt-4 pt-4">
                          {jsonDB.map((article, index) => (
                              <MyItemCard
                                  key = {index}
                                  id = {index}
                                  linkAPI = {props.linkAPI}
                                  lang = {props.lang}
                                  jsonArticle = {loadDB && article}
                                  loadDB = {loadDB}
                                  tags = {loadCont &&  jsonCont.tags}
                                  setLoadDB = {setLoadDB}
                              />
                          ))}
                      </CardColumns>
                    )}
                </section>
            </>
      );
    }
  }

  export default TabMyItems;