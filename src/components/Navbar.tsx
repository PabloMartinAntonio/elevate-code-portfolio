import { Code2 } from "lucide-react";
import { getBranding } from "@/lib/data";

const Navbar = () => {
  const branding = getBranding();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-foreground font-bold text-lg">
          <Code2 className="w-6 h-6 text-primary" />
          {branding.siteName}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Proyectos", id: "proyectos" },
            { label: "Servicios", id: "servicios" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
