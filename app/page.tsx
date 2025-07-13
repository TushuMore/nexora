import HeroSplit from "@/components/Hero";
import Hr from "@/components/Hr";
import ProjectsGrid from "@/components/ProjectGrid";
import SkillsGrid from "@/components/SkillsGrid";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSplit/>
      <SkillsGrid/>
      <Hr/>
      <ProjectsGrid/>
      <Testimonials/>
  </>
  );
}
