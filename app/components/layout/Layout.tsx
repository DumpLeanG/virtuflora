import { ReactNode } from "react";

export default function Layout(props: { children: ReactNode, className?: string }) {
    return (
        <div className={`container mx-auto max-xl:px-3 ${props.className}`}>
            {props.children}
        </div>
    );
}