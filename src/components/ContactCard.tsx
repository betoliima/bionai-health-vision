import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ContactCard = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-8">
      <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300">
        <CardContent className="p-6 text-center text-white">
          <Mail className="w-8 h-8 mx-auto mb-4 text-primary-glow" />
          <h3 className="font-semibold mb-2">Email</h3>
          <p className="text-sm opacity-90">projetopti2025@gmail.com</p>
        </CardContent>
      </Card>

      <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300">
        <CardContent className="p-6 text-center text-white">
          <Phone className="w-8 h-8 mx-auto mb-4 text-primary-glow" />
          <h3 className="font-semibold mb-2">WhatsApp</h3>
          <p className="text-sm opacity-90">(11) 96728-2124</p>
        </CardContent>
      </Card>

      <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300">
        <CardContent className="p-6 text-center text-white">
          <MapPin className="w-8 h-8 mx-auto mb-4 text-primary-glow" />
          <h3 className="font-semibold mb-2">Localização</h3>
          <p className="text-sm opacity-90">Santa Catarina, Brasil</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactCard;