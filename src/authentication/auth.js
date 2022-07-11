import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../context';
import classes from './auth.module.css';
import { Container } from '@mui/system';
import { CircularProgress } from '@mui/material';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();

  const authctx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [loadN, setLoadN] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setLoadN(true);
        setTimeout(() => {
          
          setIsLogin((prevState) => !prevState);
          setLoadN(false);
        }, 1000);
        
  };

  

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let url;
    // optional: Add validation
    setIsLoading(true);
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJNvW5WiOHKn8_7hHharkBDzXwkxksWJM';

    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJNvW5WiOHKn8_7hHharkBDzXwkxksWJM';
    }
    fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        return res.json();
        
      } else {
        return res.json().then((data) => {
          // show an error modal
          let errorMsg = 'Authentication Failed!';
          if (data && data.error && data.error.message) {
            errorMsg = data.error.message;
          }
          throw new Error(errorMsg);
        });
      }
    }).then(data =>{
      // console.log(data);
      authctx.login(data.idToken);
      history.replace('/')

    }).catch(err =>{
      alert(err.message); 
    });
  };

  return (
    <Container >
        <div className={classes.fullPage}>
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} placeholder='Email' />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
            placeholder='Password'
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Wait a moment...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          {loadN && <CircularProgress />}
        </div>
      </form>
    </section>
    </div>
    </Container>
  );
};

export default AuthForm;