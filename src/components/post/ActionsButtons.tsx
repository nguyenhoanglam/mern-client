import React from 'react';
import Button from 'react-bootstrap/Button';

import playIcon from '../../assets/play-btn.svg';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';
import { usePostContext } from '../../services/contexts/PostContext';

interface ActionsButtonsProps {
  id: string;
  url?: string;
}

const ActionsButtons: React.FC<ActionsButtonsProps> = ({ id, url = '' }) => {
  const { deletePost, findPost, setShowUpdatePostModal } = usePostContext();

  const choosePost = (postId: string) => {
    findPost(postId);
    setShowUpdatePostModal(true);
  };

  return (
    <>
      <Button className='post-button' href={url} target='_blank'>
        <img src={playIcon} alt='play' width={32} height={32} />
      </Button>
      <Button className='post-button'>
        <img src={editIcon} alt='edit' width={24} height={24} onClick={choosePost.bind(this, id)} />
      </Button>
      <Button className='post-button' onClick={deletePost.bind(this, id)}>
        <img src={deleteIcon} alt='delete' width={24} height={24} />
      </Button>
    </>
  );
};

export default ActionsButtons;
