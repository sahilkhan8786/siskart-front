import React, { useEffect, useState } from 'react'
import { blockUser, deleteUser, getUser } from '../../../utils/https';
import { toast } from 'react-toastify';


const UsersPage = () => {
    const [users, setUser] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false)

    useEffect(() => {
        (async () => {
            const result = await getUser('users');
            setUser(result);
            console.log(result)
            setIsRefresh(true)

        })()
    }, [isRefresh]);

    async function blockUserHandler(id) {
        const result = await blockUser(`users/${id}`, true);
        setIsRefresh(false);
        toast.success("User successfully Blocked");
        return result;
    }
    async function unblockUserHandler(id) {
        const result = await blockUser(`users/${id}`, false);
        console.log(result);
        setIsRefresh(false);
        toast.success("User successfully Unblocked");
        return result;
    }
    async function deleteUserhandler(id) {
        const result = await deleteUser(`users/${id}`);
        console.log(result);
        setIsRefresh(false);
        toast.success("User successfully Deleted");
        return result;
    }

    return (
        <div className='flex flex-col gap-3 mb-6'>
            {users && users?.map(user => (
                <div key={user._id} className={`border py-3 rounded-xl p-4 flex justify-between items-center ${user?.isBlocked && 'text-gray-300'}`}>
                    <div className='w-full flex-1 flex justify-start items-start'>
                        <span className='text-gray-500'>Name :- </span>
                        <span>

                            {user?.username}
                        </span>
                    </div>
                    <div className='w-full flex-1 flex justify-start items-start'>
                        <span className='text-gray-500'>Email :- </span>
                        <span>

                            {user?.email}
                        </span>
                    </div>
                    <div className='w-full flex-1 flex justify-start items-start'>
                        <span className='text-gray-500'>Role :- </span>
                        <span>

                            {user?.role}
                        </span>
                    </div>
                    <div className='flex gap-4'>
                        {user?.isBlocked ?
                            <p className='text-red-500 inline-flex items-center justify-center cursor-pointer'
                                onClick={() => unblockUserHandler(user._id)}
                            >Click to unBlocked</p> :
                            <button className='rounded-lg px-3 py-2 bg-red-500 text-white hover:bg-transparent hover:text-red-500 border-2 border-red-500'
                                onClick={() => blockUserHandler(user._id)}
                            >Block</button>
                        }
                        <button
                            className='rounded-lg px-3 py-2 bg-red-500 text-white hover:bg-transparent hover:text-red-500 border-2 border-red-500'
                            onClick={() => deleteUserhandler(user._id)}
                        >Delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UsersPage