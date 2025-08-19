import { useState, useEffect, useRef, ReactNode } from "react";
import { Mail, Phone, MapPin, Lightbulb, Users, Code, TestTube, Rocket, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Index = () => {
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

  // Desativado: detecção dinâmica de cor do vídeo

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
    const [ref, inView] = useInView({
      threshold: 0.5,
      triggerOnce: false
    });

    return (
      <motion.div 
        className="flex flex-col items-center relative group cursor-pointer" 
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Ponto da linha do tempo */}
        <motion.div
          className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 bg-gray-200 text-gray-500 group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg"
          whileHover={{ scale: 1.1 }}
        >
          <step.icon className="w-6 h-6 transition-colors duration-300" />
        </motion.div>

        {/* Conteúdo do passo */}
        <motion.div
          className="text-center max-w-xs transition-all duration-300 opacity-60 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
        >
          <h3 className="font-bold text-lg mb-2 transition-colors duration-300 text-gray-200 group-hover:text-blue-300">
            {step.title}
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            {step.description}
          </p>
          
          {/* Imagem/Ilustração */}
          {step.image && (
            <motion.div
              className="mt-4 w-20 h-20 mx-auto rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:scale-105"
            >
              <step.image className="w-10 h-10 text-gray-200 transition-colors duration-300 group-hover:text-blue-300" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    );
  };



    const QuemSomosSection = () => {
    const [ref, inView] = useInView({
      threshold: 0.3,
      triggerOnce: false
    });

    return (
      <section id="quem-somos" className="py-20 px-6 bg-transparent">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Quem somos nós
          </h2>
          <p className="text-center mb-12 text-lg leading-relaxed text-foreground/80">
            Somos uma startup inovadora focada em tecnologia para saúde,
            especializada no desenvolvimento de soluções inteligentes para o
            monitoramento glicêmico não invasivo. Nosso projeto utiliza
            inteligência artificial avançada para analisar dados do sensor
            E-Gluco, da UDESC, oferecendo previsões e correções precisas dos
            níveis de glicose. Nosso objetivo é facilitar a vida de pessoas com
            diabetes, proporcionando um acompanhamento mais eficiente e
            confortável, por meio de software de alta performance e modelos
            preditivos inteligentes.
          </p>
          
          {/* Fotos da equipe em horizontal */}
          <div className="flex justify-center mt-12">
            <div className="flex gap-8">
              {/* Beto Lima */}
              <div className="group relative">
                <div className="w-64 h-200 rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  <img
                    src="fotobeto.jpg"
                    alt="Foto de Beto Lima"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Overlay com nome e cargo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-xl">Beto Lima</h3>
                  <p className="text-white/90 text-base">CCO & Dev. Front-End</p>
                </div>
              </div>

              {/* Henrique Lima */}
              <div className="group relative">
                <div className="w-64 h-200 rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  <img
                    src="fotohenrique.jpg"
                    alt="Foto de Henrique Lima"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Overlay com nome e cargo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-xl">Henrique Lima</h3>
                  <p className="text-white/90 text-base">P.O & Dev. Back-End</p>
                </div>
              </div>

              {/* Yuri Kohara */}
              <div className="group relative">
                <div className="w-64 h-200 rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  <img
                    src="fotoyuri.jpg"
                    alt="Foto de Yuri Kohara"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Overlay com nome e cargo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-xl">Yuri Kohara</h3>
                  <p className="text-white/90 text-base">A DECIDIR</p>
                </div>
              </div>

              {/* Lucas Rovina */}
              <div className="group relative">
                <div className="w-64 h-200 rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  <img
                    src="fotolucas.jpg"
                    alt="Foto de Lucas Rovina"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Overlay com nome e cargo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-xl">Lucas Rovina</h3>
                  <p className="text-white/90 text-base">Analista de Dados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const TimelineSection = () => {
    const [ref, inView] = useInView({
      threshold: 0.3,
      triggerOnce: false
    });

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
      <section className="py-20 px-6 bg-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Nossa Trajetória
            </h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Uma jornada de inovação e dedicação para revolucionar o monitoramento glicêmico
            </p>
          </div>

          {/* Linha do tempo horizontal */}
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
        <Card className="bg-black/10 border-black/20 hover:bg-black/20 transition-all duration-300">
          <CardContent className="p-6 text-center text-white">
            <Mail className="w-8 h-8 mx-auto mb-4 text-primary-glow" />
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-sm opacity-90">projetopti2025@gmail.com</p>
          </CardContent>
        </Card>

        <Card className="bg-black/10 border-black/20 hover:bg-black/20 transition-all duration-300">
          <CardContent className="p-6 text-center text-white">
            <Phone className="w-8 h-8 mx-auto mb-4 text-primary-glow" />
            <h3 className="font-semibold mb-2">WhatsApp</h3>
            <p className="text-sm opacity-90">(11) 96728-2124</p>
          </CardContent>
        </Card>

        <Card className="bg-black/10 border-black/20 hover:bg-black/20 transition-all duration-300">
          <CardContent className="p-6 text-center text-white">
            <MapPin className="w-8 h-8 mx-auto mb-4 text-primary-glow" />
            <h3 className="font-semibold mb-2">Localização</h3>
            <p className="text-sm opacity-90">São Paulo, Brasil</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav
  className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300"
>
  <div className="container mx-auto px-6">
    <div className="flex justify-center items-center py-4">
      <div className="flex gap-8">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="text-white text-xl font-semibold hover:text-primary-glow transition-colors duration-300 relative group"
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
        {/* Vídeo de fundo */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="bionai4.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Conteúdo centralizado */}
        <div className="relative z-10 text-white text-center px-6 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            BIONAI
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto leading-relaxed">
            Revolucionando o monitoramento glicêmico com inteligência artificial
          </p>

          {/* Indicador de scroll */}
          <div className="">
            <div className="">
              <div className=""></div>
            </div>
          </div>
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
        <div className="text-center">
          <p className="mb-6">
            Temos uma parceria estratégica com a Universidade do Estado de
            Santa Catarina (UDESC), por meio do Laboratório de Eletrônica
            Orgânica (LEO), responsável pelo desenvolvimento do sensor E-Gluco —
            um dispositivo inovador de monitoramento glicêmico não invasivo.
            Essa colaboração garante acesso à tecnologia de ponta para
            integração com o nosso software de inteligência artificial,
            fortalecendo a base científica e tecnológica da nossa solução.
          </p>
          <div className="bg-transparent p-8 rounded-lg border border-border">
            <img
               src="/Marca_Udesc.png"
              alt="Imagem ilustrando a trajetória da BionAI"
              className="mx-auto max-h-80 w-auto object-contain"
            />
          </div>
        </div>
        </Section>

      <Section id="projeto" title="Sobre o Projeto" variant="cta">
        <div className="space-y-6 text-sm leading-relaxed">
          <p>
            A diabetes mellitus configura-se como uma condição crônica de alta
            prevalência global, afetando atualmente mais de 529 milhões de
            indivíduos em todo o mundo. De acordo com a publicação científica
            The Lancet, esse número pode ultrapassar 1,3 bilhão até o ano de
            2050.
          </p>
          <p>
            O monitoramento glicêmico, etapa essencial no manejo da doença,
            ainda é majoritariamente realizado por métodos invasivos, como a
            punção digital, que exige múltiplas perfurações diárias nos dedos
            dos pacientes. Tal procedimento gera não apenas desconforto físico,
            mas também impactos emocionais significativos.
          </p>
          <p>
            Embora dispositivos como o FreeStyle Libre representem avanços
            tecnológicos importantes, ainda dependem de sensores invasivos e
            envolvem custos elevados, restringindo seu acesso a uma grande
            parcela da população.
          </p>
          <p>
            Com o objetivo de suprir essa lacuna, propomos o desenvolvimento de
            uma solução baseada em Inteligência Artificial (IA), cuja principal
            função será corrigir os dados provenientes de sensores não invasivos
            e, a partir desses dados tratados, fornecer análises preditivas dos
            níveis glicêmicos dos usuários.
          </p>
        </div>
      </Section>

      <Section id="contato" title="Fale Conosco" variant="cta">
        <div className="text-center">
          <p className="text-xl mb-8">
            Tem vontade de revolucionar o mundo do Diabetes? Entre em contato
            já!
          </p>
          <ContactCard />
        </div>
      </Section>

      {/* Rodapé */}
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