"use client";

import Layout from "../Layout";
import Link from "next/link";
import Image from "next/image";
import Button from "../button/Button";
import Achievements from "@/app/components/achievements/Achievements";
import Settings from "../../settings/Settings";
import { useState } from "react";

type OpenedWindow = null | "achievements" | "settings";

export default function Header() {
    const [openedWindow, setOpenedWindow] = useState<OpenedWindow>(null);

    return (
        <header className="py-4 md:py-6 bg-background-2 border-b-2 md:border-b-3 border-black">
            <Layout>
                <nav className="flex justify-between items-center">
                    <Link href="/">
                        <Image
                        className="drop-shadow-2 drop-shadow-black w-24 h-5.5 md:w-29 md:h-6.5"
                        src="/logo.svg"
                        alt="logo"
                        width={116}
                        height={26}
                        priority
                        />
                    </Link>
                    <div className="flex gap-4 md:gap-6" >
                        <Button type="achievements" onClick={() => setOpenedWindow("achievements")}/>
                        <Button type="settings" onClick={() => setOpenedWindow("settings")}/>
                    </div>
                </nav>
            </Layout>
            {openedWindow === "achievements" ? <Achievements handleOutsideClick={() => setOpenedWindow(null)}/> : openedWindow === "settings" && <Settings handleOutsideClick={() => setOpenedWindow(null)}/>}
        </header>
    )
}