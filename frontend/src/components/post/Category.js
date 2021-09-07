import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Category = ({ posts }) => (
  <div className="d-flex">
    {Array.isArray(posts)
      ? posts.map(({ id, categoryName }) => (
        <div key={id} className="d-flex mx-1 mt-1 my_category">
          <Link
            to={{ pathname: `/post/category/${categoryName}`, state: { id } }}
            className="badge text-decoration-none"
          >
            <span className="ml-1">
              <Button color="info text-white">
                {categoryName}
              </Button>
            </span>
          </Link>
        </div>
      )) : ''}
  </div>

);

export default Category;
