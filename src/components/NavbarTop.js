import React, { Component } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class NavbarTop extends Component {
    render() {
        return <div>
            <Navbar bg="dark" variant="dark" expand="lg" fixed='top'>
                <Container>
                    <Link className='nav-link' to="/"><Navbar.Brand>News App</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <Nav><Link className='nav-link' to="/">Home</Link></Nav>
                            <Nav><Link className='nav-link' to="/business">business</Link></Nav>
                            <Nav><Link className='nav-link' to="/entertainment">entertainment</Link></Nav>
                            <Nav><Link className='nav-link' to="/general">general</Link></Nav>
                            <Nav><Link className='nav-link' to="/health">health</Link></Nav>
                            <Nav><Link className='nav-link' to="/science">science</Link></Nav>
                            <Nav><Link className='nav-link' to="/sports">sports</Link></Nav>
                            <Nav><Link className='nav-link' to="/technology">technology</Link></Nav>


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>;
    }
}
