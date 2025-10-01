import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Welcome() {
  const [, setLocation] = useLocation();
  const [isExiting, setIsExiting] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleExplore = () => {
    setIsExiting(true);
    setTimeout(() => {
      setLocation("/home");
    }, 500);
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Video Background */}
      {!videoError && (
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/Videos/Welcome.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Pastel Gradient Fallback */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 transition-opacity duration-500 ${
          videoLoaded && !videoError ? "opacity-0" : "opacity-100"
        }`}
      />
      
      {/* Soft Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-pink-900/20" />
      
      {/* Content */}
      <div className="relative text-center text-white" data-testid="welcome-content">
        <div className="animate-float-slow">
          <h1 
            className="font-serif text-6xl md:text-8xl font-bold mb-6 drop-shadow-2xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 bg-clip-text text-transparent animate-shimmer bg-size-200"
            style={{
              animation: 'fadeInUp 1.5s ease-out forwards, shimmer 3s ease-in-out infinite'
            }}
            data-testid="welcome-title"
          >
            Elegant Sarees
          </h1>
        </div>
        
        <div className="animate-float-medium delay-300">
          <p 
            className="text-xl md:text-2xl mb-12 opacity-90 drop-shadow-lg text-purple-100 font-light tracking-wide"
            style={{
              animation: 'fadeInUp 1.8s ease-out 0.3s forwards, breathe 4s ease-in-out infinite'
            }}
            data-testid="welcome-subtitle"
          >
            Discover Traditional Beauty
          </p>
        </div>
        
        <div 
          className="animate-float-fast delay-600"
          style={{
            animation: 'fadeInUp 2s ease-out 0.6s forwards, pulse-gentle 3s ease-in-out infinite'
          }}
        >
          <button
            onClick={handleExplore}
            className="group bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 text-purple-800 px-10 py-5 rounded-full font-semibold text-lg transition-all duration-500 shadow-2xl hover:shadow-pink-200/50 hover:scale-105 transform hover:-translate-y-1 border border-white/20 backdrop-blur-sm"
            data-testid="button-explore"
          >
            <span className="flex items-center justify-center">
              Explore Our Catalog 
              <ArrowRight className="ml-3 inline-block group-hover:translate-x-2 transition-transform duration-300" size={22} />
            </span>
          </button>
        </div>
      </div>
      
      {/* Custom Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.02);
            opacity: 1;
          }
        }
        
        @keyframes pulse-gentle {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes float-medium {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        
        @keyframes float-fast {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
}