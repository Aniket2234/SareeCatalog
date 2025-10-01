import { Skeleton } from "@/components/ui/skeleton";
import { type Category } from "@shared/schema";
import { useState, useRef } from "react";

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  isLoading: boolean;
}

export default function CategoryNav({
  categories,
  selectedCategory,
  onCategoryChange,
  isLoading,
}: CategoryNavProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  if (isLoading) {
    return (
      <section
        className="container mx-auto px-4 py-2"
        data-testid="category-nav-loading"
      >
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex space-x-8 pb-1 sm:pb-2 pt-0 sm:pt-1"
              style={{ minHeight: "220px" }}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-36 h-36 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-full flex-shrink-0"
                />
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
              <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 h-1 rounded-full w-0 shadow-sm" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="categories"
      className="container mx-auto px-4 py-2"
      data-testid="category-nav"
    >
      <div className="relative">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex space-x-6 overflow-x-auto scrollbar-hide pb-1 sm:pb-2 pt-0 sm:pt-1 scroll-smooth items-center select-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            minHeight: "220px",
            cursor: "grab",
          }}
        >
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => onCategoryChange(category.slug)}
              className="flex-shrink-0 transition-transform duration-300 hover:scale-110 flex items-center justify-center"
              data-testid={`category-btn-${category.slug}`}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className={`object-contain cursor-pointer transition-all duration-300 
                  w-36 h-36 sm:w-52 sm:h-52 md:w-56 md:h-56
                  ${
                    selectedCategory === category.slug
                      ? "transform scale-125"
                      : ""
                  }`}
              />
            </button>
          ))}
        </div>

        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
          <div
            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 h-1 rounded-full transition-all duration-300 ease-out shadow-sm"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
