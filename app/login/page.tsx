"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AUTH_CONTEXT } from "@/providers/auth";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { checkAuth } = useContext(AUTH_CONTEXT);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset the error state
    setLoading(true);

    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        checkAuth();
        toast.success("Logged in successfully!");
        // Redirect to the dashboard on successful login
        router.push("/dashboard/bookings");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again."); // Display server error
        console.error("Login failed:", errorData);
      }
    } catch (error) {
      setError("An error occurred during login. Please try again later.");
      console.error("Error during login:", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleSignin = async () => {
  //   console.log("Google Sign-In not implemented yet");
  // };

  return (
    <div className="mx-5 flex items-center justify-center h-screen">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-medium text-center">
              Login
            </CardTitle>
            <CardDescription>
              Enter your email and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col gap-1">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            {/* <div className="mt-2">OR</div>
            <Button
              variant={"outline"}
              onClick={handleGoogleSignin}
              className="w-full mt-2 text-black"
            >
              Continue with Google
            </Button> */}
            <p className="mt-4 text-xs text-center text-gray-700">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
