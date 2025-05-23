"use client";

import { useAppSelector } from "@/lib/hooks";
import Layout from "../Layout";
import { selectBreakpoint } from "@/lib/features/screen/screenSlice";
import Button from "../button/Button";

export default function Footer() {
    const breakpoint = useAppSelector(selectBreakpoint);

    return (
        <footer className="py-4 md:py-6 bg-background-2 border-t-3 border-black">
            <Layout>
                {breakpoint !== 'sm' ? 
                <span className="text-center block">2025 Virtuflora. Created by Michail Chinenov</span>
                :
                <div className="flex gap-4 justify-center">
                    <Button type="water" disabled/>
                    <Button type="inventory"/>
                    <Button type="shop"/>
                    <Button type="dig" disabled/>
                </div> }
            </Layout>
        </footer>
    )
}