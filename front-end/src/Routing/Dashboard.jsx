import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Signup from '../Components/signup';
import Login from '../Components/login';
import Profile from '../Components/login-profile';
import Client from '../Components/cdashboard';
import Provider from '../Components/pdashboard';
import Home from '../Components/home';
import About from '../Components/about';
import Team from '../Components/team';
import Contact from '../Components/contact';
import Footer from '../Components/footer';
import Service from '../Components/provider-profile';
import PostReq from '../Components/post-req';
import SearchCl from '../Components/searchclient';
import Admin from '../Components/admin';
import AllClients from '../Components/allclients';
import AlertLink from 'react-bootstrap';
import "../index.css"
import Search from '../Components/search';
import { Container} from 'react-bootstrap';
import AdminDash from '../Components/adashboard';
import AllProviders from '../Components/allproviders';

const NavbarComponent = () =>{
  const navbarStyle = {
    backgroundColor: '#008080',
    transition: 'background-color 0.3s ease',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };
  return(
    <Navbar expand="lg" style={navbarStyle} variant="dark">
          <Container>
            <Navbar.Brand href="/" style={{fontFamily:'Gagalin, cursive', fontWeight:'bold'}}>Groom You</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/about'>About Us</Nav.Link>
              <Nav.Link href='/contact'>Contact Us</Nav.Link>
              <Nav.Link href='/team'>Our Team</Nav.Link>
            </Nav>
            <div className='button-container ms-auto'>
              <Nav.Link href="/signup">
                <button name='Signup' className='button' type='button'>
                  Sign Up
                </button>
              </Nav.Link>
              <div style={{ marginLeft: '10px' }}></div>
              <Nav.Link href="/login">
                <button name='Login' className='button' type='button'>
                  Login
                </button>
              </Nav.Link>
            </div>
          </Navbar.Collapse>
          </Container>
        </Navbar>
  );
};

const NavbarComponent2 = () =>{
  const navbarStyle = {
    backgroundColor: '#008080',
    transition: 'background-color 0.3s ease',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };
  return(
    <Navbar expand="lg" style={navbarStyle} variant="dark">
          <Container>
            <Navbar.Brand href="/" style={{fontFamily:'Gagalin, cursive', fontWeight:'bold'}}>Groom You</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
          </Navbar.Collapse>
          </Container>
        </Navbar>
  );
}

function Dashboard() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <>
            <NavbarComponent/>
            <Home/>
            <About/>
            <Team/>
            <Contact/>
            <Footer/>
            </>
          }
        />
        <Route path='/signup' element={<><NavbarComponent2/><Signup/></>}></Route>
        <Route path='/login' element={<><NavbarComponent2/><Login/></>}></Route>
        <Route path='/allclients' element={<><NavbarComponent2/><AllClients/></>}></Route>
        <Route path='/allproviders' element={<><NavbarComponent2/><AllProviders/></>}></Route>
        <Route path='/login-profile' element={<><NavbarComponent2/><Profile/></>}></Route>
        <Route path='/provider-profile' element={<><NavbarComponent2/><Service/></>}></Route>
        <Route path='/cdashboard' element={<><NavbarComponent2/><Client/></>}></Route>
        <Route path='/pdashboard' element={<><NavbarComponent2/><Provider/></>}></Route>
        <Route path='/adashboard' element={<><NavbarComponent2/><AdminDash/></>}></Route>
        <Route path='/post-req' element={<><NavbarComponent2/><PostReq/></>}></Route>
        <Route path='/search' element={<><NavbarComponent2/><Search/></>}></Route>
        <Route path='/searchclient' element={<><NavbarComponent2/><SearchCl/></>}></Route>
        <Route path='/admin' element={<><NavbarComponent2/><Admin/></>}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default Dashboard;