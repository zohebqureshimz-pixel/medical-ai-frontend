"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";


export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");


  async function handleLogin() {

    try {

      const response = await api.post("/login", {
        email,
        password
      });


      localStorage.setItem(
        "token",
        response.data.access_token
      );


      setMessage("Login successful");


      router.push("/");


    } catch(error) {

      console.error(error);
      setMessage("Invalid email or password");

    }

  }


  return (
    <div className="flex h-screen items-center justify-center">

      <div className="w-96 space-y-4">

        <h1 className="text-3xl font-bold">
          Login
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
          onClick={handleLogin}
        >
          Login
        </button>


        <p>
          {message}
        </p>

      </div>

    </div>
  );
}