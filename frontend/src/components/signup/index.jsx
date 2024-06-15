import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [data, setData] = useState({ userName: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.userName || !data.email || !data.password) {
            setError("All fields are required.");
            return;
        }

        try {
            const url = "http://localhost:5000/api/users";
            const { data: res } = await axios.post(url, data);
            navigate('/login');
            console.log(res.message);
        } catch (err) {
            if (err.response && err.response.status >= 400 && err.response.status <= 500) {
                setError(err.response.data.message);
            }
        }
    };

    return (
        <div>
            <div className='border-2 border-black h-180 rounded-xl'>
                <h1 className='font-bold text-3xl p-5'>Welcome to Weatherry</h1>
                <div className='flex flex-col'>
                    <form onSubmit={handleSubmit}>
                        <h1 className='font-bold text-2xl p-5'>Create Account</h1>
                        <div className='flex flex-col items-center'>
                            <input
                                type='text'
                                placeholder='UserName'
                                onChange={handleChange}
                                name='userName'
                                value={data.userName}
                                className='border-2 border-black rounded-xl p-4 m-2 w-9/12'
                                required
                            />
                            <input
                                type='text'
                                placeholder='Email-id'
                                onChange={handleChange}
                                name='email'
                                value={data.email}
                                className='border-2 border-black rounded-xl p-4 m-2 w-9/12'
                                required
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                onChange={handleChange}
                                name='password'
                                value={data.password}
                                className='border-2 border-black rounded-xl p-4 m-2 w-9/12'
                                required
                            />
                        </div>
                        {error && <div>{error}</div>}
                        <button type='submit' className='border-2 border-black rounded-xl p-4'>Sign Up</button>
                    </form>
                </div>
                <div className='flex flex-row justify-evenly p-5'>
                    <p>Already have an account?</p>
                    <Link to='/login'>
                        <button type='button'>
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
