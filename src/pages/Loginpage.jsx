import React, { useContext, useEffect, useState } from 'react';
import InputBox from '../components/InputBox';
import InputPassword from '../components/InputPassword';
import { FaSpinner } from '../icons';
import { loginUser } from '../../utils/https';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const { isAuthenticated, setIsAuthenticated, user } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate(`/user/${user?.username}`)
        }
    }, [isAuthenticated])

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
                setIsAuthenticated(true);
                navigate('/');
            }
        } catch (error) {
            setIsError(true);
            setMessage('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }



    return (
        <>
            <Header />
            <div className='max-w-6xl mx-auto py-8 mt-44 p-3 font-poppin'>
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

                    <p className='text-center mt-3'>Dont have an Account?&nbsp;
                        <Link to={'/sign-up'}>
                            <span className='text-blue-500 cursor-pointer hover:underline hover:text-blue-900'>Sign Up</span>
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
