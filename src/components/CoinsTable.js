import { Container } from '@mui/system';
import { LinearProgress, TableContainer, TableHead, TableRow, TextField, Typography, TableCell, TableBody, Pagination } from '@mui/material';
import axios from 'axios';
import {Table} from '@mui/material';
import React, { useState, useContext, useEffect } from 'react'
import { CoinList } from '../apis/api';
import AuthContext from '../context';
import './CoinsTable.css';
import { useHistory } from 'react-router-dom';

const CoinsTable = () => {
const [coins, setCoins] = useState([]);
const [loading, setIsLoading] = useState(false);
const [search,setSearch] = useState('');
const [page, setpage] = useState(1)
const history = useHistory();

const authCtx = useContext(AuthContext);
const {currency, symbol} = authCtx;

const getCoins = async () => {
    setIsLoading(true)
    const{data} = await axios.get(CoinList(currency));
    setCoins(data);

    setIsLoading(false);
};

function comma(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

    console.log(coins);

    useEffect(()=>{
        getCoins();
        // eslint-disable-next-line
    },[currency]);

    // {console.log(row.id)}

    const filterSearch = () => {
        return coins.filter((coin) => (coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)));
    }

  return (
    <div>
           <Container style={{textAlign:"center"}} classes="table1">
        <Typography variant="h4" style={{fontSize:"3rem" , margin:20, fontFamily:"Montserrat", color:'black', fontWeight:"700", textTransform:"uppercase"}}>
            Crypto prices
         </Typography>
         <TextField label="search crypto" variant='outlined' style={{marginBottom:'20', width:"100%"}} 
         onChange={(e)=>setSearch(e.target.value)}
            />
            <TableContainer>
                {loading ? (
                    <LinearProgress style={{backgroundColor:"#ffb13e"}}/>
                ) : (
                <Table className='tab' style={{marginTop:"2rem"}}>
                <TableHead style={{backgroundColor:"#7f53ac",backgroundImage:'linear-gradient(315deg, #7f53ac 0%, #647dee 74%)'}}>
                {/* <TableHead style={{backgroundColor:"#ffb13e"}}> */}
                    <TableRow>
                        {["coin","Price","24h Change","Market Cap"].map((top) => (
                            <TableCell style={{
                                color: "white",
                                fontWeight:"700",
                                fontFamily: "Montserrat",
                                fontSize:"1.2rem",
                                textTransform:"uppercase"
                            }}
                              key={top}
                              align={top === "coin"? "" : "right"}
                               >
                                    {top}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterSearch().slice((page-1)*10, (page-1)*10+10).map((row) => {
                        const profit = row.price_change_percentage_24h > 0;
                        return (
                            <TableRow onClick={() => history.push(`/cryptoCoins/${row.id}`)}
                            className="row"
                            key={row.key}
                           >
                            
                            <TableCell component='th' scope="row"

                            style={{
                                display:"flex",
                                gap:20,
                                
                                // border:"2px solid black"    
                            }}>
                                <img src={row?.image}
                                      alt={row.name}
                                      height = "50"
                                      styles={{marginBottom:10}}
                                       />
                                <div styles={{display:"flex", flexDirection:"column"}}>
                                    <span style={{
                                        textTransform:"uppercase",
                                        fontSize:22,
                                    }}>{row.symbol}</span>
                                    <div styles={{color:"darkgrey"}}>{row.name}</div></div>       
                            </TableCell>
                            <TableCell align="right">
                                {symbol}{""}
                                {comma(row.current_price.toFixed(2))}
                            </TableCell>
                            <TableCell 
                                align="right"
                                style={{
                                        color: profit > 0 ? "rgb(14, 203, 129)" : "red", 
                                        fontWeight:800,
                                        }}
                                    >
                                    {profit && "+"}
                                    {row.price_change_percentage_24h.toFixed(2)}%
                            </TableCell>
                            <TableCell align='right'>
                                   {symbol}{""}
                                   {comma(row.market_cap.toString().slice(0, -6)
                                   )}
                                   M                 
                            </TableCell>
                           </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
  )}
            </TableContainer>
            <Pagination style={{
                padding:20,
                width:"95%",
                display:"flex",
                justifyContent:"center",
                }} 
                count={(filterSearch()?.length/10).toFixed(0)}
                onChange={(_,   value) => {
                    setpage(value);
                    window.scrollTo({top:500, behavior:"smooth"});
                }}
                ></Pagination>
                
     </Container>
    </div>
  )
}

export default CoinsTable