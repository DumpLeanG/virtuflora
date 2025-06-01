"use client";

import Login from './Login';
import Registration from './Registration';
import { useState } from 'react';

export default function Auth() {
    const [activeItem, setActiveItem] = useState("Login");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChangeActiveItem = () => {
        if (activeItem === "Login") {
            setActiveItem("Registration");
        } else {
            setActiveItem("Login");
        }
        setError(null);
        setSuccess(false);
        setNickname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }
    
    return (
        <section className="h-screen w-full">
            <form className="absolute left-1/2 top-1/2 -translate-1/2 drop-shadow-2 md:drop-shadow-3 bg-beige rounded-sm border-2 md:border-3 border-black w-120">
                <div className="flex justify-around bg-dark-beige">
                    <span className={`p-6 md:p-8 w-full text-center ${activeItem === "Login" && "bg-beige border-b-2 md:border-b-3 border-green"}`} onClick={handleChangeActiveItem}>Вход</span>
                    <span className={`p-6 md:p-8 w-full text-center ${activeItem === "Registration" && "bg-beige border-b-2 md:border-b-3 border-green"}`} onClick={handleChangeActiveItem}>Регистрация</span>
                </div>
                {error && <p className="text-red p-6 md:p-8">{error}</p>}
                {success && <p className="text-green p-6 md:p-8">Пользователь успешно зарегистрирован! Подтвердите email.</p>}
                {(activeItem === "Login")
                ? <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>
                : <Registration nickname={nickname} setNickname={setNickname} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}/>}
            </form>
        </section>
    );
}