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

export default function SignUp() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();

  const onSignUp = async () => {
    try {
      setLoading(true);

      const data = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          content: "application/json",
        },
      });
      const res = await data.json();
      console.log("SignUp success", res.data);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
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
            {loading ? "Processing" : "Sign Up"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </div>
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
            </div>
          </form>
        </CardContent>
        <CardFooter>
          {buttonDisabled ? (
            <Button onClick={onSignUp} className=" w-full " disabled>
              Sign Up
            </Button>
          ) : (
            <Button onClick={onSignUp} className=" w-full">
              Sign Up
            </Button>
          )}
        </CardFooter>
        <div className=" flex flex-col justify-between  items-center">
          <p className=" underline text-sm font-semibold text-blue-700 ">
            Already an account?
          </p>
          <Link
            className=" underline text-sm font-semibold px-3 py-3"
            href={"/login"}
          >
            Login here
          </Link>
        </div>
      </Card>
    </div>
  );
}
