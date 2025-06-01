"use client";

import Button from '../layout/button/Button';
import Input from '../layout/input/Input';

interface RegisterProps {
    nickname: string;
    setNickname: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    confirmPassword: string;
    setConfirmPassword: (value: string) => void;
}

export default function Registration(props: RegisterProps) {

    return (
        <div className="flex flex-col gap-6 md:gap-8 p-6 md:p-8">
            <Input value={props.nickname} type="nickname" onChange={(e) => props.setNickname(e.target.value)}/>
            <Input value={props.email} type="email" onChange={(e) => props.setEmail(e.target.value)}/>
            <Input value={props.password} type="password" onChange={(e) => props.setPassword(e.target.value)}/>
            <Input value={props.confirmPassword} type="confirmPassword" onChange={(e) => props.setConfirmPassword(e.target.value)}/>
            <Button type="register"/>
        </div>
    );
}