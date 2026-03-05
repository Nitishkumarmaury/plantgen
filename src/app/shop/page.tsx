"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/context/ProductsContext";
import ProductCard from "@/components/ui/ProductCard";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import { FadeIn } from "@/components/ui/Animations";
import { OCCASIONS, BUDGET_RANGES } from "@/types";
import type { CareLevel, PlantType } from "@/types";
import { SlidersHorizontal, X } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const { products } = useProducts();

  const [selectedOccasion, setSelectedOccasion] = useState<string>(categoryParam || "All");
  const [selectedBudget, setSelectedBudget] = useState<string>("All");
  const [selectedCare, setSelectedCare] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedOccasion(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedOccasion !== "All" && p.category !== selectedOccasion) return false;
      if (selectedCare !== "All" && p.careLevel !== selectedCare) return false;
      if (selectedType !== "All" && p.plantType !== selectedType) return false;
      if (selectedBudget !== "All") {
        const range = BUDGET_RANGES.find((r) => r.label === selectedBudget);
        if (range && (p.price < range.min || p.price > range.max)) return false;
      }
      return true;
    });
  }, [selectedOccasion, selectedBudget, selectedCare, selectedType, products]);

  const activeFilters = [selectedOccasion, selectedBudget, selectedCare, selectedType].filter(
    (f) => f !== "All"
  ).length;

  const clearFilters = () => {
    setSelectedOccasion("All");
    setSelectedBudget("All");
    setSelectedCare("All");
    setSelectedType("All");
  };

  const careLevels: CareLevel[] = ["Easy", "Medium", "Expert"];
  const plantTypes: PlantType[] = ["Indoor", "Desk", "Premium", "Combo", "XL", "Outdoor"];

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              {selectedOccasion !== "All"
                ? `${selectedOccasion} Plant Gifts`
                : "All Plant Gifts"}
            </h1>
            <p className="mt-2 text-gray-500 max-w-lg">
              Find the perfect plant gift for every occasion. Every plant is delivered
              with love across Chandigarh & Tricity.
            </p>
          </div>
        </FadeIn>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Filters
                </h3>
                {activeFilters > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-green-600 hover:text-green-700 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Occasion Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Occasion</h4>
                <div className="space-y-1.5">
                  {["All", ...OCCASIONS].map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setSelectedOccasion(occ)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedOccasion === occ
                          ? "bg-green-50 text-green-700 font-medium"
                          : "text-gray-600 hover:bg-green-50/60 hover:text-green-700"
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Budget</h4>
                <div className="space-y-1.5">
                  {["All", ...BUDGET_RANGES.map((r) => r.label)].map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBudget(b)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedBudget === b
                          ? "bg-green-50 text-green-700 font-medium"
                          : "text-gray-600 hover:bg-green-50/60 hover:text-green-700"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Care Level Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Care Level</h4>
                <div className="space-y-1.5">
                  {["All", ...careLevels].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCare(c)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCare === c
                          ? "bg-green-50 text-green-700 font-medium"
                          : "text-gray-600 hover:bg-green-50/60 hover:text-green-700"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plant Type Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Type</h4>
                <div className="space-y-1.5">
                  {["All", ...plantTypes].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedType(t)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedType === t
                          ? "bg-green-50 text-green-700 font-medium"
                          : "text-gray-600 hover:bg-green-50/60 hover:text-green-700"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Mobile Filter Bar */}
            <div className="lg:hidden mb-6 flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilters > 0 && (
                  <span className="w-5 h-5 bg-green-600 text-white text-[10px] rounded-full flex items-center justify-center">
                    {activeFilters}
                  </span>
                )}
              </button>
              {activeFilters > 0 && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 text-sm text-green-600 font-medium"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear
                </button>
              )}
            </div>

            {/* Mobile Filters Panel */}
            {showFilters && (
              <div className="lg:hidden mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-gray-600 uppercase mb-2">Occasion</h4>
                  <div className="flex flex-wrap gap-2">
                    {["All", ...OCCASIONS].map((occ) => (
                      <button
                        key={occ}
                        onClick={() => setSelectedOccasion(occ)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          selectedOccasion === occ
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-600 uppercase mb-2">Budget</h4>
                  <div className="flex flex-wrap gap-2">
                    {["All", ...BUDGET_RANGES.map((r) => r.label)].map((b) => (
                      <button
                        key={b}
                        onClick={() => setSelectedBudget(b)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          selectedBudget === b
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-600 uppercase mb-2">Care Level</h4>
                  <div className="flex flex-wrap gap-2">
                    {["All", ...careLevels].map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCare(c)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          selectedCare === c
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-600 uppercase mb-2">Plant Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {["All", ...plantTypes].map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedType(t)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          selectedType === t
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results Count */}
            <p className="text-sm text-gray-500 mb-6">
              Showing {filteredProducts.length} gift{filteredProducts.length !== 1 ? "s" : ""}
            </p>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg mb-2">No gifts found</p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your filters to find the perfect gift
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm text-green-600 font-medium hover:text-green-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-10 bg-gray-100 rounded w-64 mb-4 animate-pulse" />
            <div className="h-5 bg-gray-100 rounded w-96 mb-10 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
