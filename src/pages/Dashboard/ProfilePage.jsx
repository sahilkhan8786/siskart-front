import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [username, setUsername] = useState(user.username)

    return (
        <div className='bg-gray-50  p-4 rounded-xl '>
            <div className='flex w-full items-center max-w-3xl mx-auto justify-center'>
                <h1 className='text-xl'>Name : </h1>
                <input value={username} onChange={e => setUsername(e.target.value)} />
            </div>
        </div>
    )
}

export default ProfilePage