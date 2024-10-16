import React, { useState } from 'react';
import { FaEye } from '../icons';

const InputPassword = ({ label, name, value, setValue }) => {

    const [type, setType] = useState('password');

    // Handle input change
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    };

    return (
        <div className='relative'>
            {/* Input */}
            <input
                id={name}
                name={name}
                className='w-full border border-[#DCDBDD] p-3 peer placeholder-transparent rounded-md focus:outline-none'
                placeholder=' '
                type={type}
                value={value}
                onChange={handleChange}
                required
            />
            {/* Label */}
            <label
                htmlFor={name}
                className={`absolute left-3 transition-all duration-300 bg-white cursor-pointer whitespace-nowrap
          ${value ? '-top-3 text-sm text-[#84818A]' : 'top-3 text-base'} peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#84818A]`}
            >
                {label}
                <span className='text-red-500'>*</span>
            </label>

            {/* Toggle Password Visibility Icon */}
            <FaEye
                className='absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer'
                onClick={togglePasswordVisibility}
            />
        </div>
    );
};

export default InputPassword;
