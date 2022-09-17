import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { usePostContext } from '../../services/contexts/PostContext';
import { AddNewPost } from '../../types/post';

interface AddPostModalProps {}

const UpdatePostModal: React.FC<AddPostModalProps> = () => {
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = usePostContext();

  const [updatedPost, setUpdatedPost] = useState(post!);

  useEffect(() => {
    if (post) {
      setUpdatedPost(post);
    }
  }, [post]);

  const { title, description, status, url } = updatedPost;

  const closeModal = () => {
    setUpdatedPost(post!);
    setShowUpdatePostModal(false);
  };

  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedPost((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { success, message } = await updatePost(updatedPost);
    setShowUpdatePostModal(false);
    setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
  };

  return (
    <Modal show={showUpdatePostModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Making progress?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type='text'
              placeholder='Title'
              name='title'
              aria-describedby='title-help'
              required
              onChange={onChangeForm}
              value={title}
            />
            <Form.Text id='title-help' className='my-2' muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Description'
              name='description'
              onChange={onChangeForm}
              value={description}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='text'
              placeholder='Youtube Tutorial URL'
              name='url'
              onChange={onChangeForm}
              value={url}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control as='select' value={status} name='status' onChange={onChangeForm}>
              <option value='TO LEARN'>TO LEARN</option>
              <option value='LEARNING'>LEARNING</option>
              <option value='LEARNED'>LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Cancel
          </Button>
          <Button variant='primary' type='submit'>
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
