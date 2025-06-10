"use client";
import { ReactNode, useEffect } from "react";
import Header from "../components/layout/header/Header";
import Layout from "../components/layout/Layout";
import Footer from "../components/layout/footer/Footer";
import { useRouter } from "next/navigation";
import { useGetCurrentUserQuery } from "@/lib/services/user/userApi";

interface Props {
  readonly children: ReactNode;
}

export default function GameLayout({ children }: Props) {
  const router = useRouter();
  const { data: user, isLoading, isError } = useGetCurrentUserQuery();

  useEffect(() => {
    if (!isLoading && (!user || isError)) {
      router.push("/");
    }
  }, [router, isLoading, user, isError]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="border-4 border-black border-t-green rounded-full size-9 animate-spin"></div>
      </div>
    );
  }

  return user ? (
    <>
      <Header />
      <main className="py-6 md:py-8 flex flex-col justify-center flex-grow">
        <Layout className="flex justify-center gap-8">
          {children}
        </Layout>
      </main>
      <Footer />
    </>
  ) : null;
}