import { useState, useEffect, useRef, ReactNode } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  // Navigation state
  const [isScrolled, setIsScrolled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigationItems = [
    { label: "Quem somos nós", id: "quem-somos" },
    { label: "Serviços", id: "servicos" },
    { label: "Trajetória", id: "trajetoria" },
    { label: "Parcerias", id: "parcerias" },
    { label: "Projeto", id: "projeto" },
    { label: "Contato", id: "contato" },
  ];

  // Section component inline
  const Section = ({ id, title, children, className = "", variant = "default" }: {
    id: string;
    title: string;
    children: ReactNode;
    className?: string;
    variant?: "default" | "cta";
  }) => {
    if (variant === "cta") {
      return (
        <section id={id} className={`py-20 px-6 ${className}`}>
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
              {title}
            </h2>
            <Card className="bg-gradient-cta border-none shadow-glow">
              <CardContent className="p-8 text-white">
                {children}
              </CardContent>
            </Card>
          </div>
        </section>
      );
    }

    return (
      <section id={id} className={`py-20 px-6 bg-gradient-section ${className}`}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            {title}
          </h2>
          <div className="text-lg leading-relaxed text-foreground/80">
            {children}
          </div>
        </div>
      </section>
    );
  };

  // Contact Card component inline
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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-secondary/95 backdrop-blur-md shadow-soft"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center py-4">
            <div className="flex gap-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white font-semibold hover:text-primary-glow transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-glow transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Video Hero */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Placeholder for video - replace with actual video source */}
        <div className="absolute inset-0 bg-gradient-hero"></div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            BIONAI
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto leading-relaxed">
            Revolucionando o monitoramento glicêmico com inteligência artificial
          </p>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Video element - uncomment when you have the video file */}
        {/* 
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/bionai.mp4" type="video/mp4" />
        </video>
        */}
      </section>

      {/* Sections */}
      <Section id="quem-somos" title="Quem somos nós">
        <p className="text-center">
          Somos uma startup inovadora focada em tecnologia para saúde, especializada no desenvolvimento de soluções inteligentes para o monitoramento glicêmico não invasivo. Nosso projeto utiliza inteligência artificial avançada para analisar dados do sensor E-Gluco, da UDESC, oferecendo previsões e correções precisas dos níveis de glicose. Nosso objetivo é facilitar a vida de pessoas com diabetes, proporcionando um acompanhamento mais eficiente e confortável, por meio de software de alta performance e modelos preditivos inteligentes.
        </p>
      </Section>

      <Section id="servicos" title="Nossos Serviços">
        <div className="bg-white rounded-lg p-8 shadow-soft">
          <p>
            Oferecemos um software inteligente de monitoramento glicêmico que integra dados do sensor E-Gluco para corrigir e prever níveis de glicose em tempo real. Utilizamos técnicas avançadas de inteligência artificial, como Random Forest, XGBoost e redes neurais, para garantir precisão e confiabilidade. Nosso serviço é pensado para ser licenciado por empresas de saúde e tecnologia, facilitando a adoção da solução em diferentes mercados e ampliando o acesso a um monitoramento não invasivo e eficiente.
          </p>
        </div>
      </Section>

      <Section id="trajetoria" title="Nossa Trajetória" variant="cta">
        <div className="text-center">
          <p className="mb-6">
            Nossa jornada começou com a identificação de um problema real: o desconforto e as limitações dos métodos invasivos de monitoramento glicêmico. Através de parceria estratégica com a UDESC e desenvolvimento contínuo de soluções em IA, estamos criando o futuro do monitoramento não invasivo.
          </p>
          {/* Placeholder for trajectory image */}
          <div className="bg-white/10 p-8 rounded-lg border border-white/20">
            <p className="text-white/80">Imagem da trajetória será carregada aqui</p>
          </div>
        </div>
      </Section>

      <Section id="parcerias" title="Nossas Parcerias" variant="cta">
        <div className="text-center">
          <p className="mb-6">
            Temos uma parceria estratégica com a Universidade do Estado de Santa Catarina (UDESC), por meio do Laboratório de Eletrônica Orgânica (LEO), responsável pelo desenvolvimento do sensor E-Gluco — um dispositivo inovador de monitoramento glicêmico não invasivo. Essa colaboração garante acesso à tecnologia de ponta para integração com o nosso software de inteligência artificial, fortalecendo a base científica e tecnológica da nossa solução.
          </p>
          {/* Placeholder for UDESC logo */}
          <div className="bg-white/10 p-8 rounded-lg border border-white/20">
            <p className="text-white/80">Logo da UDESC será carregado aqui</p>
          </div>
        </div>
      </Section>

      <Section id="projeto" title="Sobre o Projeto" variant="cta">
        <div className="space-y-6 text-sm leading-relaxed">
          <p>
            A diabetes mellitus configura-se como uma condição crônica de alta prevalência global, afetando atualmente mais de 529 milhões de indivíduos em todo o mundo. De acordo com a publicação científica The Lancet, esse número pode ultrapassar 1,3 bilhão até o ano de 2050. No contexto brasileiro, os casos já superam a marca de 20 milhões, posicionando o país entre os seis com maior incidência mundial.
          </p>
          
          <p>
            O monitoramento glicêmico, etapa essencial no manejo da doença, ainda é majoritariamente realizado por métodos invasivos, como a punção digital, que exige múltiplas perfurações diárias nos dedos dos pacientes. Tal procedimento gera não apenas desconforto físico, mas também impactos emocionais significativos. Crianças e indivíduos neurodivergentes com hipersensibilidade tátil, por exemplo, frequentemente demonstram quadros de ansiedade, medo e resistência diante da necessidade de monitoramento frequente.
          </p>
          
          <p>
            Embora dispositivos como o FreeStyle Libre representem avanços tecnológicos importantes, ainda dependem de sensores invasivos e envolvem custos elevados, restringindo seu acesso a uma grande parcela da população. Diante desse cenário, constata-se uma carência de soluções realmente não invasivas, acessíveis e com validação clínica robusta para o monitoramento contínuo da glicemia.
          </p>
          
          <p>
            Com o objetivo de suprir essa lacuna, propomos o desenvolvimento de uma solução baseada em Inteligência Artificial (IA), cuja principal função será corrigir os dados provenientes de sensores não invasivos e, a partir desses dados tratados, fornecer análises preditivas dos níveis glicêmicos dos usuários. Essa abordagem permitirá que empresas parceiras fabriquem sensores de menor custo, enquanto nossa tecnologia será responsável pelos processos de calibração, validação e interpretação dos sinais, assegurando a confiabilidade dos resultados.
          </p>
        </div>
      </Section>

      <Section id="contato" title="Fale Conosco" variant="cta">
        <div className="text-center">
          <p className="text-xl mb-8">
            Tem vontade de revolucionar o mundo do Diabetes? Entre em contato já!
          </p>
          <ContactCard />
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-lg font-light">
            © O futuro da saúde começa com precisão e excelência
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;