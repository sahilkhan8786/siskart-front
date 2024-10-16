import React, { useContext, useState } from 'react';
import InputBox from '../components/InputBox';
import InputPassword from '../components/InputPassword';
import { FaSpinner } from '../icons';
import { loginUser } from '../../utils/https';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';

const LoginPage = () => {
    const { logOut, isAuthenticated, setIsAuthenticated } = useContext(AuthContext); // Ensure you access this from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function loginHandler(e) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await loginUser('auth/login', {
                email,
                password,
            });

            console.log(result);
            if (String(result?.status).startsWith('4') || String(result?.status).startsWith('5')) {
                setIsError(true);
                setMessage(result?.data?.message || 'An error occurred, please try again.');
            } else {
                setIsError(false);
                setMessage("User Successfully Logged In");
                setIsAuthenticated(true); // Update the context here
                navigate('/'); // Redirect to home page after login
            }
        } catch (error) {
            setIsError(true);
            setMessage('An unexpected error occurred. Please try again.'); // Handle unexpected errors
        } finally {
            setIsLoading(false); // Ensure loading is turned off
        }
    }

    return (
        <>
            <Header />
            <div className='max-w-6xl mx-auto py-8 mt-32 p-3 font-poppin'>
                <h1 className='text-4xl font-semibold text-left uppercase'>Log In</h1>
                <form className='flex flex-col w-full' onSubmit={loginHandler}>
                    <div className='my-6'>
                        <InputBox
                            type='email'
                            value={email}
                            setValue={setEmail}
                            name={'Email'}
                            label={'Email'}
                            isStar={true}
                        />
                    </div>
                    <div className='my-6'>
                        <InputPassword
                            type='password'
                            value={password}
                            setValue={setPassword}
                            name={'Password'}
                            label={'Password'}
                            isStar={true}
                        />
                    </div>

                    {message && (
                        <p className={`text-center ${isError ? "text-red-500" : "text-blue-500"} my-2 h-6`}>
                            {message}
                        </p>
                    )}
                    <button
                        className='header-button w-full flex items-center justify-center'
                        disabled={isLoading}
                    >
                        {isLoading ? <FaSpinner className='animate-spin text-center' /> : 'Log In'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
