import type { Metadata } from "next";
import MainPageBlock from "../components/MainPageBlock";

export default function IndexPage() {

  return (
    <>
      <MainPageBlock />
    </> 
  );
}

export const metadata: Metadata = {
  title: "Virtuflora",
};