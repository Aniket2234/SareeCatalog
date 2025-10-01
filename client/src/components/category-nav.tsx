// import { Skeleton } from "@/components/ui/skeleton";
// import { type Category } from "@shared/schema";
// import { useState, useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface CategoryNavProps {
//   categories: Category[];
//   selectedCategory: string;
//   onCategoryChange: (category: string) => void;
//   isLoading: boolean;
// }

// export default function CategoryNav({
//   categories,
//   selectedCategory,
//   onCategoryChange,
//   isLoading,
// }: CategoryNavProps) {
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);

//   const scrollLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
//     }
//   };

//   const scrollRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
//     }
//   };

//   const handleScroll = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       setCanScrollLeft(scrollLeft > 0);
//       setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
//     }
//   };

//   if (isLoading) {
//     return (
//       <section className="container mx-auto px-4 py-6" data-testid="category-nav-loading">
//         <div className="relative">
//           <div className="overflow-hidden">
//             <div className="flex space-x-8 pb-2">
//               {Array.from({ length: 4 }).map((_, index) => (
//                 <Skeleton key={index} className="w-20 h-20 rounded-full flex-shrink-0" />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="container mx-auto px-4 py-6" data-testid="category-nav">
//       <div className="relative group">
//         {/* Left Scroll Button */}
//         {canScrollLeft && (
//           <button
//             onClick={scrollLeft}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
//             aria-label="Scroll left"
//           >
//             <ChevronLeft className="h-5 w-5 text-gray-600" />
//           </button>
//         )}

//         {/* Right Scroll Button */}
//         {canScrollRight && (
//           <button
//             onClick={scrollRight}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
//             aria-label="Scroll right"
//           >
//             <ChevronRight className="h-5 w-5 text-gray-600" />
//           </button>
//         )}

//         {/* Scrollable Container */}
//         <div
//           ref={scrollContainerRef}
//           onScroll={handleScroll}
//           className="flex space-x-16 overflow-x-auto scrollbar-hide pb-2 scroll-smooth items-center"
//           style={{ 
//             scrollbarWidth: 'none',
//             msOverflowStyle: 'none'
//           }}
//         >
//           {/* All Sarees Icon */}
//           <button
//             onClick={() => onCategoryChange("all")}
//             className="flex-shrink-0 transition-transform duration-300 hover:scale-110"
//             data-testid="category-btn-all"
//           >
//             <span 
//               className={`cursor-pointer transition-all duration-300 ${
//                 selectedCategory === "all" ? "transform scale-125" : ""
//               }`}
//               style={{ fontSize: '16rem' }}
//             >
//               ⭐
//             </span>
//           </button>

//           {/* Category SVG Icons */}
//           {categories.map((category) => (
//             <button
//               key={category._id}
//               onClick={() => onCategoryChange(category.slug)}
//               className="flex-shrink-0 transition-transform duration-300 hover:scale-110"
//               data-testid={`category-btn-${category.slug}`}
//             >
//               <img
//                 src={category.imageUrl}
//                 alt={category.name}
//                 className={`object-contain cursor-pointer transition-all duration-300 ${
//                   selectedCategory === category.slug ? "transform scale-125" : ""
//                 }`}
//                 style={{ width: '16rem', height: '16rem' }}
//               />
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Custom scrollbar styles */}
//       <style>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </section>
//   );
// }



// import { Skeleton } from "@/components/ui/skeleton";
// import { type Category } from "@shared/schema";
// import { useState, useRef } from "react";

// interface CategoryNavProps {
//   categories: Category[];
//   selectedCategory: string;
//   onCategoryChange: (category: string) => void;
//   isLoading: boolean;
// }

// export default function CategoryNav({
//   categories,
//   selectedCategory,
//   onCategoryChange,
//   isLoading,
// }: CategoryNavProps) {
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);

//   const handleScroll = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       const maxScroll = scrollWidth - clientWidth;
//       const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
//       setScrollProgress(progress);
//     }
//   };

