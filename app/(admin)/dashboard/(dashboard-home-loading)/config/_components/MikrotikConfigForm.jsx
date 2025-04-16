"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Save,
  TestTube,
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
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function MikrotikConfigForm({ initialConfig = {} }) {
  const router = useRouter();
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null); // null, 'success', 'error'
  const [connectionMessage, setConnectionMessage] = useState("");

  // Initialize form with react-hook-form
  const form = useForm({
    defaultValues: {
      host: initialConfig.host || "",
      user: initialConfig.user || "",
      password: initialConfig.password || "",
      port: initialConfig.port || 8728,
      useTLS: false,
    },
  });

  // Test connection function
  const testConnection = async () => {
    // Validate form before testing
    const isValid = await form.trigger();
    if (!isValid) return;

    setIsTestingConnection(true);
    setConnectionStatus(null);
    setConnectionMessage("");

    try {
      const formData = form.getValues();

      const response = await fetch("/api/mikrotik/test-connection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setConnectionStatus("success");
        setConnectionMessage("Connection successful! Router is reachable.");
      } else {
        setConnectionStatus("error");
        setConnectionMessage(
          result.message || "Failed to connect to the router."
        );
      }
    } catch (error) {
      setConnectionStatus("error");
      setConnectionMessage(error.message || "An unexpected error occurred.");
    } finally {
      setIsTestingConnection(false);
    }
  };

  // Save configuration function
  const onSubmit = async (data) => {
    setIsSaving(true);

    try {
      const response = await fetch("/api/mikrotik/save-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>MikroTik Router Configuration</CardTitle>
        <CardDescription>
          Configure your MikroTik router connection settings. These settings are
          required to connect to your router.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Connection status alert */}
            {connectionStatus && (
              <Alert
                variant={
                  connectionStatus === "success" ? "default" : "destructive"
                }
                className={
                  connectionStatus === "success"
                    ? "bg-green-50 border-green-200"
                    : undefined
                }
              >
                {connectionStatus === "success" ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {connectionStatus === "success"
                    ? "Success"
                    : "Connection Error"}
                </AlertTitle>
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
                    Enter the IP address or hostname of your MikroTik router.
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

            {/* Password field */}
            <FormField
              control={form.control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
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
                max: { value: 65535, message: "Port must be at most 65535" },
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
                        field.onChange(Number.parseInt(e.target.value) || "")
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
          </CardContent>

          <CardFooter className="flex justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={testConnection}
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
            <Button type="submit" disabled={isTestingConnection || isSaving}>
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
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
