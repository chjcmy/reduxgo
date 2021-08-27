import React from 'react';
import { Col, Row } from 'reactstrap';

import '../assets/custom.scss';

const Footer = () => {
  const thisYear = () => new Date().toDateString();

  return (
    <div id="main-footer" className="text-center m-auto">
      <Row>
        <Col>
          <p>
            today
            {' '}
            <span>{thisYear()}</span>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
