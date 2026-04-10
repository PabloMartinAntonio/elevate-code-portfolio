import { Server, Workflow, Monitor, Code, Globe, Database, Shield, Cpu, Zap } from "lucide-react";
import { getServices } from "@/lib/data";
import type { LucideIcon } from "lucide-react";
import servicesBg from "@/assets/services-bg.jpg";

const iconMap: Record<string, LucideIcon> = {
  Monitor, Workflow, Server, Code, Globe, Database, Shield, Cpu, Zap,
};

const ServicesSection = () => {
  const services = getServices();

  return (
    <section className="py-24 relative overflow-hidden">
      <img
        src={servicesBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none"
        loading="lazy"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Servicios
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
            ¿Cómo puedo ayudarte?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Monitor;
            return (
              <div
                key={service.id}
                className="group p-8 rounded-xl border border-border bg-card hover:border-primary/40 transition-all duration-500 glow-border-hover animate-fade-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{service.title}</h3>
                <p className="text-primary text-sm font-medium mb-4">{service.subtitle}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
