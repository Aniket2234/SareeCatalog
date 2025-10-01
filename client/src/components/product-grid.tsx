import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { type Product } from "@shared/schema";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onProductClick: (product: Product) => void;
}

export default function ProductGrid({ products, isLoading, onProductClick }: ProductGridProps) {
  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-8" data-testid="product-grid-loading">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <Skeleton className="aspect-[4/5] rounded-lg mb-2 md:mb-4" />
              <Skeleton className="h-3 md:h-4 rounded w-3/4 mb-1 md:mb-2" />
              <Skeleton className="h-3 md:h-4 rounded w-1/2" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="container mx-auto px-4 py-8" data-testid="product-grid-empty">
        <div className="col-span-full text-center py-12">
          <Search className="mx-auto text-4xl text-muted-foreground mb-4" size={64} />
          <p className="text-lg text-muted-foreground" data-testid="text-no-products">
            No products found matching your criteria.
          </p>
        </div>
      </section>
    );
  }

  // Filter out any invalid products and add safety checks
  const validProducts = products.filter(product => 
    product && 
    product._id && 
    product.images && 
    Array.isArray(product.images) && 
    product.images.length > 0
  );

  return (
    <section className="container mx-auto px-4 py-8" data-testid="product-grid">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {validProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => onProductClick(product)}
            className="product-card bg-card rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
            data-testid={`product-card-${product._id}`}
          >
            <div
              className="aspect-[4/5] bg-cover bg-center bg-gray-200"
              style={{ 
                backgroundImage: product.images?.[0] ? `url('${product.images[0]}')` : 'none'
              }}
              data-testid={`product-image-${product._id}`}
            >
              {/* Fallback content when no image is available */}
              {!product.images?.[0] && (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}
            </div>
            
            <div className="p-2 md:p-4">
              <h3 className="font-serif text-sm md:text-lg font-semibold text-foreground mb-1 md:mb-2 line-clamp-2" data-testid={`product-name-${product._id}`}>
                {product.name || 'Unnamed Product'}
              </h3>
              
              {/* Hide description on mobile, show on larger screens */}
              <p className="hidden md:block text-muted-foreground text-sm mb-3" data-testid={`product-description-${product._id}`}>
                {product.description || 'No description available'}
              </p>
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0">
                <span className="text-lg md:text-xl font-bold text-primary" data-testid={`product-price-${product._id}`}>
                  ₹{(product.price || 0).toLocaleString()}
                </span>
                
                {/* Hide material badge on mobile, show on larger screens */}
                <span className="hidden md:inline text-sm px-2 py-1 bg-secondary text-secondary-foreground rounded-full" data-testid={`product-material-${product._id}`}>
                  {product.material || 'Unknown'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}