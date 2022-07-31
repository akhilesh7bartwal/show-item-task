import React from "react";

import Card from 'react-bootstrap/Card';

const Comment = ({data})=> {
    return(
        <div className="col-sm-4 my-2">
        <Card style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>ID: {data.id}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Email: {data.email}</Card.Subtitle>
            <Card.Text>
                Comment: {data.body}
            </Card.Text>
            </Card.Body>
        </Card>
        </div>
    )
}
export default Comment;