import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Helicopter Services",
  description: "Helicopter Services",
};

export default async function Contact() {
  return (
    <main className="py-10 max-w-6xl mx-auto px-4">
      <h1 className="text-5xl font-bold mb-10">Inquire</h1>
      <ContactForm />
    </main>
  );
}