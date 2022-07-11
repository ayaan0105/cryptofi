import { LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect,useContext,useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../apis/api";
// import CoinChart from "../components/CoinChart";
import AuthContext from "../context";
// import parse from 'html-react-parser';
import './coin.css';
import HTMLReactParser from "html-react-parser";
// import CoinChart from "../components/CoinChart";
import Graph from "../components/graph";

function Coin() {

    const { id }= useParams();
    console.log(id);

    const [coin, setcoin] = useState();
    const authCtx = useContext(AuthContext);
    const {currency,symbol} = authCtx;

    const getCoins = async () => {
        const {data} = await axios.get(SingleCoin(id));

        setcoin(data);
        console.log(coin);
    }

    function comma(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        // eslint-disable-next-line
        getCoins();
        // eslint-disable-next-line
    },[])

    if(!coin) return <LinearProgress style={{background:"#fd13b"}} />
    return (
        <div className="content">
            <div className="info">
                <img
                  src={coin?.image.large}
                  alt={coin?.name}
                  height="200"
                  style={{marginBottom:15}}
                   />
                <Typography variant="h3" className="heading2">
                    {coin?.name}
                </Typography>
                <Typography variant="subtitle1" className="desc">
                    {HTMLReactParser(coin?.description.en.split(". ")[0])}
                </Typography>
                <div className="data">
                <span style={{display:"flex"}}>
                        <Typography variant="h5" className="heading2" >Rank:</Typography>&nbsp;&nbsp;
                        <Typography variant="h5" style={{fontFamily:'Montserrat', fontSize:'1.3rem', display:"flex", alignItems:"center"}}>
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>

                    <span style={{display:"flex"}}>
                        <Typography variant="h5" className="heading2">Current Price:</Typography>&nbsp;&nbsp;
                        <Typography variant="h5" style={{fontFamily:'Montserrat', fontSize:'1.3rem', display:"flex", alignItems:"center"}}>
                            {symbol}{""}
                            {comma(coin?.market_data.current_price[currency.toLowerCase()])}
                        </Typography>
                    </span>
                    
                    <span style={{display:"flex"}}>
                        <Typography variant="h5" className="heading2">Rank:</Typography>&nbsp;&nbsp;
                        <Typography variant="h5" style={{fontFamily:'Montserrat',fontSize:'1.3rem', display:"flex", alignItems:"center"}}>
                            {symbol}{""}
                            {comma(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M
                        </Typography>
                    </span>
                </div>
            </div>
            {/* <Chartss coin={coin} /> */}
            <Graph coin={coin}/>
        </div>
    )
}
export default Coin;