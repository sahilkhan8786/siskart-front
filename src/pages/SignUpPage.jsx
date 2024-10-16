import React, { useContext, useEffect, useState } from 'react'
import InputBox from '../components/InputBox'
import InputPassword from '../components/InputPassword';
import { registerUser } from '../../utils/https';
import { FaSpinner } from '../icons'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';

const SignUpPage = () => {
    const { setIsAuthenticated, isAuthenticated, user } = useContext(AuthContext)

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(`/user/${user?.username}`)
        }
    }, [isAuthenticated])

    async function registerHandler(e) {
        e.preventDefault();
        setIsLoading(true)


        const result = await registerUser('auth/register', {
            username,
            email,
            password,
            passwordConfirm: confirmPassword
        })
        if (String(result?.status).startsWith('4')) {
            setIsError(true);
            setMessage(result?.data?.message);
        }
        else {
            setIsError(false)
            setMessage("User Successfully Created")
            setIsAuthenticated(true)
            navigate('/')
        }

        setIsLoading(false)
    }



    return (
        <>
            <Header />
            <div className=' max-w-6xl mx-auto py-8 mt-32 p-3 font-poppin'>

                <h1 className='text-4xl font-semibold text-left uppercase'>Sign Up</h1>
                <form className='flex flex-col w-full' onSubmit={registerHandler}>

                    <div className='my-6'>
                        <InputBox
                            type='text'
                            value={username}
                            setValue={setUsername}
                            name={'Username'}
                            label={'Username'}
                            isStar={true} />
                    </div>
                    <div className='my-6'>
                        <InputBox
                            type='email'
                            value={email}
                            setValue={setEmail}
                            name={'Email'}
                            label={'Email'}
                            isStar={true} />
                    </div>
                    <div className='my-6'>
                        <InputPassword
                            type='password'
                            value={password}
                            setValue={setPassword}
                            name={'Password'}
                            label={'Password'}
                            isStar={true} />
                    </div>
                    <div className='my-6'>
                        <InputPassword
                            type='password'
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                            name={'Confirm Password'}
                            label={'Confirm Password'}
                            isStar={true} />
                    </div>
                    {message && <p className={`text-center ${isError ? "text-red-500" : "text-blue-500"}  my-2 h-6`}>
                        {message}
                    </p>}
                    <button
                        className='header-button w-full flex items-center justify-center'
                        disabled={isLoading}>
                        {isLoading ?
                            <FaSpinner className='animate-spin text-center' /> :
                            'Sign Up'
                        }
                    </button>
                </form>
            </div>
        </>
    )
}

export default SignUpPage