"use client";

import Layout from "../Layout";
import Link from "next/link";
import Image from "next/image";
import Button from "../button/Button";

export default function Header() {
    return (
        <header className="py-6 bg-background-2 border-b-3 border-black">
            <Layout>
                <nav className="flex justify-between items-center">
                    <Link href="/tracker">
                        <Image
                        className="drop-shadow-2"
                        src="/logo.svg"
                        alt="logo"
                        width={110}
                        height={20}
                        priority
                        />
                    </Link>
                    <div className="flex gap-6" >
                        <Button type="achievements"/>
                        <Button type="settings"/>
                    </div>
                </nav>
            </Layout>
        </header>
    )
}