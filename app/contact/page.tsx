import { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Tushar More",
  description: "Get in touch with Tushar More via email or message form.",
};

export default function ContactPage() {
  return <ContactForm/>
}
