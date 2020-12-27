import React, {useState} from "react";
import { Card, Button, Container, Row, Col, ListGroup, ListGroupItem, Modal, Form } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import ArticleBookBtn from './ArticleBookBtn';

function ArticleCard(props) {
    const lang = props.lang;
    const text = props.jsonArticle[lang];

    //Handle Login
    const _handleSignInClick = () => {
        // Authenticate using via passport api in the backend
        // Open Twitter login page
        // Upon successful login, a cookie session will be stored in the client
        window.open(props.linkAPI+"auth/google", "_self");
      };

    // THE DATA FROM THE DATABASE RETURNS AN ARRAY WHICH NEEDS TO BE CONVERTED TO A SINGLE ARRAY
    const image = btoa(
        new Uint8Array(props.jsonArticle.image.data.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    const contentType = props.jsonArticle.image.contentType;

    // SIMPLIFY THE CARD.IMG OBJECT
    const CardImg = ({ classImg, type, img }) => <Card.Img className={classImg} variant="top" src={`data:${type};base64,${img}`} />

    // Handle Modals
    const [show, setShow] = useState(false);
    const [commentShow, setCommentShow] = useState(false);
    const [commentText, setCommentText] = useState("");
    
    const handleClose = () => {
        setShow(false);
        setCommentShow(false);
    }
    const handleShow = () => setShow(true);

    function handleChangeComment(event){
        const commentValue = event.target.value
        setCommentText(commentValue);
    }
    


    return (
        <div>
            <Card className={props.jsonArticle.booked ? "cardDef cardDefBooked" : "cardDef"}>
                <Card.Header onClick={handleShow} className="cardHeaderDef">
                    <Card.Title className="titleArticle pb-2">{text.name}</Card.Title>
                    <div className="absoluteHolder">
                        <CardImg  classImg="imgArticle" type={contentType} img={image} />
                        {props.jsonArticle.booked && (
                            <h3 className="itemBooked">{props.tags.booked}</h3>
                        )}
                    </div>
                </Card.Header>
            </Card>

            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className={props.jsonArticle.booked ? "modalBooked" : ""}>
                    <Modal.Header closeButton>
                        <Modal.Title className="titleArticle px-4">
                            <a target="_blank" rel="noopener noreferrer" href={props.jsonArticle.link}>{text.name}</a>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row  className="px-0">
                                <Col md={12} lg={5} className="px-4">
                                    <CardImg classImg="imgArticleModal" type={contentType} img={image} />
                                </Col>
                                <Col md={12} lg={7} className="px-4">
                                    <Card.Text className="descrArticle textJustified">
                                        {text.description}
                                    </Card.Text>
                                    <ListGroup className="list-group-flush px-0">
                                        <ListGroupItem className="listArticle textLeft">{props.tags.price}{props.jsonArticle.price}€</ListGroupItem>
                                        <ListGroupItem className="listArticle textLeft">{props.tags.quantity}{props.jsonArticle.quantity}</ListGroupItem>
                                        <ListGroupItem className="listArticle textLeft">{props.jsonArticle.buyNew ? props.tags.new : props.tags.used}</ListGroupItem>
                                        {commentShow && (
                                            <Form className="py-4">
                                                <TextField
                                                    id="comment"
                                                    label={props.tags.commentTitle}
                                                    helperText={props.tags.commentText}
                                                    variant="outlined"
                                                    fullWidth
                                                    autoComplete="off"
                                                    onChange={handleChangeComment}
                                                />
                                            </Form>
                                        )}
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer className="absoluteHolder">
                        {props.jsonArticle.booked && (
                            <h3 className="itemBookedModal">{props.tags.booked}</h3>
                        )}
                        <Button variant="secondary" onClick={handleClose}>
                            {props.tags.closeButton}
                        </Button>
                        {!(props.jsonArticle.booked) && (
                            props.authenticated ? (
                                <ArticleBookBtn
                                    linkAPI = {props.linkAPI}
                                    articleId = {props.jsonArticle._id}
                                    authUser={props.authUser}
                                    buyButton = {props.tags.buyButton}
                                    sendButton = {props.tags.sendButton}
                                    commentShow = {commentShow}
                                    setCommentShow = {setCommentShow}
                                    commentText = {commentText}
                                    handleClose = {handleClose}
                                    setLoadDB = {props.setLoadDB}
                                />
                            ) : (
                                <Button variant="primary" onClick={_handleSignInClick}>
                                    {props.tags.login}
                                </Button>
                            )
                        )}
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
      );
  }

  export default ArticleCard;