import type { Metadata } from "next";
import Header from "./components/layout/header/Header";
import Layout from "./components/layout/Layout";
import Footer from "./components/layout/footer/Footer";
import MainPageBlock from "./components/MainPageBlock";

export default function IndexPage() {

  return (
    <>
      <Header />
        <main className="py-6 md:py-8 flex flex-col justify-center flex-grow">
          <Layout className="flex justify-center gap-8">
            <MainPageBlock />
          </Layout>
        </main>
      <Footer />
    </> 
  );
}

export const metadata: Metadata = {
  title: "Virtuflora",
};