//   const handleMouseDown = (e: React.MouseEvent) => {
//     setIsDragging(true);
//     setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
//     setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.style.cursor = 'grabbing';
//     }
//   };

//   const handleMouseLeave = () => {
//     setIsDragging(false);
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.style.cursor = 'grab';
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.style.cursor = 'grab';
//     }
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging || !scrollContainerRef.current) return;
//     e.preventDefault();
//     const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
//     const walk = (x - startX) * 2;
//     scrollContainerRef.current.scrollLeft = scrollLeft - walk;
//   };

//   if (isLoading) {
//     return (
//       <section className="container mx-auto px-4 py-6" data-testid="category-nav-loading">
//         <div className="relative">
//           <div className="overflow-hidden">
//             <div className="flex space-x-8 pb-8 pt-6" style={{ minHeight: '280px' }}>
//               {Array.from({ length: 6 }).map((_, index) => (
//                 <Skeleton key={index} className="w-48 h-48 rounded-full flex-shrink-0" />
//               ))}
//             </div>
//             {/* Loading Progress Bar */}
//             <div className="w-full bg-gray-200 rounded-full h-1 mt-4">
//               <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 h-1 rounded-full w-0 shadow-sm" />
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id="categories" className="container mx-auto px-4 py-6" data-testid="category-nav">
//       <div className="relative">
//         {/* Scrollable Container */}
//         <div
//           ref={scrollContainerRef}
//           onScroll={handleScroll}
//           onMouseDown={handleMouseDown}
//           onMouseLeave={handleMouseLeave}
//           onMouseUp={handleMouseUp}
//           onMouseMove={handleMouseMove}
//           className="flex space-x-8 overflow-x-auto scrollbar-hide pb-8 pt-6 scroll-smooth items-center select-none"
//           style={{ 
//             scrollbarWidth: 'none',
//             msOverflowStyle: 'none',
//             minHeight: '280px',
//             cursor: 'grab'
//           }}
//         >
//           {/* Category SVG Icons */}
//           {categories.map((category) => (
//             <button
//               key={category._id}
//               onClick={() => onCategoryChange(category.slug)}
//               className="flex-shrink-0 transition-transform duration-300 hover:scale-110 flex items-center justify-center"
//               data-testid={`category-btn-${category.slug}`}
//               style={{ minHeight: '240px', minWidth: '240px' }}
//               onMouseDown={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={category.imageUrl}
//                 alt={category.name}
//                 className={`object-contain cursor-pointer transition-all duration-300 ${
//                   selectedCategory === category.slug ? "transform scale-125" : ""
//                 }`}
//                 style={{ 
//                   width: '190px', 
//                   height: '190px',
//                   maxWidth: '190px',
//                   maxHeight: '190px'
//                 }}
//               />
//             </button>
//           ))}
//         </div>

//         {/* Progress Bar */}
//         <div className="w-full bg-gray-200 rounded-full h-1 mt-4">
//           <div
//             className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 h-1 rounded-full transition-all duration-300 ease-out shadow-sm"
//             style={{ width: `${scrollProgress}%` }}
//           />
//         </div>
//       </div>

//       {/* Custom scrollbar styles */}
//       <style>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </section>
//   );
// }














// import { Skeleton } from "@/components/ui/skeleton";
// import { type Category } from "@shared/schema";
// import { useState, useRef } from "react";

// interface CategoryNavProps {
//   categories: Category[];
//   selectedCategory: string;
//   onCategoryChange: (category: string) => void;
//   isLoading: boolean;
// }

// export default function CategoryNav({
//   categories,
//   selectedCategory,
//   onCategoryChange,
//   isLoading,
// }: CategoryNavProps) {
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);

//   const handleScroll = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       const maxScroll = scrollWidth - clientWidth;
//       const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
//       setScrollProgress(progress);
//     }
//   };

//   const handleMouseDown = (e: React.MouseEvent) => {
//     setIsDragging(true);
//     setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
//     setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.style.cursor = "grabbing";
//     }
//   };

