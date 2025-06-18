import { useLanguages } from "@/lib/hooks/useLanguages";
import { ChangeEventHandler } from "react";

interface InputProps {
    type: "email" | "password" | "confirmPassword" | "nickname";
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function Input( {type, value, onChange}: InputProps) {
    const lang = useLanguages();

    switch(type) {
        case "email":
            return (
                <input className="border-2 md:border-3 p-2 rounded-sm bg-background appearance-none w-full" type="email" name={type} placeholder={lang("email")} value={value} onChange={onChange} required/>
            )
        case "password":
            return (
                <input className="border-2 md:border-3 p-2 rounded-sm bg-background appearance-none w-full" type="password" name={type} placeholder={lang("password")} value={value} onChange={onChange} required/>
            )
        case "confirmPassword":
            return (
                <input className="border-2 md:border-3 p-2 rounded-sm bg-background appearance-none w-full" type="password" name={type} placeholder={lang("confirmPassword")} value={value} onChange={onChange} required/>
            )
        default:
            return (
                <input className="border-2 md:border-3 p-2 rounded-sm bg-background appearance-none w-full" type="text" name={type} placeholder={lang("nickname")} value={value} onChange={onChange} required/>
            )
    }
}