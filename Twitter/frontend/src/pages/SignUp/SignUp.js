import './signup.css';
import TwitterImg from '../../assets/Images/twitter.jpeg';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useState } from 'react';
import auth from '../../firebase.init';
import { useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [errorMess, setErrorMess] = useState();
    const navigate = useNavigate();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(`${email} and the Password ${password}`);
        createUserWithEmailAndPassword(email, password);

        const user = {
            username: username,
            name: fullName,
            email: email,
        }

        await axios.post('http://localhost:5000/signUp', (user));
    }

    if (user) {
        navigate('/login');
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
                        <h1 className='signup-title'>Happening Now</h1>
                        <form onSubmit={handleSubmit} className='login-form'>
                            <input
                                type="text"
                                placeholder='username'
                                className='log-input'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='Enter full name'
                                className='log-input'
                                onChange={(e) => setFullName(e.target.value)}
                            />
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
                                <button type='submit' >Sign Up</button>
                            </div>
                            <Link to={'/login'}>
                                <button className='signup-login-btn'>LOG IN</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;