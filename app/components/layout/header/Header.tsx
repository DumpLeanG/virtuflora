import Layout from "../Layout";
import Link from "next/link";
import Image from "next/image";
import Button from "../button/Button";

export default function Header() {
    return (
        <header className="py-4 md:py-6 bg-background-2 border-b-2 md:border-b-3 border-black">
            <Layout>
                <nav className="flex justify-between items-center">
                    <Link href="/">
                        <Image
                        className="drop-shadow-2 w-24 h-5.5 md:w-29 md:h-6.5"
                        src="/logo.svg"
                        alt="logo"
                        width={116}
                        height={26}
                        priority
                        />
                    </Link>
                    <div className="flex gap-4 md:gap-6" >
                        <Button type="achievements"/>
                        <Button type="settings"/>
                    </div>
                </nav>
            </Layout>
        </header>
    )
}