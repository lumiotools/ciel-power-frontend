"use client";

import { FormEvent, useState, useContext, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import AuthSideImage from '@/components/ui/auth-side-image';
import { toast } from 'sonner';
import { AUTH_CONTEXT } from '@/providers/auth';


export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState<String | null>(null);
    const router = useRouter();
    const { isLoading, isLoggedIn } = useContext(AUTH_CONTEXT);

    // useEffect(() => {
    //     if(isLoggedIn && !isLoading) {
    //         router.replace("/dashboard/bookings")
    //     }
    // }, [isLoggedIn, isLoading, router])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/forget-password", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            if (response.ok) {
                const data = response.json();
                console.log(data);

                toast.success("Link to reset your password has been sent to your email!")
                router.push("/login");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Email not found!");
                console.log("Email either not found or error occured!");
            }
        } catch (error) {
            setError("An error occurred during login. Please try again later.")
            console.error("Error during login:", (error as Error).message)
        } finally {
            setIsLoading(false);
        }
    }

    const inputClassName =
        "focus:ring-2 focus:ring-[#b9dd8b] focus:border-[#b9dd8b] outline-none transition-colors duration-300 !important"
    return (
        <div className="flex h-screen">
      <div className="hidden md:block md:w-1/2">
        <AuthSideImage />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-4">
        <Card className="w-full max-w-sm">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-medium text-left">Forgot Password</CardTitle>
              <CardDescription className="text-left">Enter your email to reset your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClassName}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              <Button
                type="submit"
                className={`w-full ${loading ? "bg-gray-400" : "bg-[#5ea502] hover:bg-[#5ea502]"}`}
                disabled={loading}
              >
                {loading ? "Sending reset link..." : "Send Reset Link"}
              </Button>
            </CardContent>
            <CardFooter>
              <p className="w-full text-sm text-center text-gray-700">
                Remembered your password?{" "}
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
