"use client";

import Login from './Login';
import Registration from './Registration';
import React, { useState } from 'react';
import { useLoginMutation, userApi, useRegisterMutation } from '@/lib/services/user/userApi';
import { useRouter } from "next/navigation";
import { useAppDispatch } from '@/lib/hooks/hooks';
import { useLanguages } from '@/lib/hooks/useLanguages';

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

    const router = useRouter();
    const dispatch = useAppDispatch();

    const [register, { error: registrationError, isLoading: isRegistrationLoading }] = useRegisterMutation();
    const [login, { error: loginError, isLoading: isLoginLoading }] = useLoginMutation();
    
    const error = activeItem === "Registration" ? registrationError : loginError;
    const isLoading = activeItem === "Registration" ? isRegistrationLoading : isLoginLoading;

    const lang = useLanguages();

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
            const { email, password } = formData;
            const result = await login({ email, password });
            if ('data' in result && result.data) {
                dispatch(userApi.util.invalidateTags(['User']));
                setSuccess(true);
                setFormData({
                    nickname: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                
                if (result.data.user) {
                    router.push("/game");
                }
            }
        }
    }
    
    return (
        <section className="h-screen w-full relative">
            <form onSubmit={handleSubmit} className="absolute left-1/2 top-1/2 -translate-1/2 drop-shadow-2 md:drop-shadow-3 bg-beige rounded-sm border-2 md:border-3 border-black w-full md:w-120">
                <div className="flex justify-around bg-dark-beige">
                    <span className={`cursor-pointer p-6 md:p-8 w-full text-center ${activeItem === "Login" && "bg-beige border-b-2 md:border-b-3 border-green"}`} onClick={() => handleChangeActiveItem("Login")}>{lang("login")}</span>
                    <span className={`cursor-pointer p-6 md:p-8 w-full text-center ${activeItem === "Registration" && "bg-beige border-b-2 md:border-b-3 border-green"}`} onClick={() => handleChangeActiveItem("Registration")}>{lang("registration")}</span>
                </div>
                {error && <p className="text-red p-6 pb-0 md:p-8 md:pb-0">{('data' in error) ? (error.data as string) : 'Registration failed'}</p>}
                {success && <p className="text-green p-6 pb-0 md:p-8 md:pb-0">{activeItem === "Login" ? "Successful authorization! Loginning to the game." : "User successfully registered!"}</p>}
                {(activeItem === "Login")
                ? <Login formData={formData} setFormData={setFormData} isLoading={isLoading} />
                : <Registration formData={formData} setFormData={setFormData} isLoading={isLoading}/>}
            </form>
        </section>
    );
}