import Config from "@/modals/config-model";
import {
  getCachedConfig,
  isCacheValid,
  setCachedConfig,
} from "@/utils/mikrotik-cache";

export const getMikrotikConfig = async (forceRefresh = false) => {
  try {
    // Check if we have a valid cache and not forcing refresh
    if (!forceRefresh && isCacheValid()) {
      const cachedConfig = getCachedConfig();
      return {
        host: cachedConfig.host,
        user: cachedConfig.user,
        password: cachedConfig.password,
        port: cachedConfig.port || 8728,
        timeout: cachedConfig.timeout || 30,
        useTLS: cachedConfig.useTLS || false,
        keepalive: cachedConfig.keepalive || false,
      };
    }

    // Fetch from database if cache is invalid or forced refresh
    const config = await Config.findOne({}).exec();
    if (!config) {
      throw new Error("Configuration not found in the database.");
    }

    // Update the cache
    setCachedConfig({
      host: config.mikrotikConfig.host,
      user: config.mikrotikConfig.user,
      password: config.mikrotikConfig.password,
      port: config.mikrotikConfig.port || 8728,
      timeout: config.mikrotikConfig.timeout || 30,
      useTLS: config.mikrotikConfig.useTLS || false,
      keepalive: config.mikrotikConfig.keepalive || false,
    });

    return {
      host: config.mikrotikConfig.host,
      user: config.mikrotikConfig.user,
      password: config.mikrotikConfig.password,
      port: config.mikrotikConfig.port || 8728,
      timeout: config.mikrotikConfig.timeout || 30,
      useTLS: config.mikrotikConfig.useTLS || false,
      keepalive: config.mikrotikConfig.keepalive || false,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
};
