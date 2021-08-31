import React from 'react';
import {
  Button,
  Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Row
} from 'reactstrap';
import { Link } from 'react-router-dom';

const PicPick = (contentPic) => {
  switch (contentPic) {
    case 1:
      return 'golang';
    case 2:
      return 'js';
    case 3:
      return 'db';
    case 4:
      return 'server';
    case 5:
      return 'life';
    default:
      return null;
  }
};

// eslint-disable-next-line react/prop-types
const PostCardOne = ({ posts }) => {
  console.log(posts);

  return (
    <>
      {
      // eslint-disable-next-line react/prop-types
      Array.isArray(posts) ? posts.map(({
        id, title, category_id, created_at, updated_at, Category
      }) => (
        <div key={id} className="col-md-4">
          <Link to={`/post/${id}`} className="text-dark text-decoration-none">
            <Card>
              <CardImg top className={PicPick(category_id)} />
              <CardBody>
                <CardTitle className="text-truncate d-flex justify-content-between">
                  <span className="text-truncate">{title}</span>
                </CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{Category.categoryName}</CardSubtitle>
                <CardText>
                  make:
                  {' '}
                  {created_at}
                </CardText>
                <CardText>
                  update:
                  {' '}
                  {updated_at}
                </CardText>
                <Row>
                  <Button color="primary" className="p-2 btn-block">
                    More
                  </Button>
                </Row>
              </CardBody>
            </Card>
          </Link>
        </div>
      )) : null
    }
    </>
  );
};

export default PostCardOne;
