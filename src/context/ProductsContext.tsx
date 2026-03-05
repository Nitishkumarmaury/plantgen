"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Product } from "@/types";
import { products as staticProducts } from "@/data/products";
import { subscribeToProducts } from "@/lib/productService";

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getFeaturedProducts: () => Product[];
  getBestSellers: () => Product[];
  getNewArrivals: () => Product[];
  getPriceDropProducts: () => Product[];
  searchProducts: (q: string) => Product[];
  getDiscountPercentage: (product: Product) => number;
}

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  loading: true,
  getProductById: () => undefined,
  getProductsByCategory: () => [],
  getFeaturedProducts: () => [],
  getBestSellers: () => [],
  getNewArrivals: () => [],
  getPriceDropProducts: () => [],
  searchProducts: () => [],
  getDiscountPercentage: () => 0,
});

export const useProducts = () => useContext(ProductsContext);

export default function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((firestoreProducts) => {
      if (firestoreProducts.length > 0) {
        setProducts(firestoreProducts);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const getProductById = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products]
  );

  const getProductsByCategory = useCallback(
    (category: string) => products.filter((p) => p.category === category),
    [products]
  );

  const getFeaturedProducts = useCallback(
    () => products.filter((p) => p.featured),
    [products]
  );

  const getBestSellers = useCallback(
    () => products.filter((p) => p.bestSeller),
    [products]
  );

  const getNewArrivals = useCallback(
    () => products.filter((p) => p.newArrival),
    [products]
  );

  const getPriceDropProducts = useCallback(
    () => products.filter((p) => p.priceDrop),
    [products]
  );

  const searchProducts = useCallback(
    (q: string) => {
      const lower = q.toLowerCase();
      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.shortDescription.toLowerCase().includes(lower) ||
          p.tags.some((t) => t.includes(lower)) ||
          p.category.toLowerCase().includes(lower)
      );
    },
    [products]
  );

  const getDiscountPercentage = useCallback((product: Product) => {
    if (!product.originalPrice) return 0;
    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        getProductById,
        getProductsByCategory,
        getFeaturedProducts,
        getBestSellers,
        getNewArrivals,
        getPriceDropProducts,
        searchProducts,
        getDiscountPercentage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
