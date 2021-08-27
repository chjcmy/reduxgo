import React, { Fragment } from 'react';
import { Container } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/Footer';
import AppNavbar from '../components/AppNavbar';
import PostCardList from './normalRoute/PostCardList';
import PostWrite from './normalRoute/PostWrite';
import PostDetail from './normalRoute/PostDetail';
import CategoryResult from './normalRoute/CategoryResult';
import Search from './normalRoute/Search';

const MyRouter = () => (
  <>
    <AppNavbar />
    <Header />
    <Container id="main-body">
      <Switch>
        <Route path="/" exact component={PostCardList} />
        <Route path="/posts" component={PostWrite} />
        <Route path="/posts/:id" component={PostDetail} />
        <Route path="/posts/category/:categoryName" component={CategoryResult} />
        <Route path="/search/:searchTerm" component={Search} />
        <Route path="*" to="/" />
      </Switch>
    </Container>
    <Footer />
  </>
);

export default MyRouter;
