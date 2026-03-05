import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  writeBatch,
} from "firebase/firestore";
import { Product } from "@/types";

const COLLECTION = "products";

/** Push all static products to Firestore (initial sync) */
export async function syncStaticProducts(staticProducts: Product[]) {
  const batch = writeBatch(db);
  for (const product of staticProducts) {
    batch.set(doc(db, COLLECTION, product.id), product);
  }
  await batch.commit();
}

/** Fetch all products from Firestore */
export async function fetchAllProducts(): Promise<Product[]> {
  const snapshot = await getDocs(
    query(collection(db, COLLECTION), orderBy("name"))
  );
  return snapshot.docs.map((d) => ({ ...d.data(), id: d.id } as Product));
}

/** Fetch a single product by ID */
export async function fetchProductById(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  return snap.exists() ? ({ ...snap.data(), id: snap.id } as Product) : null;
}

/** Create or overwrite a product */
export async function createProduct(product: Product) {
  await setDoc(doc(db, COLLECTION, product.id), product);
}

/** Update specific fields of a product */
export async function updateProductInDB(id: string, data: Partial<Product>) {
  await updateDoc(doc(db, COLLECTION, id), data as Record<string, unknown>);
}

/** Delete a product */
export async function removeProduct(id: string) {
  await deleteDoc(doc(db, COLLECTION, id));
}

/** Real-time subscription to all products */
export function subscribeToProducts(callback: (products: Product[]) => void) {
  return onSnapshot(
    query(collection(db, COLLECTION), orderBy("name")),
    (snapshot) => {
      callback(
        snapshot.docs.map((d) => ({ ...d.data(), id: d.id } as Product))
      );
    }
  );
}
