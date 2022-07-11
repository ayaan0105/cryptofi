import {AppBar, MenuItem, Typography, Select, Toolbar, FormControl} from '@mui/material';
import { useContext, } from 'react';
import { Container} from '@mui/system';
import './header_coinPage.css';
import Logo from '../images/money-bag.png';
import AuthContext from '../context';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {useHistory} from 'react-router-dom';

function Header(){

    const authCtx = useContext(AuthContext)
    const {currency, setCurrency} = authCtx;
    const history = useHistory();



  function changeHandler(e){
        setCurrency(e.target.value);
  }
  console.log(currency);
  
    return (
        <header className='Head' >
            <AppBar position="static" style={{backgroundColor:"#7f53ac",backgroundImage:'linear-gradient(65deg, #7f53ac 0%, #647dee 74%)',padding:"0.5rem"}}>
                <Container>
                    <Toolbar>
                      <span>
                        <img style={{width:'55px', marginRight:'0.5rem'}} src={Logo} alt='logo'></img>
                      </span>
                <Typography style={{cursor:"pointer"}} className='title' variant='h6' onClick={()=> history.push('/')} >CryptoFi</Typography>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                <Select labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth" className='select' variant='outlined' value={currency}
           onChange={changeHandler}>
                    <MenuItem id='menu' value={"USD"}>USD</MenuItem>
                    <MenuItem id='menu' value={"INR"}>INR</MenuItem>
                    <MenuItem id='menu' value={"EUR"}>EUR</MenuItem>
                </Select>
                </FormControl>
                </Toolbar>
                <div className='favs'>
        <span className='buttonz' onClick={(event) => {
            event.preventDefault();
            history.push('/select')
        }} >
            <span style={{float:'left', margin:'auto', width:'40%', fontSize:'2rem'}}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
          <span style={{width:"60%", cursor:"pointer", fontFamily:"Montserrat", fontWeight:"500"}}>
          Add more coins 
          </span>
          
        </span>
        
        </div>
                </Container>
            </AppBar>
        </header>
    )
}
export default Header;