//   const handleMouseLeave = () => {
//     setIsDragging(false);
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.style.cursor = "grab";
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.style.cursor = "grab";
//     }
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging || !scrollContainerRef.current) return;
//     e.preventDefault();
//     const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
//     const walk = (x - startX) * 2;
//     scrollContainerRef.current.scrollLeft = scrollLeft - walk;
//   };

//   if (isLoading) {
//     return (
//       <section
//         className="container mx-auto px-4 py-2"
//         data-testid="category-nav-loading"
//       >
//         <div className="relative">
//           <div className="overflow-hidden">
//             <div
//               className="flex space-x-8 pb-1 sm:pb-2 pt-0 sm:pt-1"
//               style={{ minHeight: "220px" }}
//             >
//               {Array.from({ length: 6 }).map((_, index) => (
//                 <Skeleton
//                   key={index}
//                   className="w-36 h-36 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-full flex-shrink-0"
//                 />
//               ))}
//             </div>
//             {/* Loading Progress Bar */}
//             <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
//               <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 h-1 rounded-full w-0 shadow-sm" />
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section
//       id="categories"
//       className="container mx-auto px-4 py-2"
//       data-testid="category-nav"
//     >
//       <div className="relative">
//         {/* Scrollable Container */}
//         <div
//           ref={scrollContainerRef}
//           onScroll={handleScroll}
//           onMouseDown={handleMouseDown}
//           onMouseLeave={handleMouseLeave}
//           onMouseUp={handleMouseUp}
//           onMouseMove={handleMouseMove}
//           className="flex space-x-6 overflow-x-auto scrollbar-hide pb-1 sm:pb-2 pt-0 sm:pt-1 scroll-smooth items-center select-none"
//           style={{
//             scrollbarWidth: "none",
//             msOverflowStyle: "none",
//             minHeight: "220px",
//             cursor: "grab",
//           }}
//         >
//           {/* Category SVG Icons */}
//           {categories.map((category) => (
//             <button
//               key={category._id}
//               onClick={() => onCategoryChange(category.slug)}
//               className="flex-shrink-0 transition-transform duration-300 hover:scale-110 flex items-center justify-center"
//               data-testid={`category-btn-${category.slug}`}
//               onMouseDown={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={category.imageUrl}
//                 alt={category.name}
//                 className={`object-contain cursor-pointer transition-all duration-300 
//                   w-36 h-36 sm:w-52 sm:h-52 md:w-56 md:h-56
//                   ${
//                     selectedCategory === category.slug
//                       ? "transform scale-125"
//                       : ""
//                   }`}
//               />
//             </button>
//           ))}
//         </div>

//         {/* Progress Bar */}
//         <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
//           <div
//             className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 h-1 rounded-full transition-all duration-300 ease-out shadow-sm"
//             style={{ width: `${scrollProgress}%` }}
//           />
//         </div>
//       </div>

//       {/* Custom scrollbar styles */}
//       <style>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </section>
//   );
// }






import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft, Facebook, Instagram, Twitter } from "lucide-react";
import { useLocation } from "wouter";
import { type Category } from "@shared/schema";

interface HeaderProps {
  categories: Category[]; // pass categories here
}

