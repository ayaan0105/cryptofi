import {AppBar, MenuItem, Typography, Select, Toolbar, FormControl} from '@mui/material';
import { useContext } from 'react';
import { Container} from '@mui/system';
import './header_coinPage.css';
import Logo from '../images/money-bag.png';
import AuthContext from '../context';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {useHistory} from 'react-router-dom';

function Header({ setShow, size }){

    const authCtx = useContext(AuthContext)
    const {currency, setCurrency} = authCtx;
    const history = useHistory();


  function changeHandler(e){
        setCurrency(e.target.value);
  }

  console.log(currency);
  
    return (
        <header className='Head'>
            <AppBar position="static" style={{backgroundColor:"#7f53ac",backgroundImage:'linear-gradient(65deg, #7f53ac 0%, #647dee 74%)',padding:"0.5rem"}}>
                <Container>
                    <Toolbar>
                      <span>
                        <img style={{width:'55px', marginRight:'0.5rem'}} src={Logo} alt='logo'></img>
                      </span>
                <Typography style={{cursor:"pointer"}} className='title' variant='h6' onClick={()=> history.push('/')} >CryptoFi</Typography>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                <Select menuPortalTarget={document.body} 
    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth" className='select' variant='outlined' value={currency}
           onChange={changeHandler}>
                    <MenuItem id='menu' value={"USD"}>USD</MenuItem>
                    <MenuItem id='menu' value={"INR"}>INR</MenuItem>
                    <MenuItem id='menu' value={"EUR"}>EUR</MenuItem>
                </Select>
                </FormControl>
                </Toolbar>
                <div className='favs'>
        <span className='buttons'  >
          Add to watchlist
        </span>
        <div className="cart" onClick={(event) => { 
          event.preventDefault();
          history.push('/favourites') }} >
          <span>
            <FontAwesomeIcon icon={faStar} />
          </span>
          <span>{size}</span>
        </div>
        </div>
                </Container>
            </AppBar>
        </header>
    )
}
export default Header;