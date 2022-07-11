import React, { useContext } from "react";
import AuthContext from "../context";
import './favs.css';
import { Container } from "@mui/system";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const Cart = ({ cart, setCart }) => {

  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const {symbol} = authCtx;

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
    console.log(cart);
  };

  useEffect(() => {

    const list = localStorage.getItem("userList")
    const next = JSON.parse(list);
    if(cart === []){
      setCart([...list])
    }
  },[])
 
  useEffect(() => {
    const obj = JSON.stringify(cart);
    window.localStorage.setItem("userList", obj);
  },[])

  function comma(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  console.log(cart);

  
  return (
    <article className="main_box" style={{marginTop:'230px'}} >
      {cart.map((item) => {
        const profit = item.price_change_percentage_24h > 0;

        return(
          <Container onClick={()=>(history.push(`/cryptoCoins/${item.id}`))}>
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img src={item.image} alt="" />
            <p>{item.name}</p>
          </div>
          
            <div className="price_change" style={{
            color: profit > 0 ? "rgb(14, 203, 129)" : "red", 
            fontWeight:800,
            }}>
            {profit && "+"}
            {item.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="fav_price" >
            {symbol}{""}
             {comma(item.current_price.toFixed(0))}
            </div>
            <div className="fav_button">
            <button onClick={(e) => 
             {e.stopPropagation();
            handleRemove(item.id)}
          }
            >Remove</button>
            </div>  
        </div>
        </Container>
      )

})}
    </article>
  );
};

export default Cart;