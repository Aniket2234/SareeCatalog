// import { useState } from "react";
// import { X, ShoppingCart } from "lucide-react";
// import { type Product } from "@shared/schema";

// interface ProductModalProps {
//   product: Product;
//   onClose: () => void;
// }

// export default function ProductModal({ product, onClose }: ProductModalProps) {
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

//   const handleBackdropClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 modal-backdrop bg-black bg-opacity-50 flex items-center justify-center p-4"
//       onClick={handleBackdropClick}
//       data-testid="product-modal"
//     >
//       <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center p-6 border-b border-border">
//           <h3 className="text-2xl font-serif font-bold text-foreground" data-testid="modal-title">
//             Product Details
//           </h3>
//           <button
//             onClick={onClose}
//             className="text-muted-foreground hover:text-foreground"
//             data-testid="button-close-modal"
//           >
//             <X size={24} />
//           </button>
//         </div>
        
//         <div className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <div className="aspect-square rounded-lg overflow-hidden mb-4" data-testid="modal-main-image">
//                 <img
//                   src={product.images[selectedImageIndex]}
//                   alt={product.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
              
//               {product.images.length > 1 && (
//                 <div className="flex gap-2 overflow-x-auto" data-testid="modal-image-thumbnails">
//                   {product.images.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setSelectedImageIndex(index)}
//                       className={`w-16 h-16 rounded overflow-hidden flex-shrink-0 ${
//                         index === selectedImageIndex ? "ring-2 ring-primary" : ""
//                       }`}
//                       data-testid={`modal-thumbnail-${index}`}
//                     >
//                       <img
//                         src={image}
//                         alt={`${product.name} thumbnail ${index + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <h4 className="text-2xl font-serif font-bold text-foreground mb-2" data-testid="modal-product-name">
//                   {product.name}
//                 </h4>
//                 <p className="text-3xl font-bold text-primary" data-testid="modal-product-price">
//                   ₹{product.price.toLocaleString()}
//                 </p>
//               </div>
              
//               <div>
//                 <h5 className="font-semibold text-foreground mb-2">Description</h5>
//                 <p className="text-muted-foreground" data-testid="modal-product-description">
//                   {product.description}
//                 </p>
//               </div>
              
//               <div>
//                 <h5 className="font-semibold text-foreground mb-2">Material</h5>
//                 <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm" data-testid="modal-product-material">
//                   {product.material}
//                 </span>
//               </div>
              
//               <div>
//                 <h5 className="font-semibold text-foreground mb-2">Available Colors</h5>
//                 <div className="flex flex-wrap gap-2" data-testid="modal-product-colors">
//                   {product.colors.map((color, index) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
//                       data-testid={`modal-color-${index}`}
//                     >
//                       {color}
//                     </span>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="pt-4">
//                 <button
//                   className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
//                   data-testid="button-add-to-cart"
//                 >
//                   <ShoppingCart size={20} />
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { X } from "lucide-react";
import { type Product } from "@shared/schema";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      data-testid="product-modal"
    >
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-border">
          <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground" data-testid="modal-title">
            Product Details
          </h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1"
            data-testid="button-close-modal"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Image Section */}
            <div>
              <div className="aspect-square rounded-lg overflow-hidden mb-4" data-testid="modal-main-image">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2" data-testid="modal-image-thumbnails">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-16 rounded overflow-hidden flex-shrink-0 ${
                        index === selectedImageIndex ? "ring-2 ring-primary" : ""
                      }`}
                      data-testid={`modal-thumbnail-${index}`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Details Section */}
            <div className="space-y-4 md:space-y-6">
              {/* Product Name and Price */}
              <div>
                <h4 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-2" data-testid="modal-product-name">
                  {product.name}
                </h4>
                <p className="text-2xl md:text-3xl font-bold text-primary" data-testid="modal-product-price">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>
              
              {/* Description */}
              <div>
                <h5 className="font-semibold text-foreground mb-2">Description</h5>
                <p className="text-muted-foreground leading-relaxed" data-testid="modal-product-description">
                  {product.description}
                </p>
              </div>
              
              {/* Material */}
              <div>
                <h5 className="font-semibold text-foreground mb-2">Material</h5>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm" data-testid="modal-product-material">
                  {product.material}
                </span>
              </div>
              
              {/* Available Colors */}
              <div>
                <h5 className="font-semibold text-foreground mb-2">Available Colors</h5>
                <div className="flex flex-wrap gap-2" data-testid="modal-product-colors">
                  {product.colors.map((color, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                      data-testid={`modal-color-${index}`}
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}