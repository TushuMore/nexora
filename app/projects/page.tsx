import ProjectsContent from "@/app/projects/ProjectContent"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Projects | Tushar More",
  description: "Explore Tushar Mores frontend and full-stack web projects.",
}

export default function ProjectsPage() {
  return <ProjectsContent/>
}
