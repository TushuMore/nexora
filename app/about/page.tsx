import { Metadata } from "next"
import AboutClient from "./AboutClient"


export const metadata: Metadata = {
  title: "About | Tushar More",
  description: "Learn more about Tushar More – frontend developer & UI/UX designer.",
}

export default function AboutPage() {
  return <AboutClient/>
}
