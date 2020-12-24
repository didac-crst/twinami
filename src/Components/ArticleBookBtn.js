import React from "react";
import { Button } from 'react-bootstrap';

function ArticleBookBtn(props) {
    
    function preBookArticle(){
        props.setComment(true);
    }

    function bookArticle(){
        const postLink = props.linkAPI+'bookArticle';
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
        <>
            {props.comment ? (
                <Button variant="primary" onClick={bookArticle}>
                    Send booking!
                </Button>
            ):(
                <Button variant="primary" onClick={preBookArticle}>
                    {props.buyButton}
                </Button>
            )}

        </>
      );
  }

  export default ArticleBookBtn;