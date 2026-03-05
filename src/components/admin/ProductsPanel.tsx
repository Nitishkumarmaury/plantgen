"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  subscribeToProducts,
  createProduct,
  updateProductInDB,
  removeProduct,
  syncStaticProducts,
} from "@/lib/productService";
import { uploadProductImage } from "@/lib/storageService";
import { products as staticProducts } from "@/data/products";
import { Product, OccasionCategory, PlantType, CareLevel, OCCASIONS } from "@/types";
import Image from "next/image";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  RefreshCw,
  Upload,
  Save,
  AlertTriangle,
  Package,
  ChevronDown,
  ImageIcon,
  Link as LinkIcon,
} from "lucide-react";

const PLANT_TYPES: PlantType[] = ["Indoor", "Desk", "Premium", "Combo", "XL", "Outdoor"];
const CARE_LEVELS: CareLevel[] = ["Easy", "Medium", "Expert"];

const EMPTY_PRODUCT: Omit<Product, "id"> = {
  name: "",
  sku: "",
  price: 0,
  originalPrice: undefined,
  stock: 10,
  category: "Birthday",
  plantType: "Indoor",
  shortDescription: "",
  fullDescription: "",
  careLevel: "Easy",
  deliveryAvailability: "Chandigarh & Tricity",
  codAvailable: true,
  imageUrl: "",
  imageUrl2: "",
  pexelsSearchQuery: "",
  tags: [],
  badges: [],
  rating: 4.5,
  reviewCount: 0,
  featured: false,
  bestSeller: false,
  newArrival: false,
  priceDrop: false,
};

