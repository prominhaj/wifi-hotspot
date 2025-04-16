"use server";

import { RouterOSAPI } from "node-routeros";
import Config from "@/modals/config-model";
import { invalidateCache } from "@/utils/mikrotik-cache";

export async function testMikrotikConnection(formData) {
  try {
    const { host, user, password, port, useTLS, timeout } = formData;

    // Validate required fields
    if (!host || !user || !password) {
      return { success: false, message: "Missing required fields" };
    }

    // Create a temporary connection to test
    const conn = new RouterOSAPI({
      host,
      user,
      password,
      port: port || (useTLS ? 8729 : 8728),
      timeout: timeout || 10, // Use provided timeout or default to 10 seconds for testing
      useTLS: useTLS || false,
    });

    try {
      // Attempt to connect
      await conn.connect();

      // Get system resource info as a simple test
      const resources = await conn.write("/system/resource/print");

      // Format uptime for better readability
      const uptime = resources[0]?.uptime || "Unknown";

      // Close the connection
      await conn.close();

      return {
        success: true,
        message: "Connection successful",
        info: {
          version: resources[0]?.version || "Unknown",
          boardName: resources[0]?.["board-name"] || "Unknown",
          uptime: uptime,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Connection failed: ${error.message}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Server error: ${error.message}`,
    };
  }
}

export async function saveMikrotikConfig(formData) {
  try {
    const { host, user, password, port, useTLS, timeout, keepalive } = formData;

    // Validate required fields
    if (!host || !user || !password) {
      return { success: false, message: "Missing required fields" };
    }

    // Find existing config or create new one
    let config = await Config.findOne({});

    if (!config) {
      // Create new config if none exists
      config = new Config({
        mikrotikConfig: {
          host,
          user,
          password,
          port: port || (useTLS ? 8729 : 8728),
          useTLS: useTLS || false,
          timeout: timeout || 30,
          keepalive: keepalive || false,
        },
      });
    } else {
      // Update existing config
      config.mikrotikConfig = {
        host,
        user,
        password,
        port: port || (useTLS ? 8729 : 8728),
        useTLS: useTLS || false,
        timeout: timeout || 30,
        keepalive: keepalive || false,
      };
    }

    // Save to database
    await config.save();

    // Invalidate cache to force refresh on next connection
    invalidateCache();

    return {
      success: true,
      message: "Configuration saved successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: `Server error: ${error.message}`,
    };
  }
}
