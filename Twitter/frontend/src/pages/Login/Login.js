import './login.css';
import TwitterImg from '../../assets/Images/twitter.jpeg';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useState } from 'react';
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword,useSignInWithGoogle  } from "react-firebase-hooks/auth";
import { Link, useNavigate } from 'react-router-dom';
import GoogleBtn from 'react-google-button';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMess, setErrorMess] = useState();
    const navigate = useNavigate();

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    const handleGoogleSubmit = async (e) => {
        e.preventDefault();
        signInWithGoogle();
    }

    if(googleUser){
        navigate('/');
    }

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(`${email} and the Password ${password}`);
        signInWithEmailAndPassword(email,password);
    }

    if(user){
        navigate('/');
    }


    return (
        <>
            <div className="cont">
                <div className="login-cont">
                    <div className="img-cont">
                        <img src={TwitterImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="form-cont">
                        <TwitterIcon style={{ fontSize: '40px', color: 'skyblue' }} />
                        <h1 className='login-title'>Happening Now</h1>
                        <h3 style={{ fontSize: '25px' }}>Join Twitter Today.</h3>
                        <form onSubmit={handleSubmit} className='login-form'>
                            <input
                                type="email"
                                placeholder='@gmail'
                                className='log-input'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder='Password'
                                className='log-input'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="login-btn">
                                <button type='submit' >Login</button>
                            </div>
                            <button className="login-reg">
                                <Link to={'/signup'} style={{textDecoration:'none',color: 'white'  }}>
                                    Sign Up
                                </Link>
                            </button>
                            <div className="google-button">
                                <GoogleBtn className='google-btn' type='light' onClick={handleGoogleSubmit} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;