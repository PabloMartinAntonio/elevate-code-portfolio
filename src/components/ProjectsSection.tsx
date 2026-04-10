import { getProjects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import projectsBg from "@/assets/projects-bg.jpg";

const ProjectsSection = () => {
  const projects = getProjects();

  return (
    <section id="proyectos" className="py-24 relative overflow-hidden">
      <img
        src={projectsBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        loading="lazy"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Proyectos Destacados
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Cada proyecto es una solución diseñada para resolver problemas reales de negocio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
