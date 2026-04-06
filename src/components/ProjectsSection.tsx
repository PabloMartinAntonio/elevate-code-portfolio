import { getProjects } from "@/lib/data";
import ProjectCard from "./ProjectCard";

const ProjectsSection = () => {
  const projects = getProjects();

  return (
    <section id="proyectos" className="py-24 relative">
      <div className="container mx-auto px-6">
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
