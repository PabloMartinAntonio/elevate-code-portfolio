import { ArrowDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSettings, getHero } from "@/lib/data";
import heroBgVideo from "@/assets/hero-bg-video.mp4.asset.json";

const HeroSection = () => {
  const settings = getSettings();
  const hero = getHero();

  const scrollToProjects = () => {
    document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        src={heroBgVideo.url}
      />
      <div className="absolute inset-0 bg-background/60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        <div className="animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8 tracking-wide">
            {hero.badge}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-up delay-100">
          {hero.titleLine1}
          <span className="text-gradient">{hero.titleHighlight}</span>
          <br />
          {hero.titleLine2}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
          {hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-300">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-base px-8 py-6 glow-border"
            onClick={() =>
              window.open(
                `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("Hola! Me interesa tu servicio de desarrollo.")}`,
                "_blank"
              )
            }
          >
            <MessageCircle className="w-5 h-5" />
            {hero.ctaPrimaryText}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:bg-secondary text-foreground gap-2 text-base px-8 py-6"
            onClick={scrollToProjects}
          >
            {hero.ctaSecondaryText}
            <ArrowDown className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
