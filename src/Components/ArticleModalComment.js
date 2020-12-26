import React, {useState} from "react";
import { Card, Button, Container, Row, Col, ListGroup, ListGroupItem, Modal, Form } from 'react-bootstrap';
import ArticleBookBtn from './ArticleBookBtn';

function ArticleModalComment(props) {

        // Handle Modals
        const [showComment, setShowComment] = useState(false);
        
        const handleCloseComment = () => {
            setShowComment(false);
        }

        const handleShowComment = () => setShowComment(true);

        const [comment,setComment] = useState("");

        function assignComment(e) {
            console.log(e);
            setComment(e.currentTarget.name.value);
        }

    return (
        <div>
            <Button variant="primary" onClick={handleShowComment}>
                Login
            </Button>
            <Modal
                show={showComment}
                onHide={handleCloseComment}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="titleArticle px-4">
                            <h3>Do you want to share something with us?</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="Comment">
                            <Form.Label>Comment:</Form.Label>
                            <Form.Control type="text" placeholder="Enter comment" />
                        </Form.Group>
                        {/* <Form.Group controlId="ArticleID">
                            <Form.Control type="hidden" value={props.articleId} />
                        </Form.Group>
                        <Form.Group controlId="UserID">
                            <Form.Control type="hidden" value={props.authUser}/>
                        </Form.Group> */}
                        <ArticleBookBtn
                            linkAPI = {props.linkAPI}
                            articleId = {props.articleId}
                            authUser={props.authUser}
                            buyButton = {props.buyButton}
                            setComment = {props.setComment}
                            handleClose = {props.handleClose}
                            setLoadDB = {props.setLoadDB}
                            comment = {comment}
                            assignComment = {assignComment}
                        />
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ArticleModalComment;
