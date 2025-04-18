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
import { type FormEvent, useContext, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import AuthSideImage from "@/components/ui/auth-side-image";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AUTH_CONTEXT } from "@/providers/auth";
// import { AUTH_CONTEXT } from "@/providers/auth";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { checkAuth } = useContext(AUTH_CONTEXT);

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const emailToken = searchParams.get("token");

    if (code && state) {
      const validEmail = decodeURIComponent(
        Buffer.from(state || "", "hex").toString("utf8"),
      );
      setEmail(validEmail);
      handleGoogleAuth(code, validEmail);
    } else if (emailToken) {
      const validEmail = decodeURIComponent(
        Buffer.from(emailToken || "", "hex").toString("utf8"),
      );
      setEmail(validEmail);
    } else {
      // router.replace("/login");
    }
  }, [searchParams]);

  const handleGoogleSignup = () => {
    // setGoogleLoading(true);
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectURI = encodeURIComponent(
      `${window.location.origin}/register`,
    );

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectURI}&response_type=code&scope=email%20profile&state=${searchParams.get("token")}`;

    window.open(googleAuthUrl, "_blank");
  };

  const handleGoogleAuth = async (code: string, validEmail: string) => {
    setError(null);
    setGoogleLoading(true);

    try {
      const response = await fetch(`/api/auth/google-auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          code,
          validEmail: validEmail,
          redirect_uri: `${window.location.origin}/register`,
        }),
      });

      if (response.ok) {
        checkAuth();
        toast.success("Signed up with Google successfully!");
      } else {
        const errorData = await response.json();
        setError(
          errorData.detail || "Google sign up failed. Please try again.",
        );
        console.error("Google sign up failed:", errorData);
        router.replace(pathname);
      }
    } catch (error) {
      console.log("Error", error as Error);
      setError(
        "An error occurred during Google sign up. Please try again later.",
      );
      router.replace(pathname);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password === confirmPassword) {
      try {
        const response = await fetch(`/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();

          // Extract error message if it's a known case
          const match = errorData.detail.match(/400:\s(.+)/);
          const extractedMessage = match ? match[1] : errorData.detail;

          // Handle "EMAIL_EXISTS" error case
          if (errorData.detail.includes("EMAIL_EXISTS")) {
            throw new Error(
              "An account with this email already exists. Please use a different email or log in.",
            );
          }

          throw new Error(extractedMessage || "Failed to sign up");
        }

        const data = await response.json();
        console.log(data);
        toast.success("User created successfully");

        router.push("/login");
      } catch (error) {
        setError((error as Error).message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Passwords don't match!");
      setLoading(false);
    }
  };

  const inputClassName =
    "h-12 focus:ring-2 focus:ring-[#5ea502] focus:border-[#5ea502] outline-none transition-colors duration-300 !important";

  return (
    <div className="flex h-screen">
      <div className="hidden md:block md:w-1/2 p-2">
        <AuthSideImage />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-4 overflow-y-auto">
        <Card className="w-full max-w-sm  sm:max-w-md">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-medium text-left">
                Sign Up
              </CardTitle>
              <CardDescription className="text-sm">
                Create an account to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                disabled
                className={inputClassName}
              />
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className={inputClassName}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                  className={inputClassName}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
              {/* <Input
                id="firstname"
                type="text"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
                className={inputClassName}
              />
              <Input
                id="lastname"
                type="text"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
                className={inputClassName}
              /> */}

              {error && <p className="text-xs text-red-500">{error}</p>}
              <Button
                type="submit"
                className={`w-full text-[18px] h-[48px] ${
                  loading ? "bg-gray-400" : "bg-[#5ea502] hover:bg-[#5ea502]"
                }`}
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </CardContent>
            <div className="flex items-center justify-center my-2 px-6">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-xs text-gray-600">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
            <CardFooter className="flex flex-col gap-3">
              <Button
                type="button"
                onClick={handleGoogleSignup}
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
                  {googleLoading ? "Signing up..." : "Sign up with Google"}
                </span>
              </Button>
              {/* <button className="flex items-center justify-center w-full h-[48px] border border-black rounded-lg bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300">
                <img src="/apple-logo.svg" alt="Apple logo" className="w-4 h-4 mr-2" />
                <span className="text-sm text-white font-medium">Sign Up with Apple</span>
              </button> */}
              <div className="text-center">
                <p className="text-[12px] font-thin text-[#1C2C14]">
                  More Sign Up Options
                </p>
              </div>
              <p className="mt-2 text-sm text-center text-gray-700">
                Already have an account?{" "}
                <Link href="/login" className="text-[#67b502]">
                  Log in here
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
