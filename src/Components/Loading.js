import React from "react";
import { Spinner } from 'react-bootstrap';

function Loading() {
    return (
        <section id="loading">
            <Spinner animation="grow" /><br/>
            <h2> Loading...</h2>
        </section>
      );
  }

  export default Loading;