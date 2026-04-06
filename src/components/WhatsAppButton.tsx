import { MessageCircle } from "lucide-react";
import { getSettings } from "@/lib/data";

const WhatsAppButton = () => {
  const settings = getSettings();

  return (
    <a
      href={`https://wa.me/${settings.whatsappNumber}?text=Hola! Me interesa tu servicio de desarrollo.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform duration-300"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-background" fill="hsl(var(--background))" />
    </a>
  );
};

export default WhatsAppButton;
