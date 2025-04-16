/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Save,
  TestTube,
  Eye,
  EyeOff,
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  saveMikrotikConfig,
  testMikrotikConnection,
} from "@/app/actions/config";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MikrotikConfigForm({ initialConfig = {} }) {
  const router = useRouter();
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null); // null, 'success', 'error'
  const [connectionMessage, setConnectionMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [routerInfo, setRouterInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");

  // Initialize form with react-hook-form
  const form = useForm({
    defaultValues: {
      host: initialConfig.host || "",
      user: initialConfig.user || "",
      password: initialConfig.password || "",
      port: initialConfig.port || 8728,
      useTLS: initialConfig.useTLS || false,
      timeout: initialConfig.timeout || 30,
      keepalive: initialConfig.keepalive || false,
    },
  });

  // Auto-test connection when form is filled with initial values
  useEffect(() => {
    const hasInitialConfig =
      initialConfig.host && initialConfig.user && initialConfig.password;
    if (hasInitialConfig) {
      // Small delay to ensure form is fully initialized
      const timer = setTimeout(() => {
        testConnection(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [initialConfig]);

  // Test connection function
  const testConnection = async (silent = false) => {
    // Validate form before testing
    const isValid = await form.trigger(["host", "user", "password", "port"]);
    if (!isValid) return;

    if (!silent) {
      setIsTestingConnection(true);
      setConnectionStatus(null);
      setConnectionMessage("");
    }

    try {
      const formData = form.getValues();
      const result = await testMikrotikConnection(formData);

      if (result.success) {
        setConnectionStatus("success");
        setConnectionMessage("Connection successful! Router is reachable.");
        setRouterInfo(result.info || null);

        if (!silent) {
          toast.success("Connection successful", {
            description: `Connected to ${
              result.info?.boardName || "MikroTik router"
            }`,
          });
        }
      } else {
        setConnectionStatus("error");
        setConnectionMessage(
          result.message || "Failed to connect to the router."
        );
        setRouterInfo(null);

        if (!silent) {
          toast.error("Connection failed", {
            description: result.message || "Failed to connect to the router.",
          });
        }
      }
    } catch (error) {
      setConnectionStatus("error");
      setConnectionMessage(error.message || "An unexpected error occurred.");
      setRouterInfo(null);

      if (!silent) {
        toast.error("Connection error", {
          description: error.message || "An unexpected error occurred.",
        });
      }
    } finally {
      if (!silent) {
        setIsTestingConnection(false);
      }
    }
  };

  // Save configuration function
  const onSubmit = async (data) => {
    setIsSaving(true);

    try {
      const result = await saveMikrotikConfig(data);
      if (result.success) {
        toast.success("Configuration saved", {
          description:
            "MikroTik router configuration has been saved successfully.",
        });

        // Refresh the page or redirect
        router.refresh();
      } else {
        toast.error("Failed to save configuration", {
          description:
            result.message ||
            "An error occurred while saving the configuration.",
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">
              MikroTik Router Configuration
            </CardTitle>
            <CardDescription className="mt-2">
              Configure your MikroTik router connection settings
            </CardDescription>
          </div>
          {connectionStatus && (
            <Badge
              variant={
                connectionStatus === "success" ? "outline" : "destructive"
              }
              className={
                connectionStatus === "success"
                  ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800"
                  : ""
              }
            >
              {connectionStatus === "success" ? (
                <div className="flex items-center gap-1">
                  <Wifi className="h-3 w-3 mr-1" />
                  Connected
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <WifiOff className="h-3 w-3 mr-1" />
                  Disconnected
                </div>
              )}
            </Badge>
          )}
        </div>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6 pt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Settings</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          </TabsList>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TabsContent value="basic" className="mt-0">
              <CardContent className="space-y-6 pt-6">
                {/* Connection status alert with router info */}
                {connectionStatus === "success" && routerInfo && (
                  <Alert
                    variant="default"
                    className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                  >
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertTitle className="flex items-center gap-2">
                      Connected to Router
                      <Badge
                        variant="outline"
                        className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        v{routerInfo.version}
                      </Badge>
                    </AlertTitle>
                    <AlertDescription>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <div>
                          <span className="font-medium">Model:</span>{" "}
                          {routerInfo.boardName}
                        </div>
                        <div>
                          <span className="font-medium">Uptime:</span>{" "}
                          {routerInfo.uptime}
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {connectionStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Connection Error</AlertTitle>
                    <AlertDescription>{connectionMessage}</AlertDescription>
                  </Alert>
                )}

                {/* Host field */}
                <FormField
                  control={form.control}
                  name="host"
                  rules={{ required: "Host is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Host</FormLabel>
                      <FormControl>
                        <Input placeholder="192.168.1.1" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the IP address or hostname of your MikroTik
                        router.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Username field */}
                <FormField
                  control={form.control}
                  name="user"
                  rules={{ required: "Username is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="admin" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the username for router authentication.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password field with toggle visibility */}
                <FormField
                  control={form.control}
                  name="password"
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="sr-only">
                              {showPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Enter the password for router authentication.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Port field */}
                <FormField
                  control={form.control}
                  name="port"
                  rules={{
                    required: "Port is required",
                    min: { value: 1, message: "Port must be at least 1" },
                    max: {
                      value: 65535,
                      message: "Port must be at most 65535",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Port</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="8728"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              Number.parseInt(e.target.value) || ""
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        API port (default: 8728 for HTTP, 8729 for HTTPS).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </TabsContent>

            <TabsContent value="advanced" className="mt-0">
              <CardContent className="space-y-6 pt-6">
                {/* Use TLS switch */}
                <FormField
                  control={form.control}
                  name="useTLS"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Use SSL/TLS</FormLabel>
                        <FormDescription>
                          Enable secure connection using SSL/TLS.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Timeout field */}
                <FormField
                  control={form.control}
                  name="timeout"
                  rules={{
                    min: {
                      value: 1,
                      message: "Timeout must be at least 1 second",
                    },
                    max: {
                      value: 300,
                      message: "Timeout must be at most 300 seconds",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Connection Timeout (seconds)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="30"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              Number.parseInt(e.target.value) || 30
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum time to wait for connection establishment.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Keep-alive switch */}
                <FormField
                  control={form.control}
                  name="keepalive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Keep-alive Connection
                        </FormLabel>
                        <FormDescription>
                          Maintain persistent connection to the router.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </TabsContent>

            <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 border-t p-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => testConnection()}
                      disabled={isTestingConnection || isSaving}
                    >
                      {isTestingConnection ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <TestTube className="mr-2 h-4 w-4" />
                          Test Connection
                        </>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Verify your connection settings before saving
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="ghost"
                  className="w-1/2 sm:w-auto"
                  onClick={() => {
                    form.reset();
                    setConnectionStatus(null);
                    setConnectionMessage("");
                    setRouterInfo(null);
                  }}
                  disabled={isTestingConnection || isSaving}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>

                <Button
                  type="submit"
                  className="w-1/2 sm:w-auto"
                  disabled={isTestingConnection || isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Configuration
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Tabs>
    </Card>
  );
}
