import Button from '../layout/button/Button';
import Input from '../layout/input/Input';

interface LoginProps {
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
}

export default function Login(props: LoginProps) {
    return (
        <div className="flex flex-col gap-6 md:gap-8 p-6 md:p-8">
            <Input value={props.email} type="email" onChange={(e) => props.setEmail(e.target.value)}/>
            <Input value={props.password} type="password" onChange={(e) => props.setPassword(e.target.value)}/>
            <Button type="login"/>
        </div>
    );
}