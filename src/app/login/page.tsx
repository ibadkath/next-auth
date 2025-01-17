"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const userLogin = async () => {
    try {
      setLoading(true);
      setErrorMessage(""); // Clear previous errors

      const res = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!res.ok) {
        // const errorData = await data.json();
        setErrorMessage(data.error || "Invalid email or password");
        setLoading(false);
        return;
      }
      console.log("login success", data);
      router.push("/profile");
    } catch (error:unknown) {
      
      console.log(error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className=" flex flex-col justify-center items-center min-h-screen p-3">
      {/* <h1 className=' font-bold text-4xl mb-2'>{loading ? "Processing": "Sign Up"}</h1> */}

      <Card className="w-[350px]">
        <CardHeader className=" flex justify-center items-center">
          <CardTitle className=" text-2xl">
            {loading ? "Processing" : "Login"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>

              <div className=" flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          {buttonDisabled ? (
            <Button onClick={userLogin} className="w-full" disabled>
              Login
            </Button>
          ) : (
            <Button onClick={userLogin} className=" w-full">
              Login
            </Button>
          )}
        </CardFooter>
        <div className=" flex flex-col justify-center items-center">
          <Link
            className=" underline text-sm pb-2 font-semibold"
            href={"/signup"}
          >
            SignUp
          </Link>
        </div>
      </Card>
    </div>
  );
}
