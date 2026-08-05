"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";


export default function SignupPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");


  async function handleSignup() {

    try {

      const response = await api.post("/signup", {
        email,
        password
      });


      setMessage("Account created successfully");


      setTimeout(() => {
        router.push("/login");
      }, 1000);


    } catch(error) {

      console.error(error);
      setMessage("Signup failed");

    }

  }


  return (
    <div className="flex h-screen items-center justify-center">

      <div className="w-96 space-y-4">

        <h1 className="text-3xl font-bold">
          Create Account
        </h1>


        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />


        <input
          className="border p-2 w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />


        <button
          className="bg-black text-white p-2 w-full"
          onClick={handleSignup}
        >
          Signup
        </button>
        
        <p className="text-center mt-4">
          Already have an account?{" "}
  <button
    onClick={() => router.push("/login")}
    className="text-blue-600 hover:underline"
  >
    Login
  </button>
  </p>


        <p>
          {message}
        </p>

      </div>

    </div>
  );
}