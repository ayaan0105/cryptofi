import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { HistoricalChart } from '../apis/api';
import AuthContext from '../context';
import { CircularProgress } from '@mui/material';
import SelectButton from './SelectButton';
import { ChartDays } from '../apis/chartDays';
// import {Container} from '@mui/material';
import './graph.css';


const Graph = ({coin}) => {


    const [chartData, setchartData] = useState();
    const [days, setDays] = useState(1);
    const [flag,setflag] = useState(false);
    const authCtx = useContext(AuthContext);
    const {currency} = authCtx;
  
    const getInfoChart = async() => {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setflag(true);
      console.log(data);
      setchartData(data.prices);
    };

    useEffect(() => {
        getInfoChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [days]);



    //   function ClickHandler() {}
       

           
        
        
      



  return (
    
        <div className='container2'>
        {!chartData | flag === false ? (
          <CircularProgress
            style={{ color: "#7268CC" , display:'flex', margin:'auto', alignItems:"center"}}
            size={200}
            thickness={1}
          />

        ) : (
            
          <div className='container3'>
            <Line data={{
              labels: chartData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {data:chartData.map((coin)=>coin[1]),
                 label:`Price ( Past ${days} Days ) in ${currency}`,
                 borderColor: "#7660C1",
                },
                
              ],
            }} 
            options={{
              elements:{
                point:{
                  radius:1,
                },
              },
              scales: {
                x: { 
                  grid: {
                    display: false
                  },
                  ticks:{
                    display:false
                  }
                },
                y: {
                  grid: {
                    display: false
                  }
                }
              },
              interaction: {
                mode: 'index',
                intersect: false,
              },
            
            }}
            
            /> 


              
            <div className='btns'>
                {ChartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}

            </div>



            </div>
            
        )}

        
      </div>
  );
};

export default Graph;