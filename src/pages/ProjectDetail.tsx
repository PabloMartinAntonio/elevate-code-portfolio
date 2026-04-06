import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjects, getSettings } from "@/lib/data";
import { MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projects = getProjects();
  const settings = getSettings();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Proyecto no encontrado</h1>
          <Button onClick={() => navigate("/")} variant="outline">Volver al inicio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-24 pb-16">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors animate-fade-in"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a proyectos
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="animate-fade-up">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full aspect-video object-cover rounded-xl border border-border mb-8"
            />
          </div>

          <div className="animate-fade-up delay-100">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-secondary text-secondary-foreground">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12 animate-fade-up delay-200">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold text-destructive mb-3">🔴 El Problema</h3>
              <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold text-primary mb-3">🔵 La Solución</h3>
              <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {project.galleryUrls.length > 0 && (
            <div className="animate-fade-up delay-300">
              <h3 className="text-xl font-semibold text-foreground mb-6">Galería</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {project.galleryUrls.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`${project.title} - imagen ${i + 1}`}
                    className="w-full aspect-video object-cover rounded-lg border border-border"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          )}

          {project.videoUrl && (
            <div className="animate-fade-up delay-400 mb-12">
              <h3 className="text-xl font-semibold text-foreground mb-6">Video</h3>
              <div className="aspect-video rounded-lg overflow-hidden border border-border">
                <iframe
                  src={project.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                  title={project.title}
                />
              </div>
            </div>
          )}

          <div className="text-center animate-fade-up delay-400">
            <p className="text-muted-foreground mb-4">¿Te interesa un proyecto similar?</p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 glow-border"
              onClick={() =>
                window.open(
                  `https://wa.me/${settings.whatsappNumber}?text=Hola! Vi el proyecto "${project.title}" y me gustaría hablar.`,
                  "_blank"
                )
              }
            >
              <MessageCircle className="w-5 h-5" />
              Hablemos
            </Button>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProjectDetail;
