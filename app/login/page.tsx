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
import { FormEvent, useContext, useState } from "react";
// import { useRouter } from "next/navigation";
import { AUTH_CONTEXT } from "@/providers/auth";
import { toast } from "sonner";
import AuthSideImage from "@/components/ui/auth-side-image";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const { checkAuth, isLoading, isLoggedIn } = useContext(AUTH_CONTEXT)

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     router.replace("/dashboard/bookings");
  //   }
  // }, [isLoading, isLoggedIn, router])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null) // Reset the error state
    setLoading(true)

    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)

        checkAuth()
        toast.success("Logged in successfully!")
        // Redirect to the dashboard on successful login
        // router.push("/dashboard/bookings")
      } else {
        const errorData = await response.json()
        const errorMessage = errorData.detail || "Login failed. Please try again."

        // Extract error code
        const errorCodeMatch = errorMessage.match(/: ([A-Z_]+)$/)
        const errorCode = errorCodeMatch ? errorCodeMatch[1] : "UNKNOWN_ERROR"

        if (errorCode === "INVALID_LOGIN_CREDENTIALS") {
          setError("Invalid email or password")
        } else {
          setError(errorMessage)
        }
        console.error("Login failed:", errorData)
      }
    } catch (error) {
      setError("An error occurred during login. Please try again later.")
      console.error("Error during login:", (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  // const handleGoogleSignin = async () => {
  //   console.log("Google Sign-In not implemented yet");
  // };
  const inputClassName =
    "focus:ring-2 focus:ring-[#b9dd8b] focus:border-[#b9dd8b] outline-none transition-colors duration-300 !important"

  return (
    <div className="flex h-screen">
      <div className="w-1/2">
        <AuthSideImage />
      </div>

      {/* Right side with the login form */}
      <div className="w-1/2 flex items-center justify-center px-4">
        <Card className="w-full max-w-sm">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-medium text-left">Log In</CardTitle>
              <CardDescription>Welcome back! Log in to your account.</CardDescription>
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
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className={`w-full ${loading ? "bg-gray-400" : "bg-[#5ea502] hover:bg-[#5ea502]"}`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Link style={{ textAlign: "right", color: "#1c2c14", marginBottom: "-0.5rem" }} href="/forgot-password">
                Forgot Password?
              </Link>
            </CardContent>
            <div className="flex items-center justify-center my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-sm text-gray-600">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <CardFooter className="flex flex-col gap-1">
              <button className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
                <img src="/google-logo.png" alt="Google logo" className="w-5 h-5 mr-2" />
                <span className="text-gray-800 font-medium">Log In with Google</span>
              </button>

              <button className="flex items-center justify-center w-full px-4 py-2 border border-black rounded-lg bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300">
                <img src="/apple-logo.svg" alt="Apple logo" className="w-5 h-5 mr-2" />
                <span className="text-white font-medium">Log in with Apple</span>
              </button>

              <a href="http://" target="_blank" rel="noopener noreferrer">
                <p className="font-thin text-sm">More Sign In Options</p>
              </a>
              <p className="mt-4 text-base text-center text-gray-700">
                Need an account?{" "}
                <Link href="/signup" className="text-[#67b502]">
                  Create One
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

