import { Server, Workflow, Monitor, Code, Globe, Database, Shield, Cpu, Zap } from "lucide-react";
import { getServices } from "@/lib/data";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Monitor, Workflow, Server, Code, Globe, Database, Shield, Cpu, Zap,
};

const ServicesSection = () => {
  const services = getServices();

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
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
