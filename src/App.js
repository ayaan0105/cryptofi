import './App.css';
import { useState, useContext } from 'react';
import Header from './pages/header';
import {Route, Switch, Redirect} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Coin from './pages/Coin';
import {BrowserRouter} from 'react-router-dom';
import CoinsTable2 from './components/coinsTable2';
import HeaderCoinPage from './components/header_coinPage';
import Watchlist from './pages/watchlist';
import Footer from './components/footer';
import AuthContext from './context';
import AuthForm from './authentication/auth';

function App() {

const [cart,setCart] = useState([]);
const authCtx = useContext(AuthContext);
const {isLoggedIn} = authCtx;

  function handleClick(e){

    const existing = cart.some(element=>{
      if (element.id === e.id) {
        return true;
      }else{
        return false;
      }
    })
  
    if (!existing) {
      setCart([...cart,e])
      // cart.push(e);
    }else{
      
    }
    
    console.log(cart);
}

  return (
    <BrowserRouter>
    <div className="App">
      <Switch>

      <Route path='/' exact>
       <Header />
       <Homepage />
       <Footer />
       </Route>

      <Route path='/cryptoCoins/:id' exact>
         <div style={{backgroundColor:"whitesmoke"}}>
         <Header />
         <Coin />
         </div>
       </Route>

      {!isLoggedIn && (
        <Route path='/auth'>
          <AuthForm />
        </Route>)}

        {isLoggedIn && (
          <Route path='/select'>
                 <HeaderCoinPage size={cart.length} />
                 <CoinsTable2 handleClick={handleClick} />
                 </Route>
        )}
      
      {isLoggedIn && (<Route path='/favourites' exact>
//         <Watchlist cart={cart} setCart={setCart}  />
//       </Route>)}

      <Route path='*'>
          <Redirect to="/" ></Redirect>
        </Route>

      </Switch>
     </div>
     </BrowserRouter>
  );
}

export default App;






















// import './App.css';
// import { useState } from 'react';
// import Header from './pages/header';
// import {Route, Switch, Redirect} from 'react-router-dom';
// import Homepage from './pages/Homepage';
// import Coin from './pages/Coin';
// import {BrowserRouter} from 'react-router-dom';
// import CoinsTable2 from './components/coinsTable2';
// import HeaderCoinPage from './components/header_coinPage';
// import Watchlist from './pages/watchlist';
// import Footer from './components/footer';

// function App() {

//   const [cart,setCart] = useState([]);
//   function handleClick(e){

//     const existing = cart.some(element=>{
//       if (element.id === e.id) {
//         return true;
//       }else{
//         return false;
//       }
//     })
  
//     if (!existing) {
//       setCart([...cart,e])
//       // cart.push(e);
//     }else{
      
//     }
    
//     console.log(cart);
// }

//   return (
//     <BrowserRouter>
//     <div className="App">

//       <Switch>

//       <Route path='/' exact>
//       <Header />
//       <Homepage />
//       <Footer />
//       </Route>

//       <Route path='/select'>
//       <HeaderCoinPage size={cart.length} />
//       <CoinsTable2 handleClick={handleClick} />
//       </Route>

//       <Route path='/cryptoCoins/:id' exact>
//         <div style={{backgroundColor:"whitesmoke"}}>
//         <Header />
//         <Coin />
//         </div>
//       </Route>
      
//       <Route path='/favourites' exact>
//         <Watchlist cart={cart} setCart={setCart}  />
//       </Route>

//       <Route path='*'>
//           <Redirect to="/" ></Redirect>
//         </Route>
      
//       </Switch>

      
//      </div>
//      </BrowserRouter>
//   );
// }

// export default App;
