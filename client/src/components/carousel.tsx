// import { useState, useEffect } from "react";

// const bannerImages = [
//   {
//     url: "/images/Carosal1.png",
//     alt: "Modern silk sarees displayed on elegant mannequins",
//   },
//   {
//     url: "/images/Carosal2.png",
//     alt: "Traditional Indian textile workshop with colorful fabrics",
//   },
//   {
//     url: "/images/Carosal3.png",
//     alt: "Artistic display of colorful Indian textile patterns and designs",
//   },
//   {
//     url: "/images/Carosal4.png",
//     alt: "Elegant Indian woman in traditional gold-embroidered saree",
//   },
//   {
//     url: "/images/Carosal5.png",
//     alt: "Vibrant Indian wedding celebration with traditional attire",
//   },
// ];

// export default function Carousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     if (isPaused) return;

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [isPaused]);

//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//   };

//   return (
//     <section 
//       className="relative overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px]"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//       data-testid="carousel-section"
//     >
//       <div 
//         className="flex transition-transform duration-500 h-full"
//         style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//         data-testid="carousel-container"
//       >
//         {bannerImages.map((image, index) => (
//           <div
//             key={index}
//             className="w-full flex-shrink-0 h-full relative"
//             data-testid={`carousel-slide-${index}`}
//           >
//             <img
//               src={image.url}
//               alt={image.alt}
//               className="w-full h-full object-fill"
//               loading={index === 0 ? "eager" : "lazy"}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Carousel Indicators */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2" data-testid="carousel-indicators">
//         {bannerImages.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               index === currentSlide
//                 ? "bg-white bg-opacity-100"
//                 : "bg-white bg-opacity-50"
//             }`}
//             data-testid={`carousel-indicator-${index}`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }








import { useState, useEffect } from "react";

const bannerImages = [
  {
    url: "/images/Carosal1.png",
    alt: "Modern silk sarees displayed on elegant mannequins",
  },
  {
    url: "/images/Carosal2.png",
    alt: "Traditional Indian textile workshop with colorful fabrics",
  },
  {
    url: "/images/Carosal3.png",
    alt: "Artistic display of colorful Indian textile patterns and designs",
  },
  {
    url: "/images/Carosal4.png",
    alt: "Elegant Indian woman in traditional gold-embroidered saree",
  },
  {
    url: "/images/Carosal5.png",
    alt: "Vibrant Indian wedding celebration with traditional attire",
  },
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="relative overflow-hidden h-50 sm:h-64 md:h-80 lg:h-[500px] xl:h-[600px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      data-testid="carousel-section"
    >
      <div
        className="flex transition-transform duration-500 h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        data-testid="carousel-container"
      >
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 h-full relative"
            data-testid={`carousel-slide-${index}`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-fill"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      <div
        className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
        data-testid="carousel-indicators"
      >
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white bg-opacity-100"
                : "bg-white bg-opacity-50"
            }`}
            data-testid={`carousel-indicator-${index}`}
          />
        ))}
      </div>
    </section>
  );
}
