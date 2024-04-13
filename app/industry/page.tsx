import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry - Helicopter Services",
  description: "Helicopter Services",
};

export default async function About() {
  return (
    <main className="py-10 max-w-6xl mx-auto px-4">
      <h1 className="text-5xl font-bold mb-10">Industry</h1>
    </main>
  );
}
