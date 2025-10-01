// import { Search } from "lucide-react";

// interface SearchBarProps {
//   searchQuery: string;
//   onSearchChange: (query: string) => void;
//   priceFilter: string;
//   onPriceChange: (price: string) => void;
//   materialFilter: string;
//   onMaterialChange: (material: string) => void;
// }

// export default function SearchBar({
//   searchQuery,
//   onSearchChange,
//   priceFilter,
//   onPriceChange,
//   materialFilter,
//   onMaterialChange,
// }: SearchBarProps) {
//   return (
//     <section className="container mx-auto px-4 py-8" data-testid="search-section">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-card rounded-lg shadow-lg p-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => onSearchChange(e.target.value)}
//                   placeholder="Search for sarees..."
//                   className="w-full px-4 py-3 pl-12 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
//                   data-testid="input-search"
//                 />
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
//               </div>
//             </div>
            
//             <div className="flex gap-2">
//               <select
//                 value={priceFilter}
//                 onChange={(e) => onPriceChange(e.target.value)}
//                 className="px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring"
//                 data-testid="select-price-filter"
//               >
//                 <option value="">Price Range</option>
//                 <option value="0-5000">₹0 - ₹5,000</option>
//                 <option value="5000-15000">₹5,000 - ₹15,000</option>
//                 <option value="15000-50000">₹15,000 - ₹50,000</option>
//                 <option value="50000+">₹50,000+</option>
//               </select>
              
//               <select
//                 value={materialFilter}
//                 onChange={(e) => onMaterialChange(e.target.value)}
//                 className="px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring"
//                 data-testid="select-material-filter"
//               >
//                 <option value="">Material</option>
//                 <option value="silk">Silk</option>
//                 <option value="cotton">Cotton</option>
//                 <option value="chiffon">Chiffon</option>
//                 <option value="georgette">Georgette</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }








import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  priceFilter: string;
  onPriceChange: (price: string) => void;
  materialFilter: string;
  onMaterialChange: (material: string) => void;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  priceFilter,
  onPriceChange,
  materialFilter,
  onMaterialChange,
}: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <section className="w-full flex justify-center py-8">
      <div className="w-full max-w-2xl">
        {/* Main Search Box */}
        <div className="relative flex items-center bg-white rounded-full shadow-md px-4 py-3 border border-gray-200 focus-within:ring-2 focus-within:ring-pink-400">
          {/* Search Icon */}
          <Search className="text-pink-500 mr-3" size={20} />

          {/* Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for silk sarees, cotton sarees, designer collections..."
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />

          {/* Filter Dropdowns (Desktop) */}
          <div className="hidden md:flex gap-2 ml-3">
            <select
              value={priceFilter}
              onChange={(e) => onPriceChange(e.target.value)}
              className="px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Price</option>
              <option value="0-5000">₹0 - ₹5,000</option>
              <option value="5000-15000">₹5,000 - ₹15,000</option>
              <option value="15000-50000">₹15,000 - ₹50,000</option>
              <option value="50000+">₹50,000+</option>
            </select>

            <select
              value={materialFilter}
              onChange={(e) => onMaterialChange(e.target.value)}
              className="px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Material</option>
              <option value="silk">Silk</option>
              <option value="cotton">Cotton</option>
              <option value="chiffon">Chiffon</option>
              <option value="georgette">Georgette</option>
            </select>
          </div>

          {/* Filter Icon (Mobile) */}
          <button
            onClick={() => setShowFilters(true)}
            className="ml-3 md:hidden text-pink-500"
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* Mobile Filter Panel */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
            <div className="w-64 bg-white h-full shadow-lg p-4 flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Price Filter */}
              <label className="text-sm font-medium mb-1">Price</label>
              <select
                value={priceFilter}
                onChange={(e) => onPriceChange(e.target.value)}
                className="w-full mb-4 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-400"
              >
                <option value="">All</option>
                <option value="0-5000">₹0 - ₹5,000</option>
                <option value="5000-15000">₹5,000 - ₹15,000</option>
                <option value="15000-50000">₹15,000 - ₹50,000</option>
                <option value="50000+">₹50,000+</option>
              </select>

              {/* Material Filter */}
              <label className="text-sm font-medium mb-1">Material</label>
              <select
                value={materialFilter}
                onChange={(e) => onMaterialChange(e.target.value)}
                className="w-full mb-4 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-400"
              >
                <option value="">All</option>
                <option value="silk">Silk</option>
                <option value="cotton">Cotton</option>
                <option value="chiffon">Chiffon</option>
                <option value="georgette">Georgette</option>
              </select>

              {/* Apply Button */}
              <button
                onClick={() => setShowFilters(false)}
                className="mt-auto bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