export default function ProductsPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState(EMPTY_PRODUCT);
  const [formId, setFormId] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Sync state
  const [syncing, setSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);

  // Image upload state
  const [uploadingImage1, setUploadingImage1] = useState(false);
  const [uploadingImage2, setUploadingImage2] = useState(false);
  const [uploadProgress1, setUploadProgress1] = useState(0);
  const [uploadProgress2, setUploadProgress2] = useState(0);
  const [imageMode1, setImageMode1] = useState<"upload" | "url">("upload");
  const [imageMode2, setImageMode2] = useState<"upload" | "url">("upload");
  const fileInput1Ref = useRef<HTMLInputElement>(null);
  const fileInput2Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Filtered products
  const filtered = products.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Open add form
  const openAddForm = useCallback(() => {
    setEditingProduct(null);
    setFormData(EMPTY_PRODUCT);
    setFormId("");
    setFormError("");
    setShowForm(true);
  }, []);

  // Open edit form
  const openEditForm = useCallback((product: Product) => {
    setEditingProduct(product);
    setFormId(product.id);
    setFormData({
      name: product.name,
      sku: product.sku,
      price: product.price,
      originalPrice: product.originalPrice,
      stock: product.stock,
      category: product.category,
      plantType: product.plantType,
      shortDescription: product.shortDescription,
      fullDescription: product.fullDescription,
      careLevel: product.careLevel,
      deliveryAvailability: product.deliveryAvailability,
      codAvailable: product.codAvailable,
      imageUrl: product.imageUrl,
      imageUrl2: product.imageUrl2 || "",
      pexelsSearchQuery: product.pexelsSearchQuery || "",
      tags: product.tags,
      badges: product.badges,
      rating: product.rating,
      reviewCount: product.reviewCount,
      featured: product.featured,
      bestSeller: product.bestSeller,
      newArrival: product.newArrival,
      priceDrop: product.priceDrop,
    });
    setFormError("");
    setShowForm(true);
  }, []);

  // Save product (add or edit)
  const handleSave = async () => {
    if (!formData.name.trim()) {
      setFormError("Product name is required");
      return;
    }
    if (!formData.imageUrl.trim()) {
      setFormError("Image URL is required");
      return;
    }
    if (formData.price <= 0) {
      setFormError("Price must be greater than 0");
      return;
    }

    const id = editingProduct
      ? editingProduct.id
      : formId.trim() ||
        formData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

    // Check ID uniqueness for new products
    if (!editingProduct && products.some((p) => p.id === id)) {
      setFormError(`Product ID "${id}" already exists`);
      return;
    }

    setSaving(true);
    setFormError("");
    try {
      const product: Product = { ...formData, id } as Product;
      if (editingProduct) {
        await updateProductInDB(id, formData as Partial<Product>);
      } else {
        await createProduct(product);
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (err) {
      setFormError("Failed to save: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  // Delete product
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await removeProduct(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
    }
  };

  // Sync static products to Firestore
  const handleSync = async () => {
    setSyncing(true);
    try {
      await syncStaticProducts(staticProducts);
      setSyncDone(true);
      setTimeout(() => setSyncDone(false), 3000);
    } catch (err) {
      console.error("Sync failed:", err);
    } finally {
      setSyncing(false);
    }
  };

  // Handle image file upload
  const handleImageUpload = async (
    file: File,
    field: "imageUrl" | "imageUrl2"
  ) => {
    const isFirst = field === "imageUrl";
    const setUploading = isFirst ? setUploadingImage1 : setUploadingImage2;
    const setProgress = isFirst ? setUploadProgress1 : setUploadProgress2;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setFormError("Please select an image file (JPG, PNG, WebP, etc.)");
      return;
    }
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFormError("Image must be smaller than 5 MB");
      return;
    }

    setUploading(true);
    setProgress(0);
    setFormError("");

    try {
      const timestamp = Date.now();
      const ext = file.name.split(".").pop() || "jpg";
      const productSlug =
        formId ||
        formData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") ||
        "product";
      const fileName = `${productSlug}_${isFirst ? "main" : "secondary"}_${timestamp}.${ext}`;

      const url = await uploadProductImage(file, fileName, (pct) => {
        setProgress(pct);
      });

      updateField(field, url);
    } catch (err) {
      setFormError(
        "Upload failed: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  // Handle drag-and-drop
  const handleDrop = (
    e: React.DragEvent,
    field: "imageUrl" | "imageUrl2"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file, field);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const updateField = <K extends keyof Omit<Product, "id">>(
    key: K,
    value: Omit<Product, "id">[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-all"
            />
          </div>
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-all"
            >
              <option value="All">All Categories</option>
              {OCCASIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {products.length === 0 && (
            <button
              onClick={handleSync}
              disabled={syncing}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl text-sm font-medium hover:bg-yellow-100 disabled:opacity-50 transition-all"
            >
              {syncing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              {syncing ? "Syncing..." : syncDone ? "Synced ✓" : "Sync Products to DB"}
            </button>
          )}
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Info bar */}
      <p className="text-sm text-gray-500 mb-4">
        {products.length === 0
          ? "No products in database. Click 'Sync Products to DB' to import from static data."
          : `${filtered.length} of ${products.length} products`}
      </p>

      {/* Products List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : filtered.length === 0 && products.length > 0 ? (
        <div className="text-center py-20">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No products match your search</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Table Header - Desktop */}
          <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="col-span-1">Image</div>
            <div className="col-span-3">Name / SKU</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-1">Price</div>
            <div className="col-span-1">Stock</div>
            <div className="col-span-2">Flags</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Product Rows */}
          {filtered.map((product) => {
            const discount = product.originalPrice
              ? Math.round(
                  ((product.originalPrice - product.price) / product.originalPrice) * 100
                )
              : 0;

            return (
              <div
                key={product.id}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-4 py-3 border-b border-gray-100 hover:bg-gray-50/50 transition-colors items-center"
              >
                {/* Image - mobile row header */}
                <div className="col-span-1 flex sm:block items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                </div>

                {/* Name / SKU */}
                <div className="col-span-3">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.sku}</p>
                </div>

                {/* Category */}
                <div className="col-span-2">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                    {product.category}
                  </span>
                  <span className="text-xs text-gray-400 ml-1">{product.plantType}</span>
                </div>

                {/* Price */}
                <div className="col-span-1">
                  <p className="text-sm font-semibold text-gray-900">₹{product.price}</p>
                  {discount > 0 && (
                    <p className="text-xs text-gray-400 line-through">₹{product.originalPrice}</p>
                  )}
                </div>

                {/* Stock */}
                <div className="col-span-1">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-md ${
                      product.stock > 10
                        ? "bg-green-50 text-green-700"
                        : product.stock > 0
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {product.stock}
                  </span>
                </div>

                {/* Flags */}
                <div className="col-span-2 flex flex-wrap gap-1">
                  {product.featured && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded">
                      Featured
                    </span>
                  )}
                  {product.bestSeller && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded">
                      Bestseller
                    </span>
                  )}
                  {product.newArrival && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">
                      New
                    </span>
                  )}
                  {product.priceDrop && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-600 rounded">
                      Sale
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditForm(product)}
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(product)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ====== PRODUCT FORM MODAL ====== */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl my-8 shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 space-y-6 max-h-[70vh] overflow-y-auto">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  {formError}
                </div>
              )}

              {/* Basic Info */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Basic Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400"
                      placeholder="Snake Plant"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">SKU</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => updateField("sku", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400"
                      placeholder="PG-BD-001"
                    />
                  </div>
                  {!editingProduct && (
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Product ID (auto-generated from name if left empty)
                      </label>
                      <input
                        type="text"
                        value={formId}
                        onChange={(e) => setFormId(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400"
                        placeholder="bd-001"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Pricing &amp; Stock</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.price || ""}
                      onChange={(e) => updateField("price", Number(e.target.value))}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Original Price (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.originalPrice || ""}
                      onChange={(e) =>
                        updateField(
                          "originalPrice",
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Stock</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => updateField("stock", Number(e.target.value))}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Rating
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.01"
                      value={formData.rating}
                      onChange={(e) => updateField("rating", Number(e.target.value))}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400"
                    />
                  </div>
                </div>
              </div>

              {/* Classification */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Classification</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        updateField("category", e.target.value as OccasionCategory)
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400"
                    >
                      {OCCASIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Plant Type
                    </label>
                    <select
                      value={formData.plantType}
                      onChange={(e) =>
                        updateField("plantType", e.target.value as PlantType)
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400"
                    >
                      {PLANT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Care Level
                    </label>
                    <select
                      value={formData.careLevel}
                      onChange={(e) =>
                        updateField("careLevel", e.target.value as CareLevel)
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400"
                    >
                      {CARE_LEVELS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Images</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Primary Image */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-medium text-gray-500">
                        Primary Image *
                      </label>
                      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => setImageMode1("upload")}
                          className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all ${
                            imageMode1 === "upload"
                              ? "bg-white text-green-700 shadow-sm"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          <Upload className="w-3 h-3 inline mr-0.5" />
                          Upload
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageMode1("url")}
                          className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all ${
                            imageMode1 === "url"
                              ? "bg-white text-green-700 shadow-sm"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          <LinkIcon className="w-3 h-3 inline mr-0.5" />
                          URL
                        </button>
                      </div>
                    </div>

                    {imageMode1 === "upload" ? (
                      <div
                        onDrop={(e) => handleDrop(e, "imageUrl")}
                        onDragOver={handleDragOver}
                        onClick={() => !uploadingImage1 && fileInput1Ref.current?.click()}
                        className={`relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                          uploadingImage1
                            ? "border-green-300 bg-green-50"
                            : "border-gray-200 hover:border-green-400 hover:bg-green-50/50"
                        }`}
                      >
                        <input
                          ref={fileInput1Ref}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, "imageUrl");
                            e.target.value = "";
                          }}
                        />
                        {uploadingImage1 ? (
                          <div className="py-2">
                            <RefreshCw className="w-5 h-5 animate-spin text-green-500 mx-auto mb-2" />
                            <p className="text-xs text-green-600 font-medium">
                              Uploading... {uploadProgress1}%
                            </p>
                            <div className="w-full bg-green-100 rounded-full h-1.5 mt-2">
                              <div
                                className="bg-green-500 h-1.5 rounded-full transition-all"
                                style={{ width: `${uploadProgress1}%` }}
                              />
                            </div>
                          </div>
                        ) : formData.imageUrl ? (
                          <div className="relative">
                            <div className="w-20 h-20 mx-auto rounded-lg overflow-hidden bg-gray-100 relative">
                              <Image
                                src={formData.imageUrl}
                                alt="Primary"
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2 truncate max-w-full">
                              {formData.imageUrl.length > 50
                                ? formData.imageUrl.slice(0, 50) + "..."
                                : formData.imageUrl}
                            </p>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateField("imageUrl", "");
                              }}
                              className="mt-1 text-[10px] text-red-500 hover:text-red-700 font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div className="py-2">
                            <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                            <p className="text-xs text-gray-500 font-medium">
                              Drop image here or click to upload
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">
                              JPG, PNG, WebP — Max 5 MB
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <input
                          type="url"
                          value={formData.imageUrl}
                          onChange={(e) => updateField("imageUrl", e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400"
                          placeholder="https://images.unsplash.com/..."
                        />
                        {formData.imageUrl && (
                          <div className="mt-2 w-16 h-16 rounded-lg overflow-hidden bg-gray-100 relative">
                            <Image
                              src={formData.imageUrl}
                              alt="Preview"
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Secondary Image */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-medium text-gray-500">
                        Secondary Image
                      </label>
                      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => setImageMode2("upload")}
                          className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all ${
                            imageMode2 === "upload"
                              ? "bg-white text-green-700 shadow-sm"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          <Upload className="w-3 h-3 inline mr-0.5" />
                          Upload
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageMode2("url")}
                          className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all ${
                            imageMode2 === "url"
                              ? "bg-white text-green-700 shadow-sm"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          <LinkIcon className="w-3 h-3 inline mr-0.5" />
                          URL
                        </button>
                      </div>
                    </div>

                    {imageMode2 === "upload" ? (
                      <div
                        onDrop={(e) => handleDrop(e, "imageUrl2")}
                        onDragOver={handleDragOver}
                        onClick={() => !uploadingImage2 && fileInput2Ref.current?.click()}
                        className={`relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                          uploadingImage2
                            ? "border-green-300 bg-green-50"
                            : "border-gray-200 hover:border-green-400 hover:bg-green-50/50"
                        }`}
                      >
                        <input
                          ref={fileInput2Ref}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, "imageUrl2");
                            e.target.value = "";
                          }}
                        />
                        {uploadingImage2 ? (
                          <div className="py-2">
                            <RefreshCw className="w-5 h-5 animate-spin text-green-500 mx-auto mb-2" />
                            <p className="text-xs text-green-600 font-medium">
                              Uploading... {uploadProgress2}%
                            </p>
                            <div className="w-full bg-green-100 rounded-full h-1.5 mt-2">
                              <div
                                className="bg-green-500 h-1.5 rounded-full transition-all"
                                style={{ width: `${uploadProgress2}%` }}
                              />
                            </div>
                          </div>
                        ) : formData.imageUrl2 ? (
                          <div className="relative">
                            <div className="w-20 h-20 mx-auto rounded-lg overflow-hidden bg-gray-100 relative">
                              <Image
                                src={formData.imageUrl2}
                                alt="Secondary"
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2 truncate max-w-full">
                              {formData.imageUrl2.length > 50
                                ? formData.imageUrl2.slice(0, 50) + "..."
                                : formData.imageUrl2}
                            </p>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateField("imageUrl2", "");
                              }}
                              className="mt-1 text-[10px] text-red-500 hover:text-red-700 font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div className="py-2">
                            <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                            <p className="text-xs text-gray-500 font-medium">
                              Drop image here or click to upload
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">
                              JPG, PNG, WebP — Max 5 MB
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <input
                          type="url"
                          value={formData.imageUrl2 || ""}
                          onChange={(e) => updateField("imageUrl2", e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400"
                          placeholder="https://images.unsplash.com/..."
                        />
                        {formData.imageUrl2 && (
                          <div className="mt-2 w-16 h-16 rounded-lg overflow-hidden bg-gray-100 relative">
                            <Image
                              src={formData.imageUrl2}
                              alt="Preview"
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Descriptions</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Short Description
                    </label>
                    <input
                      type="text"
                      value={formData.shortDescription}
                      onChange={(e) => updateField("shortDescription", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400"
                      placeholder="Brief one-liner about the product"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Full Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.fullDescription}
                      onChange={(e) => updateField("fullDescription", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400 resize-y"
                      placeholder="Detailed product description"
                    />
                  </div>
                </div>
              </div>

              {/* Tags & Badges */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Tags &amp; Badges</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags.join(", ")}
                      onChange={(e) =>
                        updateField(
                          "tags",
                          e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                        )
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400"
                      placeholder="birthday, indoor, low-maintenance"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Badges (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.badges.join(", ")}
                      onChange={(e) =>
                        updateField(
                          "badges",
                          e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                        )
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400"
                      placeholder="Air Purifying, Easy Care"
                    />
                  </div>
                </div>
              </div>

              {/* Flags */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Visibility Flags</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: "featured" as const, label: "Featured" },
                    { key: "bestSeller" as const, label: "Bestseller" },
                    { key: "newArrival" as const, label: "New Arrival" },
                    { key: "priceDrop" as const, label: "Price Drop / Sale" },
                    { key: "codAvailable" as const, label: "COD Available" },
                  ].map((flag) => (
                    <label
                      key={flag.key}
                      className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={!!formData[flag.key]}
                        onChange={(e) =>
                          updateField(flag.key, e.target.checked)
                        }
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      {flag.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploadingImage1 || uploadingImage2}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 disabled:opacity-50 transition-all"
              >
                {saving ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====== DELETE CONFIRMATION ====== */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Delete Product</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deleteTarget.name}</span>?
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 disabled:opacity-50 transition-all"
              >
                {deleting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
