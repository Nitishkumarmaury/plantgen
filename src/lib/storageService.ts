import { storage } from "./firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

/**
 * Upload an image file to Firebase Storage under products/ folder.
 * Returns the public download URL.
 *
 * @param file     The File/Blob to upload.
 * @param fileName A unique name for the file (e.g. product-id + timestamp).
 * @param onProgress Optional callback with 0-100 progress.
 */
export async function uploadProductImage(
  file: File,
  fileName: string,
  onProgress?: (pct: number) => void
): Promise<string> {
  // Sanitize filename
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storageRef = ref(storage, `products/${safeName}`);

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
    });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const pct = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        onProgress?.(pct);
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

/**
 * Delete an image from Firebase Storage by its full download URL.
 * Silently catches errors (image may not exist or may be external URL).
 */
export async function deleteProductImage(downloadUrl: string) {
  try {
    // Only attempt delete for Firebase Storage URLs
    if (!downloadUrl.includes("firebasestorage.googleapis.com")) return;
    const storageRef = ref(storage, downloadUrl);
    await deleteObject(storageRef);
  } catch {
    // Ignore — file may have already been deleted
  }
}
