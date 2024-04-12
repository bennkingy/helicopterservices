import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Helicopter Services",
  description: "Helicopter Services",
};

export default async function Contact() {
  return (
    <main className="flex min-h-screen flex-col py-20">
      <h1 className="text-5xl font-bold mb-10">Contact Us</h1>
    </main>
  );
}
