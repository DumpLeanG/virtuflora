import { ReactNode } from "react";
import Header from "../components/layout/header/Header";
import Layout from "../components/layout/Layout";
import Footer from "../components/layout/footer/Footer";

interface Props {
  readonly children: ReactNode;
}

export default function GameLayout( {children} : Props ) {
  return (
    <>
      <Header />
        <main className="py-6 md:py-8 flex flex-col justify-center flex-grow">
          <Layout className="flex justify-center gap-8">
            {children}
          </Layout>
        </main>
      <Footer />
    </> 
  );
}
