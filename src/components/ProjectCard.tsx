import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/data";
import { useNavigate } from "react-router-dom";

interface Props {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className={`group relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-500 hover:border-primary/40 glow-border-hover animate-fade-up`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {project.shortDescription}
        </p>

        <div className="mb-4 p-3 rounded-lg bg-muted/40 border border-border/50">
          <p className="text-xs font-medium text-destructive/80 mb-1">Problema</p>
          <p className="text-muted-foreground text-xs line-clamp-2 mb-2">{project.problem}</p>
          <p className="text-xs font-medium text-primary/80 mb-1">Solución</p>
          <p className="text-muted-foreground text-xs line-clamp-2">{project.solution}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-secondary text-secondary-foreground text-xs font-medium"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <button
          onClick={() => navigate(`/proyecto/${project.id}`)}
          className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:gap-3 transition-all duration-300"
        >
          Ver Detalle
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
