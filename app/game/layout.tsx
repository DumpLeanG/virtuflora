"use client";
import { ReactNode, useEffect, useState } from "react";
import Header from "../components/layout/header/Header";
import Layout from "../components/layout/Layout";
import Footer from "../components/layout/footer/Footer";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { User } from "@supabase/supabase-js";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { setUser } from "@/lib/features/player/playerSlice";

interface Props {
  readonly children: ReactNode;
}

export default function GameLayout( {children} : Props ) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.player.user);

  useEffect(() => {
    if(!user) {
      const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        dispatch(setUser(user));
        if (!user) {
          router.push("/");
        }
      }
      checkUser();
    }
  }, [router, user]);
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

