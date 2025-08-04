import Navigation from "@/components/Navigation";
import VideoHero from "@/components/VideoHero";
import Section from "@/components/Section";
import ContactCard from "@/components/ContactCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <VideoHero />

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