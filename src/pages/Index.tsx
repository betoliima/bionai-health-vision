import { useState, useEffect, useRef, ReactNode } from "react";
import { Mail, Phone, MapPin, Lightbulb, Users, Code, TestTube, Rocket, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Hooks de scroll
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type FacInstance = {
  getColorAsync: (
    source: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement,
    options?: any
  ) => Promise<{ rgb: string }>;
  destroy?: () => void;
};

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const facRef = useRef<FacInstance | null>(null);
  const [bgColor, setBgColor] = useState<string>("#000000");
  
  // Hooks de scroll
  const scrollProgress = useScrollProgress();
  const activeSection = useScrollSpy({ 
    sectionIds: ["quem-somos", "servicos", "trajetoria", "parcerias", "projeto", "contato"] 
  });

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

  // Extração de cor dominante do vídeo
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    let intervalId: number | null = null;
    let isSampling = false;
    let disposed = false;

    const sampleColor = async () => {
      if (!videoEl) return;
      if (videoEl.paused || videoEl.ended || videoEl.readyState < 2) return;
      if (isSampling) return;
      if (!facRef.current) return;
      isSampling = true;
      try {
        const color = await facRef.current.getColorAsync(videoEl, {
          algorithm: "dominant",
          step: 10,
          silent: true,
        });
        if (color && color.rgb) {
          setBgColor(color.rgb);
        }
      } catch {
        // silencioso
      } finally {
        isSampling = false;
      }
    };

    const start = () => {
      if (intervalId !== null) return;
      intervalId = window.setInterval(() => {
        window.requestAnimationFrame(sampleColor);
      }, 200);
    };

    const stop = () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const onReady = () => {
      if (!videoEl.paused) start();
    };

    const setup = async () => {
      try {
        const mod: any = await import("fast-average-color");
        const FacCtor = mod?.default ?? mod?.FastAverageColor ?? mod;
        facRef.current = new FacCtor();
      } catch {
        return;
      }

      if (disposed) return;
      videoEl.addEventListener("play", start);
      videoEl.addEventListener("pause", stop);
      videoEl.addEventListener("ended", stop);
      videoEl.addEventListener("loadeddata", onReady);
      videoEl.addEventListener("canplay", onReady);

      if (!videoEl.paused && videoEl.readyState >= 2) start();
    };

    setup();

    return () => {
      disposed = true;
      stop();
      videoEl.removeEventListener("play", start);
      videoEl.removeEventListener("pause", stop);
      videoEl.removeEventListener("ended", stop);
      videoEl.removeEventListener("loadeddata", onReady);
      videoEl.removeEventListener("canplay", onReady);
      facRef.current?.destroy?.();
      facRef.current = null;
    };
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

  const Section = ({
    id,
    title,
    children,
    className = "",
    variant = "default",
  }: {
    id: string;
    title: string;
    children: ReactNode;
    className?: string;
    variant?: "default" | "cta";
  }) => {
    const [ref, inView] = useInView({
      threshold: 0.3,
      triggerOnce: false
    });

    if (variant === "cta") {
      return (
        <section id={id} className={`py-20 px-6 bg-transparent ${className}`}>
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
              {title}
            </h2>
            <Card className="bg-gradient-cta border-none shadow-glow">
              <CardContent className="p-8 text-white">{children}</CardContent>
            </Card>
          </div>
        </section>
      );
    }

    return (
      <section
        id={id}
        className={`py-20 px-6 bg-transparent ${className}`}
      >
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

  const TimelineStep = ({ 
    step, 
    index, 
    isLast 
  }: { 
    step: any; 
    index: number; 
    isLast: boolean; 
  }) => {
    return (
      <motion.div 
        className="flex flex-col items-center relative group cursor-pointer"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
      >
        <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-gray-200 text-gray-500 transition-all duration-300 group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg">
          <step.icon className="w-6 h-6 transition-colors duration-300" />
        </div>
        <div className="text-center max-w-xs transition-all duration-300 opacity-60 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
          <h3 className="font-bold text-lg mb-2 text-gray-200 transition-colors duration-300 group-hover:text-blue-300">
            {step.title}
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            {step.description}
          </p>
          {step.image && (
            <div className="mt-4 w-20 h-20 mx-auto rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:scale-105">
              <step.image className="w-10 h-10 text-gray-200 transition-colors duration-300 group-hover:text-blue-300" />
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const QuemSomosSection = () => {
    return (
      <section 
        id="quem-somos" 
        className="py-20 px-6 bg-transparent"
      >
        <div className="container mx-auto max-w-4xl">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 text-foreground"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Quem somos nós
          </motion.h2>
          <motion.p 
            className="text-center mb-12 text-lg leading-relaxed text-foreground/80"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Somos uma startup inovadora focada em tecnologia para saúde,
            especializada no desenvolvimento de soluções inteligentes para o
            monitoramento glicêmico não invasivo. Nosso projeto utiliza
            inteligência artificial avançada para analisar dados do sensor
            E-Gluco, da UDESC, oferecendo previsões e correções precisas dos
            níveis de glicose. Nosso objetivo é facilitar a vida de pessoas com
            diabetes, proporcionando um acompanhamento mais eficiente e
            confortável, por meio de software de alta performance e modelos
            preditivos inteligentes.
          </motion.p>
          
          {/* Fotos da equipe em horizontal */}
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex gap-8">
              {[
                {
                  name: "Beto Lima",
                  role: "CCO & Dev. Front-End",
                  photo: "fotobeto.jpg"
                },
                {
                  name: "Henrique Lima",
                  role: "P.O & Dev. Back-End",
                  photo: "fotohenrique.jpg"
                },
                {
                  name: "Yuri Kohara",
                  role: "Tech Lead",
                  photo: "fotoyuri.jpg"
                },
                {
                  name: "Lucas Rovina",
                  role: "Analista de Dados",
                  photo: "fotolucas.jpg"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-64 h-200 rounded-lg overflow-hidden shadow-lg transition-transform duration-200 group-hover:scale-[1.02]">
                    <img
                      src={member.photo}
                      alt={`Foto de ${member.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-end p-4 pointer-events-none">
                    <h3 className="text-white font-bold text-xl">{member.name}</h3>
                    <p className="text-white/90 text-base">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  const TimelineSection = () => {
    const timelineSteps = [
      {
        title: "Ideação",
        description: "Identificação do problema real: desconforto dos métodos invasivos de monitoramento glicêmico",
        icon: Lightbulb,
        image: Lightbulb
      },
      {
        title: "Pesquisa",
        description: "Estudo aprofundado sobre diabetes e tecnologias de monitoramento não invasivo",
        icon: Users,
        image: Users
      },
      {
        title: "Desenvolvimento",
        description: "Criação do software de IA para análise de dados do sensor E-Gluco",
        icon: Code,
        image: Code
      },
      {
        title: "Testes",
        description: "Validação e refinamento dos algoritmos de machine learning",
        icon: TestTube,
        image: TestTube
      },
      {
        title: "Parceria UDESC",
        description: "Colaboração estratégica com o Laboratório de Eletrônica Orgânica",
        icon: Rocket,
        image: Rocket
      },
      {
        title: "Futuro",
        description: "Expansão e licenciamento para empresas de saúde e tecnologia",
        icon: Award,
        image: Award
      }
    ];

    return (
      <section 
        id="trajetoria" 
        className="py-20 px-6 bg-transparent"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Nossa Trajetória
            </h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Uma jornada de inovação e dedicação para revolucionar o monitoramento glicêmico
            </p>
          </motion.div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 pb-8">
              {timelineSteps.map((step, index) => (
                <TimelineStep
                  key={index}
                  step={step}
                  index={index}
                  isLast={index === timelineSteps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const ContactCard = () => {
    return (
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {[
          {
            icon: Mail,
            title: "Email",
            content: "projetopti2025@gmail.com"
          },
          {
            icon: Phone,
            title: "WhatsApp",
            content: "(11) 96728-2124"
          },
          {
            icon: MapPin,
            title: "Localização",
            content: "São Paulo, Brasil"
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <Card className="bg-black/10 border-black/20 hover:bg-black/20 transition-all duration-300">
              <CardContent className="p-6 text-center text-white">
                <item.icon className="w-8 h-8 mx-auto mb-4 text-primary-glow" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm opacity-90">{item.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#000000",
        backgroundImage:
          "linear-gradient(90deg, rgba(4, 4, 12, 1) 0%, rgba(4, 4, 12, 1) 14%, rgba(4, 4, 12, 1) 30%, rgba(25, 81, 145, 1) 50%, rgba(4, 4, 12, 1) 70%, rgba(4, 4, 12, 1) 85%, rgba(4, 4, 12, 1) 100%)",
      }}
    >
      {/* Barra de progresso de scroll */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }} 
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300">
        <div className="container mx-auto px-6">
          <div className="relative flex items-center justify-center py-4">
            <div className="flex gap-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "text-xl font-semibold transition-colors duration-300 relative group",
                    activeSection === item.id 
                      ? "text-primary-glow" 
                      : "text-white hover:text-primary-glow"
                  )}
                >
                  {item.label}
                  <span className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-primary-glow transition-all duration-300",
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </button>
              ))}
            </div>
            
            {/* Área direita com login */}
            <div className="absolute right-0">
              <Link
                to="/login"
                className="text-white/90 hover:text-white text-lg font-semibold border border-white/30 px-4 py-1 rounded-md backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                Login/Cadastre-se
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Video Hero */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="bionai4.mp4"
          crossOrigin="anonymous"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-white text-center px-6 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            BIONAI
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto leading-relaxed">
            Revolucionando o monitoramento glicêmico com inteligência artificial
          </p>
        </div>
      </section>

      {/* Seções */}
      <QuemSomosSection />

      <Section id="servicos" title="Nossos Serviços">
        <div className="bg-transparent rounded-lg p-8">
          <p>
            Oferecemos um software inteligente de monitoramento glicêmico que
            integra dados do sensor E-Gluco para corrigir e prever níveis de
            glicose em tempo real. Utilizamos técnicas avançadas de
            inteligência artificial, como Random Forest, XGBoost e redes
            neurais, para garantir precisão e confiabilidade. Nosso serviço é
            pensado para ser licenciado por empresas de saúde e tecnologia,
            facilitando a adoção da solução em diferentes mercados e ampliando
            o acesso a um monitoramento não invasivo e eficiente.
          </p>
        </div>
      </Section>

      <TimelineSection />

      <Section id="parcerias" title="Nossas Parcerias" variant="cta">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Temos uma parceria estratégica com a Universidade do Estado de
            Santa Catarina (UDESC), por meio do Laboratório de Eletrônica
            Orgânica (LEO), responsável pelo desenvolvimento do sensor E-Gluco —
            um dispositivo inovador de monitoramento glicêmico não invasivo.
            Essa colaboração garante acesso à tecnologia de ponta para
            integração com o nosso software de inteligência artificial,
            fortalecendo a base científica e tecnológica da nossa solução.
          </motion.p>
          <motion.div 
            className="bg-transparent p-8 rounded-lg border border-border"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <img
               src="/Marca_Udesc.png"
              alt="Imagem ilustrando a trajetória da BionAI"
              className="mx-auto max-h-80 w-auto object-contain"
            />
          </motion.div>
        </motion.div>
      </Section>

      <Section id="projeto" title="Sobre o Projeto" variant="cta">
        <motion.div 
          className="space-y-6 text-sm leading-relaxed"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            "A diabetes mellitus configura-se como uma condição crônica de alta prevalência global, afetando atualmente mais de 529 milhões de indivíduos em todo o mundo. De acordo com a publicação científica The Lancet, esse número pode ultrapassar 1,3 bilhão até o ano de 2050.",
            "O monitoramento glicêmico, etapa essencial no manejo da doença, ainda é majoritariamente realizado por métodos invasivos, como a punção digital, que exige múltiplas perfurações diárias nos dedos dos pacientes. Tal procedimento gera não apenas desconforto físico, mas também impactos emocionais significativos.",
            "Embora dispositivos como o FreeStyle Libre representem avanços tecnológicos importantes, ainda dependem de sensores invasivos e envolvem custos elevados, restringindo seu acesso a uma grande parcela da população.",
            "Com o objetivo de suprir essa lacuna, propomos o desenvolvimento de uma solução baseada em Inteligência Artificial (IA), cuja principal função será corrigir os dados provenientes de sensores não invasivos e, a partir desses dados tratados, fornecer análises preditivas dos níveis glicêmicos dos usuários."
          ].map((text, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>
      </Section>

      <Section id="contato" title="Fale Conosco" variant="cta">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Tem vontade de revolucionar o mundo do Diabetes? Entre em contato
            já!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <ContactCard />
          </motion.div>
        </motion.div>
      </Section>

      {/* Rodapé */}
      <motion.footer 
        className="bg-secondary text-white py-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto text-center">
          <p className="text-lg font-light">
          Copyright © 2025 BIONAI. Todos os direitos reservados.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;