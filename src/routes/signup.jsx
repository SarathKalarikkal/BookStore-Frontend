import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import BASE_URL from '../config';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);


    const { setLoginUser, setUser, setSignUpUser } = useUser();
    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            userName: name,
            userEmail: email,
            password: password
        };
        setLoginUser(null)
        setSignUpUser(data)
        console.log('Sending data:', data);

        try {
            const response = await fetch(`${BASE_URL}/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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

             
            const userName = data.userName
            

            setUser(userName);

            setTimeout(() => {
                navigate('/');
            }, 2000);


          
            

        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            setResponseMessage(error.message);
            setShowErrorPopup(true);
        }
        closePopup();


    };
        
    const closePopup = () => {
        setTimeout(() => {
            setShowSuccessPopup(false);
            setShowErrorPopup(false);
        }, 2000); 
    }

    return (
        <>
            <section className='signup-body'>
                <div className="signup-wrapper">
                    <div className="signup-header">
                        <h2>SignUp</h2>
                        <p>Please fill the form to create an account.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="inp-grp">
                            <label>Name</label>
                            <input type="text" id="name" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="inp-grp">
                            <label>Email</label>
                            <input type="email" id="email" placeholder='Enter your Email address' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="inp-grp">
                            <label>Password</label>
                            <input type="password" id="password" placeholder='Enter a password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className='form-btn' type='submit'>
                            Signup
                        </button>
                        <p className='signup-nav'>Already have an account? <Link to={'/login'} >Login</Link></p>
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
    );
}

export default Signup;
