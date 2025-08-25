import React from 'react';
import { AnimatedSection } from './ui/AnimatedSection';
import { ParallaxSection } from './ui/ParallaxSection';
import { FloatingElement } from './ui/FloatingElement';
import { GradientSection } from './ui/GradientSection';
import { ScrollProgress } from './ui/ScrollProgress';

export const DemoSection: React.FC = () => {
  return (
    <>
      {/* Barra de progresso do scroll */}
      <ScrollProgress 
        color="bg-gradient-to-r from-blue-500 to-purple-500"
        showPercentage={true}
        height={3}
      />

      {/* Hero Section com Parallax */}
      <ParallaxSection
        className="min-h-screen flex items-center justify-center relative"
        speed={0.3}
        direction="up"
        backgroundElement={
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        }
        overlay={true}
      >
        <div className="text-center text-white z-30">
          <AnimatedSection animation="zoomIn" delay={0.2}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              BionAI Health
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="slideUp" delay={0.5}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Revolucionando a saúde com inteligência artificial e inovação tecnológica
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fadeIn" delay={0.8}>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                Começar Agora
              </button>
              <button className="px-8 py-3 border border-white/30 hover:bg-white/10 rounded-full font-semibold transition-all duration-300">
                Saiba Mais
              </button>
            </div>
          </AnimatedSection>
        </div>

        {/* Elementos flutuantes */}
        <FloatingElement
          className="absolute top-20 left-20 text-blue-400/30"
          floatType="gentle"
          size="lg"
        >
          <div className="w-full h-full rounded-full bg-blue-400/20 backdrop-blur-sm" />
        </FloatingElement>

        <FloatingElement
          className="absolute bottom-20 right-20 text-purple-400/30"
          floatType="medium"
          size="md"
          delay={2}
        >
          <div className="w-full h-full rounded-full bg-purple-400/20 backdrop-blur-sm" />
        </FloatingElement>
      </ParallaxSection>

      {/* Seção de Recursos */}
      <GradientSection
        className="py-20 px-4"
        gradientType="radial"
        colors={['from-blue-500/10', 'via-purple-500/10', 'to-pink-500/10']}
        animate={true}
        speed={30}
      >
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slideUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Nossos Recursos
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tecnologia de ponta para transformar a experiência em saúde
            </p>
          </AnimatedSection>

          <AnimatedSection animation="stagger" staggerChildren={true} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">IA Avançada</h3>
              <p className="text-gray-300">Algoritmos de machine learning que aprendem e se adaptam continuamente.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Segurança Total</h3>
              <p className="text-gray-300">Proteção de dados com criptografia de ponta e conformidade com LGPD.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Performance</h3>
              <p className="text-gray-300">Resultados rápidos e precisos para diagnósticos em tempo real.</p>
            </div>
          </AnimatedSection>
        </div>
      </GradientSection>

      {/* Seção de Estatísticas */}
      <div className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slideUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Números que Impressionam
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="stagger" staggerChildren={true} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-400">Precisão</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">50K+</div>
              <div className="text-gray-400">Pacientes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-pink-400 mb-2">24/7</div>
              <div className="text-gray-400">Disponibilidade</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">95%</div>
              <div className="text-gray-400">Satisfação</div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Seção de CTA */}
      <ParallaxSection
        className="py-20 px-4 relative"
        speed={0.2}
        direction="up"
        backgroundElement={
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80" />
        }
      >
        <div className="max-w-4xl mx-auto text-center text-white relative z-20">
          <AnimatedSection animation="zoomIn" delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto para o Futuro da Saúde?
            </h2>
          </AnimatedSection>
          
          <AnimatedSection animation="slideUp" delay={0.5}>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de profissionais que já estão transformando a medicina com IA
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fadeIn" delay={0.8}>
            <button className="px-10 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Começar Gratuitamente
            </button>
          </AnimatedSection>
        </div>
      </ParallaxSection>
    </>
  );
};
