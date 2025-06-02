"use client";

import { useRegisterMutation } from '@/lib/services/auth/authApi';
import Button from '../layout/button/Button';
import Input from '../layout/input/Input';
import { AuthFormProps } from '@/lib/types/auth';

interface LoadingForm {
    isLoading: boolean;
}

export default function Registration({formData, setFormData, isLoading}: AuthFormProps & LoadingForm) {

    return (
        <div className="flex flex-col gap-6 md:gap-8 p-6 md:p-8">
            <Input value={formData.nickname} type="nickname" onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}/>
            <Input value={formData.email} type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
            <Input value={formData.password} type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
            <Input value={formData.confirmPassword} type="confirmPassword" onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}/>
            <Button type="register" disabled={isLoading}/>
        </div>
    );
}