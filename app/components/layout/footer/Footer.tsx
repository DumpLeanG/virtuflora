"use client";

import { useAppSelector } from "@/lib/hooks/hooks";
import Layout from "../Layout";
import { selectWidthBreakpoint } from "@/lib/features/screen/screenSlice";
import Button from "../button/Button";
import PlantsList from "../../plants/PlantsList";

export default function Footer() {
    const widthBP = useAppSelector(selectWidthBreakpoint);

    return (
        <footer className="py-4 md:py-6 bg-background-2 border-t-3 border-black">
            <Layout>
                {widthBP !== 'xs' ? 
                <span className="text-center block">2025 Virtuflora. Created by Michail Chinenov</span>
                :
                <div className="flex gap-4 justify-center">
                    <Button type="water" disabled/>
                    <PlantsList side="left" type="inventory"/>
                    <PlantsList side="right" type="shop"/>
                    <Button type="dig" disabled/>
                </div> }
            </Layout>
        </footer>
    )
}