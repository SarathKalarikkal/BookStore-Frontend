import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import BASE_URL from '../config';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const { setSignUpUser,setUser, setLoginUser } = useUser();

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            userEmail: email,
            password: password,
        };

        console.log('Sending data:', data);

        try {
            const response = await fetch(`${BASE_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const responseData = await response.json();
            console.log('The response message', responseData);
            setResponseMessage(responseData.message)
            setShowSuccessPopup(true);

            setSignUpUser(null)
            setLoginUser(data)
            

            const userEmail = data.userEmail
            
            const userName = userEmail.split('@')[0];
            setUser(userName);

            setTimeout(() => {
                navigate('/');
            }, 100);


            setTimeout(() => {
                localStorage.removeItem('user');
                localStorage.removeItem('loginUser');
                localStorage.removeItem('signUpUser');
            }, 5000);

            


        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            setResponseMessage(error.message);
            setShowErrorPopup(true);
        } finally {
            closePopup();
        }
    };

    const closePopup = () => {
        setTimeout(() => {
            setShowSuccessPopup(false);
            setShowErrorPopup(false);
        }, 2000);
    };

    return (
        <>
            <section className='login-body'>
                <div className="login-wrapper">
                    <div className="login-header">
                        <h2>Login</h2>
                        <p>Please fill the form to login.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="inp-grp">
                            <label>Email</label>
                            <input type="email" id="email" placeholder='Enter your Email address' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="inp-grp">
                            <label>Password</label>
                            <input type="password" id="password" placeholder='Enter a password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className='form-btn' type='submit'>
                            Login
                        </button>
                        <p  className='login-nav'>Don't have an account?<Link to={'/signup'} >Signup</Link></p>
                        
                    </form>
                    {showSuccessPopup && (
                        <div className='success-message'>
                            <i className="bi bi-check2-circle"></i>
                            <p>{responseMessage}</p>
                        </div>
                    )}
                    {showErrorPopup && (
                        <div className='erro-message'>
                            <i className="bi bi-x-circle-fill"></i>
                            <p>{responseMessage}</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default Login
