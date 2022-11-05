import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserInfo } from './app/models/Account';


interface Props {
    userInfo: UserInfo;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export const NavBar = ({userInfo, setUserInfo}: Props) => {

    const navigate = useNavigate();
    
    function logout(){
        window.localStorage.removeItem('tasket_jwt_token');
        setUserInfo({username: '',email: '',token: ''});
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
                            userInfo.username ?
                                <NavDropdown title={userInfo.username} id="collasible-nav-dropdown-user">
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