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
import { FormEvent, useContext, useEffect, useState } from "react";
import { AUTH_CONTEXT } from "@/providers/auth";
import { toast } from "sonner";
import AuthSideImage from "@/components/ui/auth-side-image";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { checkAuth } = useContext(AUTH_CONTEXT);

  useEffect(() => {
    const code = searchParams.get("code");
    const emailToken = searchParams.get("token");
    if (code) {
      handleGoogleAuth(code);
    }
    if (emailToken) {
      const validEmail = decodeURIComponent(
        Buffer.from(emailToken || "", "hex").toString("utf8"),
      );
      setEmail(validEmail);
    }
  }, [searchParams]);

  const handleGoogleAuth = async (code: string) => {
    setError(null);
    setGoogleLoading(true);

    try {
      const response = await fetch(`/api/auth/google-auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          code,
          redirect_uri: `${window.location.origin}/login`,
        }),
      });

      if (response.ok) {
        checkAuth();
        toast.success("Logged in with Google successfully!");
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Google login failed. Please try again.");
        console.error("Google login failed:", errorData);
        router.replace(pathname);
      }
    } catch (error) {
      console.log("Error", error as Error);
      setError(
        "An error occurred during Google login. Please try again later.",
      );
      router.replace(pathname);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectURI = encodeURIComponent(`${window.location.origin}/login`);

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectURI}&response_type=code&scope=email%20profile`;

    window.location.href = googleAuthUrl;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Check role and redirect accordingly
        if (data.role === "admin") {
          await checkAuth(); // Make sure auth state is updated before redirect
          toast.success("Admin logged in successfully!");
          router.push("/admin");
        } else {
          await checkAuth();
          toast.success("Logged in successfully!");
          router.push("/dashboard"); // or wherever regular users should go
        }
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.detail || "Login failed. Please try again.";

        // Extract error code
        const errorCodeMatch = errorMessage.match(/: ([A-Z_]+)$/);
        const errorCode = errorCodeMatch ? errorCodeMatch[1] : "UNKNOWN_ERROR";

        if (errorCode === "INVALID_LOGIN_CREDENTIALS") {
          setError("Invalid email or password");
        } else {
          setError(errorMessage);
        }
        console.error("Login failed:", errorData);
      }
    } catch (error) {
      console.log("Error", error as Error);
      setError("An error occurred during login. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const inputClassName =
    "h-12 focus:ring-2 focus:ring-[#b9dd8b] focus:border-[#b9dd8b] outline-none transition-colors duration-300";

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side (Image) - Hidden on Small Screens */}
      <div className="hidden md:flex md:w-1/2 p-2">
        <AuthSideImage />
      </div>

      {/* Right side (Login Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <Card className="w-full max-w-sm sm:max-w-md">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl sm:text-2xl font-medium text-left">
                Log In
              </CardTitle>
              <CardDescription>
                Welcome back! Log in to your account.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  className={inputClassName}
                />
              </div>

              <div className="grid gap-2 relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={inputClassName}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                className={`w-full h-[48px] text-[18px] ${
                  loading ? "bg-gray-400" : "bg-[#5ea502] hover:bg-[#5ea502]"
                }`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Link
                href="/forgot-password"
                className="text-right text-[#1c2c14] text-[14px]"
              >
                Forgot Password?
              </Link>
            </CardContent>

            {/* Divider */}
            <div className="flex items-center justify-center my-4 px-6">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-[14px] text-gray-600">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <CardFooter className="flex flex-col gap-3">
              {/* Google Button */}
              <Button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="flex items-center justify-center w-full h-[48px] border border-gray-300 rounded-lg bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                {googleLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <img
                    src="/google-logo.png"
                    alt="Google logo"
                    className="w-5 h-5 mr-2"
                  />
                )}
                <span className="text-gray-800 font-medium text-[14px]">
                  {googleLoading ? "Signing in..." : "Sign in with Google"}
                </span>
              </Button>

              {/* Apple Button */}
              {/* <button type="button" className="flex items-center justify-center w-full h-[48px] border border-black rounded-lg bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300">
                <img src="/apple-logo.svg" alt="Apple logo" className="w-5 h-5 mr-2" />
                <span className="text-white font-medium text-[14px]">Log in with Apple</span>
              </button> */}

              <div className="text-center">
                <p className="text-[12px] font-thin text-[#1C2C14]">
                  More Sign Up Options
                </p>
              </div>

              {/* Sign Up Link */}
              <p className="mt-4 text-center text-gray-700 text-[14px]">
                Need an account?{" "}
                <Link href="/register" className="text-[#67b502]">
                  Create One
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
