import React, { useCallback, useEffect, useState } from 'react';
import {
  Collapse, Container, Navbar, NavbarToggler, Nav, Form, NavItem, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from './auth/LoginModal';
import { LOGOUT_REQUEST } from '../redux/types';

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onLogout = useCallback(
    () => {
      dispatch({ type: LOGOUT_REQUEST });
    },
    [dispatch]
  );

  useEffect(() => {
    setIsOpen(false);
  }, [user]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addPostLink = () => {

  };

  const authLink = (
    <>
      <NavItem>
        {
        isAuthenticated ? (
          <Form className="col mt-2">
            <Link to="/posts" className="btn btn-success block text-white px-3" onClick={addPostLink}>
              Add Post
            </Link>
          </Form>
        )
          : ''
}
      </NavItem>
      <NavItem>
        <Form className="col">
          <Link onClick={onLogout} to="/#">
            <Button outline color="light" className="mt-2" block>
              Logout
            </Button>
          </Link>
        </Form>
      </NavItem>
    </>
  );

  return (
    <>
      <Navbar color="dark" dark expand="lg" className="sticky-top">
        <Container>
          <Link to="/" className="text-white text-decoration-none">Sung.Blog</Link>
        </Container>
        <NavbarToggler onClick={handleToggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto d-flex justify-content-around" navbar>
            {isAuthenticated
              ? authLink
              : <LoginModal />}
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default AppNavbar;
