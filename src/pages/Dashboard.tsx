import { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import SinglePost from '../components/post/SinglePost';
import AddPostModal from '../components/post/AddPostModal';
import UpdatePostModal from '../components/post/UpdatePostModal';
import addIcon from '../assets/plus-circle-fill.svg';

import { useAuthContext } from '../services/contexts/AuthContext';
import { usePostContext } from '../services/contexts/PostContext';

const Dashboard = () => {
  const {
    authState: { user },
  } = useAuthContext();

  const {
    postState: { loading, posts, post },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = usePostContext();

  // Get all posts on startup
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const showAddPostModal = () => {
    setShowAddPostModal(true);
  };

  const closeToast = () =>
    setShowToast({
      show: false,
      message: '',
    });

  let body = null;

  if (loading) {
    body = (
      <div className='spinner-container'>
        <Spinner animation='border' variant='info' />
      </div>
    );
  } else if (!posts.length) {
    body = (
      <>
        <Card className='text-center mx-5 my-5'>
          <Card.Header as='h1'>Hi {user?.username || ''}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>Click the button below to track your first skill to learn</Card.Text>
            <Button variant='primary' onClick={showAddPostModal}>
              LearnIt!
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
          {posts.map((post) => (
            <Col key={post._id} className='my-2'>
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        <OverlayTrigger placement='left' overlay={<Tooltip>Add a new thing to learn</Tooltip>}>
          <Button variant='primary' className='btn-floating' onClick={showAddPostModal}>
            <img src={addIcon} alt='add-post' width='60' height='60' />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      {post && <UpdatePostModal />}
      <Toast
        show={show}
        style={{ position: 'fixed', top: '20%', right: '10px' }}
        className={`bg-${type} text-white p-2`}
        onClose={closeToast}
        delay={3000}
        autohide
      >
        <strong>{message}</strong>
      </Toast>
    </>
  );
};

export default Dashboard;
