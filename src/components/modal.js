import React from 'react';
import { Container} from '@mui/system';
import './modal.css';
import { useHistory } from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons'

const Select = () => {
  const history = useHistory();
  return (
    <Container>
    <div  className='modal' onClick={(event)=> {
      event.preventDefault();
      history.push('/select')}}>
        <div style={{display:"flex",justifyContent:"center"}}>
        <span className='goBack'>
        <FontAwesomeIcon icon={faArrowCircleLeft} />
        </span>
        <span style={{padding:'1rem',color:"rgb(49, 49, 88)"}}> 
        Oops! nothing here</span> </div>     
    </div>
    </Container>
  )
}

export default Select