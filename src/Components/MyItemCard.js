import React, {useState} from "react";
import { Card, Button, Container, Row, Col, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
import MyItemDeleteBtn from './MyItemDeleteBtn';

function MyItemCard(props) {
    const lang = props.lang;
    const text = props.jsonArticle[lang];

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
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div>
            <Card className="cardDef">
                <Card.Header onClick={handleShow} className="cardHeaderDef">
                    <Card.Title className="titleArticle pb-2">{text.name}</Card.Title>
                    <CardImg  classImg="imgArticle" type={contentType} img={image} />
                </Card.Header>
            </Card>

            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="titleArticle px-4"><a target="_blank" rel="noopener noreferrer" href={props.jsonArticle.link}>{text.name}</a></Modal.Title>
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
                                </ListGroup>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {props.tags.closeButton}
                </Button>
                <MyItemDeleteBtn
                    linkAPI = {props.linkAPI}
                    articleId = {props.jsonArticle._id}
                    deleteButton = {props.tags.deleteButton}
                    handleClose = {handleClose}
                    setLoadDB = {props.setLoadDB}
                />
            </Modal.Footer>
        </Modal>
      </div>
      );
  }

  export default MyItemCard;