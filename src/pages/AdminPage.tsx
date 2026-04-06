import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Save, LogOut, Settings, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProjects, saveProjects, getSettings, saveSettings, type Project, type SiteSettings } from "@/lib/data";
import { toast } from "sonner";

const ADMIN_KEY = "admin123";

const AdminPage = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [settings, setSettingsState] = useState<SiteSettings>(getSettings());
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    if (authenticated) {
      setProjects(getProjects());
      setSettingsState(getSettings());
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
          <h1 className="text-2xl font-bold text-foreground mb-6 text-center">Panel de Admin</h1>
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

  const emptyProject: Project = {
    id: "",
    title: "",
    shortDescription: "",
    problem: "",
    solution: "",
    imageUrl: "",
    galleryUrls: [],
    technologies: [],
  };

  const handleSaveProject = () => {
    if (!editingProject || !editingProject.title) return;
    const proj = {
      ...editingProject,
      id: editingProject.id || editingProject.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    };

    const existing = projects.findIndex((p) => p.id === proj.id);
    let updated: Project[];
    if (existing >= 0) {
      updated = [...projects];
      updated[existing] = proj;
    } else {
      updated = [...projects, proj];
    }
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

  const handleSaveSettings = () => {
    saveSettings(settings);
    toast.success("Configuración guardada");
  };

  const addTech = () => {
    if (techInput.trim() && editingProject) {
      setEditingProject({
        ...editingProject,
        technologies: [...editingProject.technologies, techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    if (editingProject) {
      setEditingProject({
        ...editingProject,
        technologies: editingProject.technologies.filter((t) => t !== tech),
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-foreground font-bold text-lg">Admin Panel</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")} className="border-border text-foreground">
              Ver Sitio
            </Button>
            <Button variant="outline" size="sm" onClick={() => setAuthenticated(false)} className="border-border text-muted-foreground">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <Tabs defaultValue="projects">
          <TabsList className="bg-secondary border border-border mb-8">
            <TabsTrigger value="projects" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <FolderOpen className="w-4 h-4" /> Proyectos
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <Settings className="w-4 h-4" /> Configuración
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            {editingProject ? (
              <div className="p-6 rounded-xl border border-border bg-card space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  {editingProject.id ? "Editar" : "Nuevo"} Proyecto
                </h2>
                <Input placeholder="Título" value={editingProject.title} onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })} className="bg-secondary border-border text-foreground" />
                <Input placeholder="Descripción corta" value={editingProject.shortDescription} onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })} className="bg-secondary border-border text-foreground" />
                <Textarea placeholder="Problema" value={editingProject.problem} onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })} className="bg-secondary border-border text-foreground" />
                <Textarea placeholder="Solución" value={editingProject.solution} onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })} className="bg-secondary border-border text-foreground" />
                <Input placeholder="URL de imagen principal" value={editingProject.imageUrl} onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })} className="bg-secondary border-border text-foreground" />
                <Input placeholder="URLs de galería (separadas por coma)" value={editingProject.galleryUrls.join(", ")} onChange={(e) => setEditingProject({ ...editingProject, galleryUrls: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="bg-secondary border-border text-foreground" />
                <Input placeholder="URL de video (opcional)" value={editingProject.videoUrl || ""} onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })} className="bg-secondary border-border text-foreground" />

                <div>
                  <div className="flex gap-2 mb-2">
                    <Input placeholder="Agregar tecnología" value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())} className="bg-secondary border-border text-foreground" />
                    <Button type="button" onClick={addTech} variant="outline" size="sm" className="border-border text-foreground">+</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editingProject.technologies.map((t) => (
                      <Badge key={t} variant="secondary" className="bg-secondary text-secondary-foreground cursor-pointer" onClick={() => removeTech(t)}>
                        {t} ×
                      </Badge>
                    ))}
                  </div>
                </div>

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
                <div className="space-y-4">
                  {projects.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                      <div>
                        <h3 className="text-foreground font-medium">{p.title}</h3>
                        <p className="text-muted-foreground text-sm">{p.technologies.join(", ")}</p>
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
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="settings">
            <div className="p-6 rounded-xl border border-border bg-card space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Configuración del Sitio</h2>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Número de WhatsApp</label>
                <Input value={settings.whatsappNumber} onChange={(e) => setSettingsState({ ...settings, whatsappNumber: e.target.value })} className="bg-secondary border-border text-foreground" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                <Input value={settings.email} onChange={(e) => setSettingsState({ ...settings, email: e.target.value })} className="bg-secondary border-border text-foreground" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">LinkedIn URL</label>
                <Input value={settings.linkedinUrl} onChange={(e) => setSettingsState({ ...settings, linkedinUrl: e.target.value })} className="bg-secondary border-border text-foreground" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">GitHub URL</label>
                <Input value={settings.githubUrl} onChange={(e) => setSettingsState({ ...settings, githubUrl: e.target.value })} className="bg-secondary border-border text-foreground" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Twitter URL</label>
                <Input value={settings.twitterUrl} onChange={(e) => setSettingsState({ ...settings, twitterUrl: e.target.value })} className="bg-secondary border-border text-foreground" />
              </div>
              <Button onClick={handleSaveSettings} className="bg-primary text-primary-foreground gap-2">
                <Save className="w-4 h-4" /> Guardar Configuración
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