export default function Header({ categories }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [, setLocation] = useLocation();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCategoryClick = (slug: string) => {
    setIsMobileMenuOpen(false);
    // ✅ Append #categories to URL
    setLocation(`/home?category=${slug}#categories`);
    document.body.style.overflow = "unset";
  };

  const toggleMobileMenu = () => {
    if (isMobile) {
      if (!isMobileMenuOpen) {
        setIsMobileMenuOpen(true);
        setTimeout(() => setIsAnimating(true), 10);
        document.body.style.overflow = "hidden";
      } else {
        setIsAnimating(false);
        setTimeout(() => {
          setIsMobileMenuOpen(false);
          document.body.style.overflow = "unset";
        }, 500);
      }
    }
  };

  const handleBackClick = () => {
    setLocation("/");
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleMobileMenu();
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40" data-testid="header">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
          data-testid="button-back"
        >
          <ArrowLeft size={24} className="text-gray-800" />
        </button>

        {/* Centered Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none md:left-auto">
          <h1 className="font-serif text-2xl font-bold text-purple-800" data-testid="text-logo">
            Elegant Sarees
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryClick(cat.slug)}
              className="text-gray-700 hover:text-purple-700 transition-colors font-medium"
            >
              {cat.name}
            </button>
          ))}
        </nav>

        {/* Hamburger Menu */}
        <button
          onClick={toggleMobileMenu}
          className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
          data-testid="button-hamburger"
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-gray-800" />
          ) : (
            <Menu size={24} className="text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {(isMobileMenuOpen || isAnimating) && isMobile && (
        <div
          className={`fixed inset-0 z-[60] bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-in-out ${
            isAnimating ? "translate-x-0 opacity-100" : "-translate-x-full opacity-100"
          }`}
          style={{ backgroundImage: "url('/images/image.png')" }}
          data-testid="nav-menu"
          onClick={handleBackdropClick}
        >
          <div className="relative z-[70] h-full overflow-y-auto">
            <div className="sticky top-0 bg-transparent">
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <button
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-center p-2 rounded-lg hover:bg-black/10 transition-all duration-200"
                >
                  <X size={24} className="text-black" />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="container mx-auto px-6 py-8 space-y-8">
              <div
                className="mb-6 transform transition-all duration-500 ease-out delay-200"
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transform: isAnimating ? "translateX(0)" : "translateX(-20px)",
                }}
              >
                <h2 className="text-xl font-bold text-black mb-4">Categories</h2>
                <div className="grid grid-cols-2 gap-3 px-1">
                  {categories.map((cat) => (
                    <button
                      key={cat._id}
                      onClick={() => handleCategoryClick(cat.slug)}
                      className="flex items-center justify-center p-3 text-black hover:bg-black/5 rounded-xl transition-all duration-300 border border-black/20 hover:border-black/40 hover:scale-105 text-center"
                    >
                      <span className="font-medium text-sm">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Shop Info */}
              <div
                className="border-t border-black/20 pt-6 transform transition-all duration-500 ease-out delay-300"
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transform: isAnimating ? "translateX(0)" : "translateX(-20px)",
                }}
              >
                <h3 className="text-xl font-bold text-black mb-4">Shop Information</h3>
                <div className="space-y-4">
                  <div className="text-sm p-4 rounded-xl border border-black/20 hover:bg-black/5 transition-all duration-300 hover:scale-105">
                    <h4 className="font-bold text-black mb-2">Elegant Sarees Collection</h4>
                    <p className="text-black leading-relaxed">
                      Shop no 45A, Fashion Plaza, MG Road, Commercial Street,
                      Bangalore, Karnataka 560001
                    </p>
                  </div>
                  <div className="text-sm p-4 rounded-xl border border-black/20 hover:bg-black/5 transition-all duration-300 hover:scale-105">
                    <h4 className="font-bold text-black mb-2">09876543210</h4>
                    <p className="text-black">For inquiries & orders</p>
                  </div>
                  <div className="text-sm p-4 rounded-xl border border-black/20 hover:bg-black/5 transition-all duration-300 hover:scale-105">
                    <h4 className="font-bold text-black mb-2">10:00 AM - 9:00 PM</h4>
                    <p className="text-black">Open all days</p>
                  </div>

                  {/* Social Media */}
                  <div className="text-sm p-4 rounded-xl border border-black/20 hover:bg-black/5 transition-all duration-300 hover:scale-105">
                    <h4 className="font-bold text-black mb-3">@elegantsareescollection</h4>
                    <p className="text-black mb-4">Follow us for updates</p>
                    <div className="flex space-x-4">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-300"
                      >
                        <Facebook size={20} className="text-white" />
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 hover:scale-110 transition-all duration-300"
                      >
                        <Instagram size={20} className="text-white" />
                      </a>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 hover:scale-110 transition-all duration-300"
                      >
                        <Twitter size={20} className="text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
