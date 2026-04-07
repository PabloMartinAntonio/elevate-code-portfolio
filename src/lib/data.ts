export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  problem: string;
  solution: string;
  imageUrl: string;
  galleryUrls: string[];
  videoUrl?: string;
  technologies: string[];
}

export interface Service {
  id: string;
  icon: string; // lucide icon name
  title: string;
  subtitle: string;
  description: string;
}

export interface HeroContent {
  badge: string;
  titleLine1: string;
  titleHighlight: string;
  titleLine2: string;
  description: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
}

export interface SiteSettings {
  whatsappNumber: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  twitterUrl: string;
}

export interface SiteBranding {
  siteName: string;
  footerTagline: string;
}

// ── Defaults ──

const DEFAULT_HERO: HeroContent = {
  badge: "Desarrollador de Software Freelance",
  titleLine1: "Creo ",
  titleHighlight: "soluciones técnicas",
  titleLine2: "a la medida de tu negocio",
  description:
    "Transformo ideas en sistemas robustos, automatizaciones inteligentes e infraestructura que impulsa tu crecimiento.",
  ctaPrimaryText: "Hablemos por WhatsApp",
  ctaSecondaryText: "Ver Proyectos",
};

const DEFAULT_SERVICES: Service[] = [
  {
    id: "dev-sistemas",
    icon: "Monitor",
    title: "Desarrollo de Sistemas",
    subtitle: "ERP / CRM a medida",
    description:
      "Diseño y construyo sistemas de gestión empresarial adaptados a tu flujo de trabajo. Desde control de inventario hasta facturación electrónica.",
  },
  {
    id: "automatizacion",
    icon: "Workflow",
    title: "Automatización de Procesos",
    subtitle: "N8N / Bots / Integraciones",
    description:
      "Automatizo tareas repetitivas conectando tus herramientas favoritas. Chatbots, flujos de trabajo y notificaciones inteligentes.",
  },
  {
    id: "infra",
    icon: "Server",
    title: "Infraestructura Tecnológica",
    subtitle: "Cloud / DevOps / Seguridad",
    description:
      "Configuro servidores, bases de datos y pipelines CI/CD para que tu aplicación sea rápida, segura y escalable.",
  },
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "erp-lavanderia",
    title: "ERP para Lavandería",
    shortDescription: "Gestión integral de turnos, stock y facturación para cadena de lavanderías.",
    problem: "La cadena de lavanderías manejaba sus operaciones con hojas de cálculo, generando errores en facturación, pérdida de control de inventario y conflictos de turnos entre empleados.",
    solution: "Desarrollé un ERP a medida con módulos de gestión de turnos en tiempo real, control de stock con alertas automáticas y facturación electrónica integrada. El sistema redujo los errores operativos en un 85% y aumentó la eficiencia del negocio.",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    ],
    technologies: ["React", "Node.js", "MySQL", "Docker"],
  },
  {
    id: "sistema-ventas-accesorios",
    title: "Sistema de Ventas - Accesorios Celulares",
    shortDescription: "Control de inventario y ventas rápidas para tienda de accesorios de celulares.",
    problem: "El negocio de accesorios no tenía visibilidad de su inventario real, las ventas se registraban manualmente y no existía control de ganancias por producto.",
    solution: "Implementé un sistema POS con lector de códigos de barras, gestión de inventario en tiempo real con alertas de stock bajo, y un dashboard de analíticas de ventas y rentabilidad por categoría de producto.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80",
    ],
    technologies: ["React", "Express", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "agente-n8n-automatizacion",
    title: "Agente de Automatización en N8N",
    shortDescription: "Flujo de trabajo inteligente para atención al cliente automatizada.",
    problem: "La empresa recibía cientos de consultas diarias por WhatsApp y email, saturando al equipo de soporte y dejando clientes sin respuesta por horas.",
    solution: "Diseñé un agente de automatización con N8N que clasifica consultas, responde preguntas frecuentes automáticamente, escala tickets complejos al equipo humano y registra toda la interacción en un CRM. Redujo el tiempo de respuesta de 4 horas a 30 segundos.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1531746790095-e5054b29ed74?w=800&q=80",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    ],
    technologies: ["N8N", "Node.js", "WhatsApp API", "OpenAI"],
  },
];

const DEFAULT_SETTINGS: SiteSettings = {
  whatsappNumber: "5491112345678",
  email: "contacto@devfreelance.com",
  linkedinUrl: "https://linkedin.com",
  githubUrl: "https://github.com",
  twitterUrl: "https://twitter.com",
};

const DEFAULT_BRANDING: SiteBranding = {
  siteName: "DevFreelance",
  footerTagline: "Todos los derechos reservados.",
};

// ── Getters & Setters ──

function get<T>(key: string, fallback: T): T {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : fallback;
}

function save<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getProjects = () => get<Project[]>("portfolio_projects", DEFAULT_PROJECTS);
export const saveProjects = (v: Project[]) => save("portfolio_projects", v);

export const getSettings = () => get<SiteSettings>("portfolio_settings", DEFAULT_SETTINGS);
export const saveSettings = (v: SiteSettings) => save("portfolio_settings", v);

export const getHero = () => get<HeroContent>("portfolio_hero", DEFAULT_HERO);
export const saveHero = (v: HeroContent) => save("portfolio_hero", v);

export const getServices = () => get<Service[]>("portfolio_services", DEFAULT_SERVICES);
export const saveServices = (v: Service[]) => save("portfolio_services", v);

export const getBranding = () => get<SiteBranding>("portfolio_branding", DEFAULT_BRANDING);
export const saveBranding = (v: SiteBranding) => save("portfolio_branding", v);
