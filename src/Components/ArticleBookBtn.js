import React from "react";
import { Button } from 'react-bootstrap';

function ArticleBookBtn(props) {
    
    function preBookArticle(){
        props.setCommentShow(true);
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
                articleID: props.articleId,
                comment: props.commentText
            })
        });
        props.handleClose();
        props.setLoadDB(false);
    }

    return (
        <>
            {props.commentShow ? (
                //<Button variant="primary" onClick={bookArticle}>
                <Button type="submit" variant="primary" onClick={bookArticle}>
                    {props.sendButton}
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