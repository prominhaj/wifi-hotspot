// Cache for MikroTik configuration
// In-memory cache with expiration
let configCache = null;
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes cache lifetime

export const getCachedConfig = () => {
  return configCache;
};

export const setCachedConfig = (config) => {
  configCache = {
    ...config,
    timestamp: Date.now(),
    isValid: true,
  };
  return configCache;
};

export const invalidateCache = () => {
  if (configCache) {
    configCache.isValid = false;
  }
};

export const isCacheValid = () => {
  if (!configCache) return false;
  if (!configCache.isValid) return false;

  const now = Date.now();
  return now - configCache.timestamp < CACHE_TTL;
};
