import type { Metadata } from "next";
import Header from "./components/layout/header/Header";
import Garden from "./components/garden/Garden";
import PlantsList from "./components/plants/PlantsList";
import Layout from "./components/layout/Layout";
import Footer from "./components/layout/footer/Footer";

export default function IndexPage() {

  return (
    <>
      <Header />
        <main className="py-8 flex flex-col justify-center flex-grow">
          <Layout className="flex justify-center gap-8">
            <PlantsList side="left" buttonType="inventory"/>
            <Garden />
            <PlantsList side="right" buttonType="shop"/>
          </Layout>
        </main>
      <Footer />
    </> 
  );
}

export const metadata: Metadata = {
  title: "Virtuflora",
};
