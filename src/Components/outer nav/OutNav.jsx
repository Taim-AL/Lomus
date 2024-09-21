import React from 'react';
import './OutNav.css';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';

function OuterNav() {
    return ( 
        <>
                <div className=' outer-container shadow-lg'>

                
                <Row className='inner-container'>
                    <Col md='6' lg='6' xs='12' className='logo-container'>
                        <SchoolIcon className="icon-outerNav"/>
                        <h3 className='navbar-logo '> LUMOS </h3>
                    </Col>
                    <Col md='2'></Col>
                    <Col md='4' xs='12' className='d-flex justify-content-center align-items-center'>
                        <Link className='rigester-btn' to={"/rigester"}>SingUp</Link>
                        <Link className='rigester-btn' to={"/login"}>Login</Link>
                    </Col>
                </Row>


                </div>
        </>
     );
}

export default OuterNav;