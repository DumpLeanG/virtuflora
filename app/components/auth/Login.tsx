import Button from '../layout/button/Button';
import Input from '../layout/input/Input';
import type { AuthFormProps } from '@/lib/types/auth';

export default function Login({formData, setFormData}: AuthFormProps) {
    return (
        <div className="flex flex-col gap-6 md:gap-8 p-6 md:p-8">
            <Input value={formData.email} type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
            <Input value={formData.password} type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
            <Button type="login"/>
        </div>
    );
}