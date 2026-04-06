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

export interface SiteSettings {
  whatsappNumber: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  twitterUrl: string;
}

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

export function getProjects(): Project[] {
  const stored = localStorage.getItem("portfolio_projects");
  return stored ? JSON.parse(stored) : DEFAULT_PROJECTS;
}

export function saveProjects(projects: Project[]) {
  localStorage.setItem("portfolio_projects", JSON.stringify(projects));
}

export function getSettings(): SiteSettings {
  const stored = localStorage.getItem("portfolio_settings");
  return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
}

export function saveSettings(settings: SiteSettings) {
  localStorage.setItem("portfolio_settings", JSON.stringify(settings));
}
