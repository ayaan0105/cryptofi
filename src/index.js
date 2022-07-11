import React from 'react';
// import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client'
import './index.css';
import App from './App';
// import {BrowserRouter} from 'react-router-dom';
// import Context from './context'
import 'react-alice-carousel/lib/alice-carousel.css';
import {Context} from './context'


// ReactDOM.render(
//     <Context>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </Context>,
//  document.getElementById('root')
//  );
 


const root = createRoot(document.getElementById('root'));
root.render(
    <Context>
         {/* <BrowserRouter> */}
             <App />
         {/* </BrowserRouter> */}
     </Context>
    );



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
  
//   <React.StrictMode>
//     <App />
//     hi
//   </React.StrictMode>
// );
