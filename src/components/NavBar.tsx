import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../services/contexts/AuthContext';

import learnItLogo from '../assets/logo.svg';
import logoutIcon from '../assets/logout.svg';

const NavBar = () => {
  const {
    authState: { user },
    logoutUser,
  } = useAuthContext();

  const logout = () => {
    logoutUser();
  };

  return (
    <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
      <Navbar.Brand className='fw-bold text-white'>
        <img src={learnItLogo} alt='learnItLogo' width={32} height={32} className='mr-2' />
        Learn It
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link className='fw-bold text-white' to='/dashboard' as={Link}>
            Dashboard
          </Nav.Link>
          <Nav.Link className='fw-bold text-white' to='/about' as={Link}>
            About
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link className='fw-bold text-white' disabled>
            {`Welcome ${user?.username || ''}`}
          </Nav.Link>
          <Button variant='secondary' className='fw-bold text-white' onClick={logout}>
            <img src={logoutIcon} alt='logoutIcon' width={32} height={32} className='mr-2' />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
