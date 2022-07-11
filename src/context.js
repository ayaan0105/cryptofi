// eslint-disable-next-line
import { createContext, useEffect, useState } from "react";
import React from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: ()=>{}
}) 

export function Context(props){
    const [currency, setCurrency] = useState('INR');
    const [symbol, setSymbol] = useState('₹');
    const initialToken = localStorage.getItem('token');
    const[token, setToken] = useState(initialToken);

    const isLogged = !!token;

    const LoginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    }
    
    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

   

    useEffect(() => {
      if (currency === 'INR') {
          setSymbol('₹')
      }
      if (currency === 'USD') {
          setSymbol('$')
      }
      if (currency === 'EUR') {
        setSymbol('€')
    }
    }, [currency])
    
    const ctxVal = {
        token,
        isLoggedIn: isLogged,
        currency,
        symbol,
        login: LoginHandler,
        logout: logoutHandler,
        setCurrency
    }

    return(
        <AuthContext.Provider value={ctxVal}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;