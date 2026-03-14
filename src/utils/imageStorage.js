/**
 * Image upload as base64 – works without an image API.
 * Use for property photos: upload in any common image format,
 * store as base64 and persist in localStorage so images work locally and in production.
 */

const STORAGE_KEY_PREFIX = 'property_photos_';
const PLACEHOLDER = 'https://via.placeholder.com/400x260?text=Property';

/**
 * Convert a File to a base64 data URL (e.g. data:image/jpeg;base64,...).
 * @param {File} file
 * @returns {Promise<string>}
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type?.startsWith('image/')) {
      reject(new Error('Not an image file'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Convert multiple files to base64 data URLs.
 * @param {File[]} files
 * @returns {Promise<string[]>}
 */
export async function filesToBase64(files) {
  if (!Array.isArray(files) || files.length === 0) return [];
  const results = await Promise.all(
    files.filter((f) => f && f.type?.startsWith('image/')).map(fileToBase64)
  );
  return results;
}

/**
 * Save property photos (base64 data URLs) to localStorage.
 * Works in both dev and production (same origin).
 * @param {string|number} propertyId
 * @param {string[]} base64Photos
 */
export function savePropertyPhotos(propertyId, base64Photos) {
  if (propertyId == null || propertyId === '') return;
  const key = `${STORAGE_KEY_PREFIX}${propertyId}`;
  try {
    const list = Array.isArray(base64Photos) ? base64Photos : [];
    if (list.length === 0) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(list));
    }
  } catch (e) {
    console.warn('imageStorage: save failed', e);
  }
}

/**
 * Get property photos from localStorage.
 * @param {string|number} propertyId
 * @returns {string[]} base64 data URLs
 */
export function getPropertyPhotos(propertyId) {
  if (propertyId == null || propertyId === '') return [];
  const key = `${STORAGE_KEY_PREFIX}${propertyId}`;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Get the best available image URL for a property:
 * 1. First photo from localStorage (base64)
 * 2. First photo from API (e.g. URL or base64)
 * 3. Placeholder
 * @param {string|number} [propertyId]
 * @param {string[]} [apiPhotos] – URLs or base64 strings from API
 * @returns {string}
 */
export function getPropertyImageUrl(propertyId, apiPhotos) {
  const local = propertyId ? getPropertyPhotos(propertyId) : [];
  if (local.length > 0 && local[0]) return local[0];
  if (apiPhotos && apiPhotos.length > 0 && apiPhotos[0]) return apiPhotos[0];
  return PLACEHOLDER;
}
