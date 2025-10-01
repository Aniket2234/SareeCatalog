import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Carousel from "@/components/carousel";
import SearchBar from "@/components/search-bar";
import CategoryNav from "@/components/category-nav";
import ProductGrid from "@/components/product-grid";
import ProductModal from "@/components/product-modal";
import { type Product, type Category } from "@shared/schema";

export default function Home() {
  const [location, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Read category from URL parameters and handle smooth scrolling
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get("category");
    const hash = window.location.hash;
    
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      // Reset to "all" if no category in URL
      setSelectedCategory("all");
    }
    
    // Smooth scroll to categories section if hash indicates
    if (hash === '#categories') {
      setTimeout(() => {
        const el = document.getElementById('categories');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200); // Delay to ensure components are rendered
    }
  }, [location]);

  // Also listen to URL changes via window location
  useEffect(() => {
    const handleLocationChange = () => {
      const params = new URLSearchParams(window.location.search);
      const categoryFromUrl = params.get("category");
      const hash = window.location.hash;
      
      if (categoryFromUrl) {
        setSelectedCategory(categoryFromUrl);
      } else {
        setSelectedCategory("all");
      }
      
      if (hash === '#categories') {
        setTimeout(() => {
          const el = document.getElementById('categories');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 200);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [materialFilter, setMaterialFilter] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.append("search", searchQuery);
    if (selectedCategory !== "all") params.append("category", selectedCategory);
    if (materialFilter) params.append("material", materialFilter);
    
    if (priceFilter) {
      const [min, max] = priceFilter.split("-");
      if (min) params.append("priceMin", min);
      if (max && max !== "+") params.append("priceMax", max);
    }
    
    return params.toString();
  };

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", buildQueryParams()],
    queryFn: async () => {
      const response = await fetch(`/api/products?${buildQueryParams()}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
  });

  return (
    <div className="min-h-screen bg-background" data-testid="home-page">
      <Header />
      
      <main className="animate-fade-in">
        <Carousel />
        
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          priceFilter={priceFilter}
          onPriceChange={setPriceFilter}
          materialFilter={materialFilter}
          onMaterialChange={setMaterialFilter}
        />
        
        <CategoryNav
          categories={categories || []}
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => {
            setSelectedCategory(category);
            // Update URL to reflect category selection for deep linking
            const url = category === "all" ? "/home#categories" : `/home?category=${category}#categories`;
            setLocation(url);
          }}
          isLoading={categoriesLoading}
        />
        
        <ProductGrid
          products={products || []}
          isLoading={productsLoading}
          onProductClick={setSelectedProduct}
        />
      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
