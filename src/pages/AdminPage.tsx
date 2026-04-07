import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus, Pencil, Trash2, Save, LogOut, Settings, FolderOpen,
  LayoutDashboard, Type, Briefcase, Palette, Eye, GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  getProjects, saveProjects,
  getSettings, saveSettings,
  getHero, saveHero,
  getServices, saveServices,
  getBranding, saveBranding,
  type Project, type SiteSettings, type HeroContent, type Service, type SiteBranding,
} from "@/lib/data";
import { toast } from "sonner";

const ADMIN_KEY = "admin123";

const ICON_OPTIONS = ["Monitor", "Workflow", "Server", "Code", "Globe", "Database", "Shield", "Cpu", "Zap"];

const AdminPage = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [settings, setSettingsState] = useState<SiteSettings>(getSettings());
  const [hero, setHero] = useState<HeroContent>(getHero());
  const [services, setServicesState] = useState<Service[]>([]);
  const [branding, setBranding] = useState<SiteBranding>(getBranding());

  // Editing states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    if (authenticated) {
      setProjects(getProjects());
      setSettingsState(getSettings());
      setHero(getHero());
      setServicesState(getServices());
      setBranding(getBranding());
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_KEY) {
      setAuthenticated(true);
      toast.success("Acceso concedido");
    } else {
      toast.error("Clave incorrecta");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-sm p-8 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-center gap-2 mb-6">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Panel de Admin</h1>
          </div>
          <Input
            type="password"
            placeholder="Clave de acceso"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 bg-secondary border-border text-foreground"
          />
          <Button type="submit" className="w-full bg-primary text-primary-foreground">Entrar</Button>
        </form>
      </div>
    );
  }

  // ── Project helpers ──
  const emptyProject: Project = {
    id: "", title: "", shortDescription: "", problem: "", solution: "",
    imageUrl: "", galleryUrls: [], technologies: [],
  };

  const handleSaveProject = () => {
    if (!editingProject || !editingProject.title) return;
    const proj = {
      ...editingProject,
      id: editingProject.id || editingProject.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    };
    const existing = projects.findIndex((p) => p.id === proj.id);
    const updated = existing >= 0
      ? projects.map((p, i) => (i === existing ? proj : p))
      : [...projects, proj];
    setProjects(updated);
    saveProjects(updated);
    setEditingProject(null);
    toast.success("Proyecto guardado");
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    saveProjects(updated);
    toast.success("Proyecto eliminado");
  };

  const addTech = () => {
    if (techInput.trim() && editingProject) {
      setEditingProject({ ...editingProject, technologies: [...editingProject.technologies, techInput.trim()] });
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    if (editingProject) {
      setEditingProject({ ...editingProject, technologies: editingProject.technologies.filter((t) => t !== tech) });
    }
  };

  // ── Service helpers ──
  const emptyService: Service = { id: "", icon: "Monitor", title: "", subtitle: "", description: "" };

  const handleSaveService = () => {
    if (!editingService || !editingService.title) return;
    const svc = {
      ...editingService,
      id: editingService.id || editingService.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    };
    const existing = services.findIndex((s) => s.id === svc.id);
    const updated = existing >= 0
      ? services.map((s, i) => (i === existing ? svc : s))
      : [...services, svc];
    setServicesState(updated);
    saveServices(updated);
    setEditingService(null);
    toast.success("Servicio guardado");
  };

  const handleDeleteService = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServicesState(updated);
    saveServices(updated);
    toast.success("Servicio eliminado");
  };

  // ── Field helper ──
  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="text-sm text-muted-foreground mb-1.5 block font-medium">{label}</label>
      {children}
    </div>
  );

  const inputCls = "bg-secondary border-border text-foreground";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <h1 className="text-foreground font-bold text-lg">Admin Panel</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")} className="border-border text-foreground gap-1.5">
              <Eye className="w-4 h-4" /> Ver Sitio
            </Button>
            <Button variant="outline" size="sm" onClick={() => setAuthenticated(false)} className="border-border text-muted-foreground">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <Tabs defaultValue="hero">
          <TabsList className="bg-secondary border border-border mb-8 flex flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="hero" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 text-xs sm:text-sm">
              <Type className="w-4 h-4" /> Hero
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 text-xs sm:text-sm">
              <FolderOpen className="w-4 h-4" /> Proyectos
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 text-xs sm:text-sm">
              <Briefcase className="w-4 h-4" /> Servicios
            </TabsTrigger>
            <TabsTrigger value="branding" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 text-xs sm:text-sm">
              <Palette className="w-4 h-4" /> Marca
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 text-xs sm:text-sm">
              <Settings className="w-4 h-4" /> Contacto
            </TabsTrigger>
          </TabsList>

          {/* ══════ HERO ══════ */}
          <TabsContent value="hero">
            <div className="p-6 rounded-xl border border-border bg-card space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Sección Hero</h2>
              <Separator className="bg-border" />
              <Field label="Badge / Etiqueta superior">
                <Input value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} className={inputCls} />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Título - Línea 1">
                  <Input value={hero.titleLine1} onChange={(e) => setHero({ ...hero, titleLine1: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Título - Texto destacado">
                  <Input value={hero.titleHighlight} onChange={(e) => setHero({ ...hero, titleHighlight: e.target.value })} className={inputCls} />
                </Field>
              </div>
              <Field label="Título - Línea 2">
                <Input value={hero.titleLine2} onChange={(e) => setHero({ ...hero, titleLine2: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Descripción">
                <Textarea value={hero.description} onChange={(e) => setHero({ ...hero, description: e.target.value })} className={inputCls} />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Texto botón principal (CTA)">
                  <Input value={hero.ctaPrimaryText} onChange={(e) => setHero({ ...hero, ctaPrimaryText: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Texto botón secundario">
                  <Input value={hero.ctaSecondaryText} onChange={(e) => setHero({ ...hero, ctaSecondaryText: e.target.value })} className={inputCls} />
                </Field>
              </div>
              <Button onClick={() => { saveHero(hero); toast.success("Hero guardado"); }} className="bg-primary text-primary-foreground gap-2">
                <Save className="w-4 h-4" /> Guardar Hero
              </Button>
            </div>
          </TabsContent>

          {/* ══════ PROJECTS ══════ */}
          <TabsContent value="projects">
            {editingProject ? (
              <div className="p-6 rounded-xl border border-border bg-card space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  {editingProject.id ? "Editar" : "Nuevo"} Proyecto
                </h2>
                <Separator className="bg-border" />
                <Field label="Título">
                  <Input value={editingProject.title} onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Descripción corta">
                  <Input value={editingProject.shortDescription} onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Problema">
                  <Textarea value={editingProject.problem} onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Solución">
                  <Textarea value={editingProject.solution} onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })} className={inputCls} />
                </Field>
                <Field label="URL de imagen principal">
                  <Input value={editingProject.imageUrl} onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })} className={inputCls} />
                </Field>
                <Field label="URLs de galería (separadas por coma)">
                  <Input value={editingProject.galleryUrls.join(", ")} onChange={(e) => setEditingProject({ ...editingProject, galleryUrls: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className={inputCls} />
                </Field>
                <Field label="URL de video (opcional)">
                  <Input value={editingProject.videoUrl || ""} onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Tecnologías">
                  <div className="flex gap-2 mb-2">
                    <Input placeholder="Agregar tecnología" value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())} className={inputCls} />
                    <Button type="button" onClick={addTech} variant="outline" size="sm" className="border-border text-foreground">+</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editingProject.technologies.map((t) => (
                      <Badge key={t} variant="secondary" className="bg-secondary text-secondary-foreground cursor-pointer" onClick={() => removeTech(t)}>
                        {t} ×
                      </Badge>
                    ))}
                  </div>
                </Field>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSaveProject} className="bg-primary text-primary-foreground gap-2">
                    <Save className="w-4 h-4" /> Guardar
                  </Button>
                  <Button variant="outline" onClick={() => setEditingProject(null)} className="border-border text-foreground">Cancelar</Button>
                </div>
              </div>
            ) : (
              <>
                <Button onClick={() => setEditingProject(emptyProject)} className="bg-primary text-primary-foreground gap-2 mb-6">
                  <Plus className="w-4 h-4" /> Nuevo Proyecto
                </Button>
                <div className="space-y-3">
                  {projects.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                      <div className="flex items-center gap-4">
                        <GripVertical className="w-4 h-4 text-muted-foreground/40" />
                        {p.imageUrl && (
                          <img src={p.imageUrl} alt={p.title} className="w-16 h-10 object-cover rounded border border-border" />
                        )}
                        <div>
                          <h3 className="text-foreground font-medium">{p.title}</h3>
                          <p className="text-muted-foreground text-xs">{p.technologies.join(", ")}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingProject(p)} className="border-border text-foreground">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteProject(p.id)} className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">No hay proyectos aún. ¡Crea el primero!</p>
                  )}
                </div>
              </>
            )}
          </TabsContent>

          {/* ══════ SERVICES ══════ */}
          <TabsContent value="services">
            {editingService ? (
              <div className="p-6 rounded-xl border border-border bg-card space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  {editingService.id ? "Editar" : "Nuevo"} Servicio
                </h2>
                <Separator className="bg-border" />
                <Field label="Título">
                  <Input value={editingService.title} onChange={(e) => setEditingService({ ...editingService, title: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Subtítulo">
                  <Input value={editingService.subtitle} onChange={(e) => setEditingService({ ...editingService, subtitle: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Descripción">
                  <Textarea value={editingService.description} onChange={(e) => setEditingService({ ...editingService, description: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Ícono">
                  <div className="flex flex-wrap gap-2">
                    {ICON_OPTIONS.map((icon) => (
                      <Badge
                        key={icon}
                        variant={editingService.icon === icon ? "default" : "secondary"}
                        className={`cursor-pointer ${editingService.icon === icon ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                        onClick={() => setEditingService({ ...editingService, icon })}
                      >
                        {icon}
                      </Badge>
                    ))}
                  </div>
                </Field>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSaveService} className="bg-primary text-primary-foreground gap-2">
                    <Save className="w-4 h-4" /> Guardar
                  </Button>
                  <Button variant="outline" onClick={() => setEditingService(null)} className="border-border text-foreground">Cancelar</Button>
                </div>
              </div>
            ) : (
              <>
                <Button onClick={() => setEditingService(emptyService)} className="bg-primary text-primary-foreground gap-2 mb-6">
                  <Plus className="w-4 h-4" /> Nuevo Servicio
                </Button>
                <div className="space-y-3">
                  {services.map((s) => (
                    <div key={s.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                      <div className="flex items-center gap-4">
                        <GripVertical className="w-4 h-4 text-muted-foreground/40" />
                        <div>
                          <h3 className="text-foreground font-medium">{s.title}</h3>
                          <p className="text-muted-foreground text-xs">{s.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingService(s)} className="border-border text-foreground">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteService(s.id)} className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {services.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">No hay servicios aún.</p>
                  )}
                </div>
              </>
            )}
          </TabsContent>

          {/* ══════ BRANDING ══════ */}
          <TabsContent value="branding">
            <div className="p-6 rounded-xl border border-border bg-card space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Identidad de Marca</h2>
              <Separator className="bg-border" />
              <Field label="Nombre del sitio">
                <Input value={branding.siteName} onChange={(e) => setBranding({ ...branding, siteName: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Tagline del footer">
                <Input value={branding.footerTagline} onChange={(e) => setBranding({ ...branding, footerTagline: e.target.value })} className={inputCls} />
              </Field>
              <Button onClick={() => { saveBranding(branding); toast.success("Marca guardada"); }} className="bg-primary text-primary-foreground gap-2">
                <Save className="w-4 h-4" /> Guardar Marca
              </Button>
            </div>
          </TabsContent>

          {/* ══════ SETTINGS ══════ */}
          <TabsContent value="settings">
            <div className="p-6 rounded-xl border border-border bg-card space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Contacto y Redes</h2>
              <Separator className="bg-border" />
              <Field label="Número de WhatsApp">
                <Input value={settings.whatsappNumber} onChange={(e) => setSettingsState({ ...settings, whatsappNumber: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Email">
                <Input value={settings.email} onChange={(e) => setSettingsState({ ...settings, email: e.target.value })} className={inputCls} />
              </Field>
              <Field label="LinkedIn URL">
                <Input value={settings.linkedinUrl} onChange={(e) => setSettingsState({ ...settings, linkedinUrl: e.target.value })} className={inputCls} />
              </Field>
              <Field label="GitHub URL">
                <Input value={settings.githubUrl} onChange={(e) => setSettingsState({ ...settings, githubUrl: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Twitter URL">
                <Input value={settings.twitterUrl} onChange={(e) => setSettingsState({ ...settings, twitterUrl: e.target.value })} className={inputCls} />
              </Field>
              <Button onClick={() => { saveSettings(settings); toast.success("Configuración guardada"); }} className="bg-primary text-primary-foreground gap-2">
                <Save className="w-4 h-4" /> Guardar Contacto
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
