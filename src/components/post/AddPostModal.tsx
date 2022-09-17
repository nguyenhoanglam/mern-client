import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { usePostContext } from '../../services/contexts/PostContext';
import { AddNewPost } from '../../types/post';

interface AddPostModalProps {}

const initialNewPost: AddNewPost = {
  title: '',
  description: '',
  url: '',
  status: 'TO LEARN',
};

const AddPostModal: React.FC<AddPostModalProps> = () => {
  const { addPost, showAddPostModal, setShowAddPostModal, setShowToast } = usePostContext();

  const [newPost, setNewPost] = useState(initialNewPost);

  const { title, description, url } = newPost;

  const resetAddPostData = () => {
    setNewPost(initialNewPost);
    setShowAddPostModal(false);
  };

  React.useEffect(() => {
    console.log(showAddPostModal);
  }, [showAddPostModal]);

  const closeModal = () => resetAddPostData();

  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { success, message } = await addPost(newPost);
    resetAddPostData();
    setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
  };

  return (
    <Modal show={showAddPostModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
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

export default AddPostModal;
