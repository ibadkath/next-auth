"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Profile() {
  const [data, setData] = useState("");
  const router = useRouter();

  const GetUserDetails = async () => {
    try {
      const req = await fetch("/api/users/aboutMe");
      const res = await req.json();
      console.log(res.data);
      setData(res.data.username);
      router.push(`profile/${data}`);
    } catch (error: unknown) {
      if(error instanceof Error){
        console.log(error.message);

      }
      throw new Error("Something went wrong")
    }
  };
  const logout = async () => {
    try {
      const req = await fetch("/api/users/logout");
      //const res =
       await req.json();
      router.push("/login");
    } catch (error: unknown) {
      if(error instanceof Error){
        console.log(error.message);

      }
      throw new Error("Something went wrong")
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className=" text-5xl text-sky-500 font-bold mt-16">
          Profile Page
        </h1>
        {/* <h2 className=' mb-2 mt-8'>{data === "" ? "": <Link className="underline" href={`profile/${data}`}>{data}</Link>}</h2> */}
      </div>

      <div className="flex flex-col justify-center items-center min-h-[75vh]">
        <Button onClick={GetUserDetails}>Get User Details</Button>
        <Button
          onClick={logout}
          className=" bg-green-500 hover:bg-green-700 mt-4"
        >
          Logout
        </Button>
      </div>
    </>
  );
}
