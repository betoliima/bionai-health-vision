import { useEffect, useRef } from "react";

const VideoHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  return (
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
  );
};

export default VideoHero;