import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

import { Post } from '../../types/post';
import ActionsButtons from './ActionsButtons';

interface SinglePostProps {
  post: Post;
}

const SinglePost: React.FC<SinglePostProps> = ({ post: { _id, status, title, description, url } }) => {
  return (
    <Card className='shadow' border={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className='post-title'>{title}</p>
              <Badge pill bg={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}>
                {status}
              </Badge>
            </Col>
            <Col className='text-right'>
              <ActionsButtons id={_id} url={url} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
