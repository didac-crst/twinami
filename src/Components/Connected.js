import React from "react";
import { Nav, Popover, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUnlink, faLink } from '@fortawesome/free-solid-svg-icons';

function Connected (props){

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">
                {props.authenticated ? (
                    <strong style={{color:'blue'}}>{props.jsonCont.loggedInTitle}</strong>
                ) : (
                    <strong style={{color:'red'}}>{props.jsonCont.loggedOutTitle}</strong>
                )}
            </Popover.Title>
            <Popover.Content>
                {props.authenticated ? (
                    <>{props.jsonCont.loggedInTextPre}<strong>{props.authUser.name}</strong>{props.jsonCont.loggedInTextPost}</>
                ) : (
                    <>{props.jsonCont.loggedOutText}</>
                )}
            </Popover.Content>
        </Popover>
      );

    return(
        <Nav.Link>
            <OverlayTrigger trigger={['hover', 'focus']} placement="bottom-end" overlay={popover}>
                {props.authenticated ? (
                    <FontAwesomeIcon style={{color:'blue'}} icon={faLink} />
                ) : (
                    <FontAwesomeIcon style={{color:'red'}} icon={faUnlink} />
                )}
            </OverlayTrigger>
        </Nav.Link>
    );
}

export default Connected;
