import React from 'react';
import Header3 from '../components/header_favs';
import Favourites from './favs';
import Modal from '../components/modal';

 const watchlist = (props) => {

    const isEmpty = () =>{
        if (props.cart.length === 0) {
          return true;
        }else{
          return false;
        }
      }

console.log(props.cart);

  return (
    <div>
        <Header3 />
        <Favourites cart={props.cart} setCart={props.setCart} />
        {isEmpty() && <Modal />}
    </div>
  )
}

export default watchlist;
