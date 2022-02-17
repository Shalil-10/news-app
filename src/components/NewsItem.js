import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';

export default class NewsItem extends Component {



  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props   //-->this.props.title
    return <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{title}
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: 1}}>
              {source}
             
            </span>
          </Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          <Button href={newsUrl} target="_blank" variant="primary" size="sm">
            Read More
          </Button>
          <Card.Footer>
            <small className="text-muted">Last updated by {author || "Unknown"} on {new Date(date).toGMTString()}</small>
          </Card.Footer>


        </Card.Body>
      </Card>
    </div>;
  }
}
