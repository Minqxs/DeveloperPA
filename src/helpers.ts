export async function safeFetch<T>(
  fn: () => Promise<T>,
  fallback: T | null = null,
  label?: string
): Promise<T | null> {
  try {
    return await fn();
  } catch (err) {
    console.warn(`[safeFetch] ${label || "Request"} failed:`, err);
    return fallback;
  }
}
