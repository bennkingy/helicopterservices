import ContactForm from "../components/ContactForm";
import { FAQ } from "../components/FAQ";

export default async function Contact() {
  return (
    <main className="py-10 max-w-6xl mx-auto px-4">
      <h1 className="text-5xl font-bold mb-10">Contact Us</h1>
      <ContactForm />
      <div className="py-6"></div>
      <FAQ />
    </main>
  );
}