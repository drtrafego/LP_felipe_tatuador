/**
 * Wraps a promise with a timeout.
 * If the promise doesn't resolve within the specified time, it returns the fallbackValue.
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  fallbackValue: T
): Promise<T> {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((resolve) => {
    timeoutId = setTimeout(() => resolve(fallbackValue), ms);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutId!);
    return result;
  } catch (error) {
    clearTimeout(timeoutId!);
    throw error;
  }
}

// Helper to generate a unique backup ID in case of DB failure/timeout
export function generateBackupId(): string {
  const timestamp = Math.floor(Date.now() / 1000);
  return `backup_timeout_${timestamp}_${Math.random().toString(36).substring(2, 7)}`;
}
