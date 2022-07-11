import React from 'react'
import { Container } from '@mui/system'
import './Banner.css';
import Carousel from './carousel';
import { Typography } from '@mui/material';
const Banner = () => {
  return (
      <div className='banner'>
    <Container className='banner_img'>
        <div className='head'>
        
            <Typography className='typography'
                variant='h2'>
                    CryptoFi
                    {/* CRYPT<span style={{fontSize:"8rem"}}>O</span><div style={{marginTop:'-1rem'}}><span style={{fontSize:"8rem"}}>P</span>OINT</div> */}
            </Typography>
            <Typography variant='subtitle2' className='sub'
            style={{
                fontFamily:"Montserrat",
                // marginLeft:"-30rem",
                color:"black",
                //  textTransform:'uppercase'
            }}>
                {/* Get latest updates for your favourite crypto */}
                Get latest updates for your favourite <span style={{backgroundColor:"#7f53ac",backgroundImage:'linear-gradient(315deg, #7f53ac 0%, #647dee 74%)', borderRadius:"1rem", padding:'2px 7px',color:"white"}}>crypto</span>
            </Typography>
        </div>
        <Carousel />
    </Container>
    </div>
  )
}

export default Banner