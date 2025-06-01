import type { Metadata } from "next";
import Auth from "./components/auth/Auth";
import Layout from "./components/layout/Layout";

export default function AuthPage() {
  return (
    <main>
      <Layout>
        <Auth />
      </Layout>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Virtuflora",
};
