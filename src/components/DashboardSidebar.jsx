import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const DashboardSidebar = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className='flex'>
            <ul>
                <li>
                    <NavLink
                        to={`/user/${user?.username}`}
                        className={({ isActive }) =>
                            isActive ? "bg-red-400" : "bg-transparent"
                        }
                        end
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={`/user/${user?.username}/quotations`}
                        className={({ isActive }) =>
                            isActive ? "bg-red-400" : "bg-transparent"
                        }
                    >
                        Quotations
                    </NavLink>
                </li>

                {user.role === 'admin' && (
                    <li>
                        <NavLink
                            to={`/user/${user?.username}/users`}
                            className={({ isActive }) =>
                                isActive ? "bg-red-400" : "bg-transparent"
                            }
                        >
                            User
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default DashboardSidebar;
