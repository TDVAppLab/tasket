import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthUserContext } from './app/store/AuthUserContext';



export const NavBar = () => {

    const authUser = useAuthUserContext();    
    const navigate = useNavigate();
    
    function logout(){
        window.localStorage.removeItem('tasket_jwt_token');
        authUser.signout();
        navigate(`/`);
    }

    return(
        <Navbar bg="dark" variant="dark" expand="sm" className="border-bottom box-shadow mb-3">
            <Container>
                <Navbar.Brand>Tasket</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link >Tasks</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link >PrivacyPolicy</Nav.Link>                        
                        {
                            authUser.user?.username ?
                                <NavDropdown title={authUser.user.username} id="collasible-nav-dropdown-user">
                                    <NavDropdown.Item >register</NavDropdown.Item>  
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logout} >Logout</NavDropdown.Item>
                                </NavDropdown>       
                                :
                                <Nav.Link>Login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}