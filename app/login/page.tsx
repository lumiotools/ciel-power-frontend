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
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("abc@gmail.com");
    const [password, setPassword] = useState("Abc12345678@");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignin = async()=>{

  }

  return (
    <div className="mx-5 flex items-center justify-center h-screen">
      <Card>
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
        </CardContent>
        <CardFooter className="flex flex-col gap-1">
          <Button className="w-full" onClick={handleSubmit}>
            Login
          </Button>
          <div className="mt-2">OR</div>
          <Button variant={"outline"} onClick={handleGoogleSignin} className="w-full mt-2 text-black ">
            Continue with Google
          </Button>
          <p className="mt-2 text-xs text-center text-gray-700">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
