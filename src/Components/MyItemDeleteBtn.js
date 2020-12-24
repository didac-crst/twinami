import React from "react";
import { Button } from 'react-bootstrap';

function MyItemDeleteBtn(props) {
    
    function deleteItem(){
        const postLink = props.linkAPI+'deleteArticle';
        fetch(postLink, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                articleID: props.articleId
            })
        });
        props.handleClose();
        props.setLoadDB(false);
    }

    return (
        <Button variant="primary" onClick={deleteItem}>
            {props.deleteButton}
        </Button>
      );
  }

  export default MyItemDeleteBtn;