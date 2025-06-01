import { ChangeEventHandler } from "react";

interface InputProps {
    type: "email" | "password" | "confirmPassword" | "nickname";
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function Input( {type, value, onChange}: InputProps) {
    switch(type) {
        case "email":
            return (
                <input className="border-2 md:border-3 p-2 rounded-sm bg-background appearance-none w-full" type="email" name={type} placeholder="Email address" value={value} onChange={onChange} required/>
            )
        case "password":
            return (
                <input className="border-2 md:border-3 p-2 rounded-sm bg-background appearance-none w-full" type="password" name={type} placeholder="Password" value={value} onChange={onChange} required/>
            )
        case "confirmPassword":
            return (
                <input className="border-2 md:border-3 p-2 rounded-sm bg-background appearance-none w-full" type="password" name={type} placeholder="Password confirmation" value={value} onChange={onChange} required/>
            )
        default:
            return (
                <input className="border-2 md:border-3 p-2 rounded-sm bg-background appearance-none w-full" type="text" name={type} placeholder="Nickname" value={value} onChange={onChange} required/>
            )
    }
}