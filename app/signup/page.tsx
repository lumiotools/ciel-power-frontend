'use client'
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

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(email, password);
    
        try {
            const response = await fetch('http://localhost:8000/auth/register',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    email: email,
                    password: password,
                })
            });
            const data = await response.json();
            console.log(data);
    
            router.push('/signup');
            
        } catch (error) {
            console.log(error);
        }
       
    }
    return (
    <div className="mx-5 flex items-center justify-center h-screen">
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-medium text-center">Sign Up</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-1">
          <Button onClick={handleSubmit} className="w-full">Sign Up</Button>
          <div className="mt-2">OR</div>
          <Button variant={'outline'}
            className="w-full mt-2 text-black ">
            Continue with Google 
          </Button>
          <p className="mt-2 text-xs text-center text-gray-700">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
