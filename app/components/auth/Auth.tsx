"use client";

import Login from './Login';
import Registration from './Registration';
import React, { useState } from 'react';
import { useRegisterMutation } from '@/lib/services/auth/authApi';

type ActiveItem = "Login" | "Registration";

export default function Auth() {
    const [activeItem, setActiveItem] = useState<ActiveItem>("Login");
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [register, { error, isLoading }] = useRegisterMutation();
    

    const handleChangeActiveItem = (item: ActiveItem) => {
        setActiveItem(item);
        setFormData({
            nickname: '',
            email: '',
            password: '',
            confirmPassword: '',
        })
        setSuccess(false);
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (activeItem === "Registration") {
        const result = await register(formData);
            if ('data' in result) {
                setSuccess(true);
                setFormData({
                    nickname: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
            }
        } else {
            console.log('Login submitted', formData);
        }
    }
    
    return (
        <section className="h-screen w-full relative">
            <form onSubmit={handleSubmit} className="absolute left-1/2 top-1/2 -translate-1/2 drop-shadow-2 md:drop-shadow-3 bg-beige rounded-sm border-2 md:border-3 border-black w-full md:w-120">
                <div className="flex justify-around bg-dark-beige">
                    <span className={`cursor-pointer p-6 md:p-8 w-full text-center ${activeItem === "Login" && "bg-beige border-b-2 md:border-b-3 border-green"}`} onClick={() => handleChangeActiveItem("Login")}>Login</span>
                    <span className={`cursor-pointer p-6 md:p-8 w-full text-center ${activeItem === "Registration" && "bg-beige border-b-2 md:border-b-3 border-green"}`} onClick={() => handleChangeActiveItem("Registration")}>Registration</span>
                </div>
                {error && <p className="text-red p-6 pb-0 md:p-8 md:pb-0">{('data' in error) ? (error.data as string) : 'Registration failed'}</p>}
                {success && <p className="text-green p-6 pb-0 md:p-8 md:pb-0">User successfully registered! Confirm your email.</p>}
                {(activeItem === "Login")
                ? <Login formData={formData} setFormData={setFormData} />
                : <Registration formData={formData} setFormData={setFormData} isLoading={isLoading}/>}
            </form>
        </section>
    );
}