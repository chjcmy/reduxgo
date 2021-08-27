import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Row } from 'reactstrap';
import { POST_LOADING_REQUEST } from '../../redux/types';
import { BorderSpinner } from '../../components/spinner/Spinner';
import PostCardOne from '../../components/post/PostCardOne';

const PostCardList = () => {
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: POST_LOADING_REQUEST });
  }, [dispatch]);

  return (
    <>
      <Helmet title="Home" />
      <Row>
        {posts ? <PostCardOne posts={posts} /> : <BorderSpinner />}
      </Row>
    </>
  );
};

export default PostCardList;
