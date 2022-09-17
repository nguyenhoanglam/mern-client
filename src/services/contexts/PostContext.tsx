import React, { useState, createContext, useCallback, useContext, useReducer } from 'react';
import axios from 'axios';
import { apiUrl } from '../../config/constants';
import { postReducer, PostState } from '../reducers/postReducer';
import { AddNewPost, Post, Toast } from '../../types/post';

type PostContextType = {
  postState: PostState;
  getPosts: () => Promise<any>;
  addPost: (newPost: AddNewPost) => Promise<any>;
  deletePost: (id: string) => Promise<any>;
  updatePost: (updatedPost: Post) => Promise<any>;
  findPost: (id: string) => void;
  showAddPostModal: boolean;
  setShowAddPostModal: (show: boolean) => void;
  showUpdatePostModal: boolean;
  setShowUpdatePostModal: (show: boolean) => void;
  showToast: Toast;
  setShowToast: (toast: Toast) => void;
};

const PostContext = createContext<PostContextType>({} as PostContextType);

const initialPosts: PostState = {
  loading: true,
  post: null,
  posts: [],
};

const inititalToast: Toast = {
  show: false,
  message: '',
  type: undefined,
};

interface PostProviderProps {
  children: React.ReactNode;
}

const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, initialPosts);

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast, setShowToast] = useState(inititalToast);

  // Get all posts
  const getPosts = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({
          type: 'POSTS_LOADED_SUCCESS',
          payload: response.data.posts,
        });
      }
    } catch (error: any) {
      dispatch({ type: 'POSTS_LOADED_FAIL' });
    }
  }, []);

  // Add post
  const addPost = async (newPost: AddNewPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      if (response.data.success) {
        dispatch({
          type: 'ADD_POST',
          payload: response.data.post,
        });
      }

      return response.data;
    } catch (error: any) {
      return error?.response?.data ?? { success: false, message: 'Internal server error' };
    }
  };

  // Delete post
  const deletePost = async (postId: string) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (response.data.success) {
        dispatch({
          type: 'DELETE_POST',
          payload: postId,
        });
      }
    } catch (error: any) {
      return error?.response?.data ?? { success: false, message: 'Internal server error' };
    }
  };

  // Find post by id
  const findPost = (postId: string) => {
    const post = postState.posts.find((post: Post) => post._id === postId);
    dispatch({
      type: 'FIND_POST',
      payload: post,
    });
  };

  // Update post
  const updatePost = async (updatedPost: Post) => {
    try {
      const response = await axios.put(`${apiUrl}/posts/${updatedPost._id}`, updatedPost);
      if (response.data.success) {
        dispatch({
          type: 'UPDATE_POST',
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (error: any) {
      return error?.response?.data ?? { success: false, message: 'Internal server error' };
    }
  };

  return (
    <PostContext.Provider
      value={{
        postState,
        getPosts,
        addPost,
        deletePost,
        updatePost,
        findPost,
        showAddPostModal,
        setShowAddPostModal,
        showUpdatePostModal,
        setShowUpdatePostModal,
        showToast,
        setShowToast,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);

export default PostProvider;
