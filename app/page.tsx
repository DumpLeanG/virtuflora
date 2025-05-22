import type { Metadata } from "next";
import Header from "./components/layout/header/Header";
import Garden from "./components/garden/Garden";
import Button from "./components/layout/button/Button";
import PlantsList from "./components/plants-list/PlantsList";
import Layout from "./components/layout/Layout";
import Footer from "./components/layout/footer/Footer";
import Line from "./components/line/Line";
export default function IndexPage() {
  return (
    <>
      <Header />
        <main className="py-8 flex-grow">
          <Layout className="flex justify-center gap-8">
            <div className="flex flex-col gap-8 items-end relative">
              <Button type="inventory"/>
              <Line side="left"/>
              <PlantsList />
            </div>
            <div className="flex flex-col gap-8">
              <Garden />
              <div className="flex gap-8">
                <Button type="water" disabled />
                <span className="p-2 w-full border-3 border-black rounded-sm bg-dark-beige text-center drop-shadow-3">Lvl: 30 | Money: 1200$</span>
                <Button type="dig" disabled />
              </div>
            </div>
            <div className="flex flex-col gap-8 items-start relative">
              <Button type="shop"/>
              <Line side="right"/>
              <PlantsList />
            </div>
          </Layout>
        </main>
      <Footer />
    </> 
  );
}

export const metadata: Metadata = {
  title: "Virtuflora",
};
