import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us - Helicopter Services",
  description: "Helicopter Services",
};

export default async function About() {
  return (
    <main className="py-10 max-w-6xl mx-auto px-4 overflow-x-hidden">
      <h1 className="text-5xl font-bold mb-10">About</h1>
    </main>
  );
}
