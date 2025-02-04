"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthSideImage from "@/components/ui/auth-side-image";
import { Eye, EyeOff } from "lucide-react";
import { AUTH_CONTEXT } from "@/providers/auth";

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const { isLoggedIn, isLoading } = useContext(AUTH_CONTEXT);

  // useEffect(() => {
  //   if (!isLoading && isLoggedIn) {
  //     router.push("/dashboard/bookings")
  //   }
  // }, [isLoading, isLoggedIn, router])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

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
            firstName: firstname,
            lastName: lastname,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          const match = errorData.detail.match(/400:\s(.+)/);
          const extractedMessage = match ? match[1] : "";
          console.log(extractedMessage);
          throw new Error(extractedMessage || "Failed to sign up")
        }

        const data = await response.json()
        console.log(data)
        toast.success("User created successfully")

        router.push("/login")
      } catch (error) {
        setError((error as Error).message)
        console.log(error)
      } finally {
        setLoading(false)
      }
    } else {
      setError("Passwords don't match!")
      setLoading(false)
    }
  }

  const inputClassName =
    "focus:ring-2 focus:ring-[#5ea502] focus:border-[#5ea502] outline-none transition-colors duration-300 !important"

  return (
    <div className="flex h-screen">
      <div className="hidden md:block md:w-1/2">
        <AuthSideImage />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-4 overflow-y-auto">
        <Card className="w-full max-w-sm my-8">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-medium text-left">Sign Up</CardTitle>
              <CardDescription className="text-sm">Create an account to get started.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
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
              <Input
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
              />

              {error && <p className="text-xs text-red-500">{error}</p>}
              <Button
                type="submit"
                className={`w-full ${loading ? "bg-gray-400" : "bg-[#5ea502] hover:bg-[#5ea502]"}`}
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </CardContent>
            <div className="flex items-center justify-center my-2">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-xs text-gray-600">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
            <CardFooter className="flex flex-col gap-2 pt-0">
              <button className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
                <img src="/google-logo.png" alt="Google logo" className="w-4 h-4 mr-2" />
                <span className="text-sm text-gray-800 font-medium">Sign Up with Google</span>
              </button>
              <button className="flex items-center justify-center w-full px-4 py-2 border border-black rounded-lg bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300">
                <img src="/apple-logo.svg" alt="Apple logo" className="w-4 h-4 mr-2" />
                <span className="text-sm text-white font-medium">Sign Up with Apple</span>
              </button>
              <a href="http://" target="_blank" rel="noopener noreferrer" className="text-center">
                <p className="font-thin text-xs">More Sign Up Options</p>
              </a>
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
  )
}

