import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';

export default class NewsItem extends Component {



  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props   //-->this.props.title
    return <div className='my-3'>
      <Card >


        <div style={{
          display: 'flex',
          position: 'absolute',
          justifyContent: 'flex-end',
          right: '0',

        }}>
          <span className="badge rounded-pill bg-danger">
            {source}

          </span>
        </div>


        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>

          <Card.Title>{title}
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
