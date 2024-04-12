import type { Metadata } from "next";
import { FAQ } from "../components/FAQ";

export const metadata: Metadata = {
  title: "Contact - Helicopter Services",
  description: "Helicopter Services",
};

export default async function About() {
  return (
    <main className="py-10 max-w-6xl mx-auto px-4">
      <h1 className="text-5xl font-bold mb-10">About</h1>
      <FAQ />
    </main>
  );
}
