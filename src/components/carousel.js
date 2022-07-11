import React, { useContext, useEffect, useState } from 'react'
import { TrendingCoins } from '../apis/api';
import AuthContext from '../context';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import './carousel.css';
import { CircularProgress } from '@mui/material';
// import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';

const Carousel = () => {

    const [trending, setTrending] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);
    const {currency,symbol} = authCtx;
    const getTrendingCoins = async() => {
        setIsLoading(true);
        const {data} = await axios.get(TrendingCoins(currency));

        setTrending(data);
        setIsLoading(false);
    };

console.log(trending);


    useEffect(() => {
        getTrendingCoins();
        // eslint-disable-next-line
    },[currency]);

    function comma(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const totalItems = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;

        return(
            <Link className='linkCss' to={`/cryptoCoins/${coin.id}`}>
                <img src={coin?.image}
                alt={coin.name}
                height="70"
                style={{marginBottom:10}}
                ></img>
                <span style={{color: "#7E54AE", fontWeight:"900",fontSize:'1.2rem'}}>{coin?.symbol}
                &nbsp;
                <span style={{color: profit > 0? "rgb(14, 203, 129)" : "red",
            fontWeight: 500,
             }}
             >
                 {profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%</span>
                </span>
                <span style={{fontSize:22, fontWeight: 500, color:"black"}}>
                    {symbol} {comma(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        );
    });

    const responsive = {
        0:{
            items:2,
        },
        612:{
            items:4,
        },
    };

  return (
    <div className='carousel'>


        {isLoading ? (<CircularProgress
            style={{ color: "#7268CC" , display:'flex', margin:'auto', alignItems:"center"}}
            size={100}
            thickness={1}
          />) :(
            <AliceCarousel 
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
         //    disableDotsControls
            disableButtonsControls
             responsive={responsive}
             items={totalItems}
             autoplay
         />
          )
        }
        
    </div>
  );
};

export default Carousel