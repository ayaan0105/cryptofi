import {AppBar, MenuItem, Typography, Select, Toolbar, FormControl} from '@mui/material';
import { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container} from '@mui/system';
import './header.css';
import Logo from '../images/money-bag.png';
import AuthContext from '../context';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBookmark} from '@fortawesome/free-solid-svg-icons'

function Header(){


    const authCtx = useContext(AuthContext)
    const {currency, setCurrency, isLoggedIn} = authCtx;
    const history = useHistory();

    function logoutHandler(){
        authCtx.logout();
      }

  function changeHandler(e){
        setCurrency(e.target.value);
  }
  console.log(currency);

  
  
    return (
        <header className='Heads'>
            <AppBar position="static" style={{backgroundColor:"#7f53ac",backgroundImage:'linear-gradient(65deg, #7f53ac 0%, #647dee 74%)',padding:"0.5rem"}}>
                <Container>
                    <Toolbar>
                      <span>
                        <img style={{width:'55px', marginRight:'0.5rem'}} src={Logo} alt='logo'></img>
                      </span>
                <Typography className='title' variant='h6' onClick={()=>(history.push('/'))}>CryptoFi</Typography>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                <Select menuPortalTarget={document.body} 
    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
           className='select' variant='outlined' value={currency}
           onChange={changeHandler}>
                    <MenuItem id='menu'  value={"USD"}>USD</MenuItem>
                    <MenuItem id='menu' value={"INR"}>INR</MenuItem>
                    <MenuItem id='menu' value={"EUR"}>EUR</MenuItem>
                </Select>
                </FormControl>
                {/* <span className='login' style={{ borderRadius:"7px", padding:"13px 30px", marginLeft:"20px", fontFamily:"Montserrat", fontWeight:"500"}}>Login</span> */}
                {!isLoggedIn && <span className='login' style={{ borderRadius:"7px", padding:"13px 30px", marginLeft:"20px", fontFamily:"Montserrat", fontWeight:"500"}}><Link to='/auth' style={{ textDecoration: 'none',color:"inherit" }} >Login</Link></span>}
                {isLoggedIn && (<span onClick={logoutHandler } className='logout' style={{ borderRadius:"7px", padding:"13px 30px", marginLeft:"20px", fontFamily:"Montserrat", fontWeight:"500"}}>Logout</span>)}
                </Toolbar>
                <div className='last_comp' 
                // onClick={(event)=>{event.preventDefault()
                // history.push('/select')}}
                >
                    <span className="icon" style={{padding:"0 8px",color:"gold"}}>
                    <FontAwesomeIcon icon={faBookmark} />
                    </span>
                    {/* <span>favourites</span> */}
                    {isLoggedIn ? (<span onClick={()=> history.push('/select')}>favourites</span>
                  ) : (
                    <span onClick={()=> history.push('/auth')}>favourites</span>
                  )
                  }
                </div>
                
                </Container>
            </AppBar>
        </header>
    )
}
export default Header;