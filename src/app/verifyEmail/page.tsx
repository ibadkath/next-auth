"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  // const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      const req = await fetch("/api/users/verifyemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!req.ok) {
        throw new Error("Verification failed");
      }

      //const data = 
      await req.json();
      setVerified(true);
      setError(false);
    } catch (error: unknown) {
      if(error instanceof Error){
        setError(true);
        console.log(error.message);
      }
      throw new Error("Something went wrong");
    }
  };

  useEffect(() => {
    setError(false);

    // const {query}= router;
    //const urlToken= router.query.token;
    const urlParams = new URLSearchParams(window.location.search); // Use `window.location` in App Router
    const urlToken = urlParams.get("token");

    if (urlToken) {
      setToken(urlToken);
    }
  },[]);

  useEffect(() => {
    setError(false);
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className=" flex flex-col justify-center items-center min-h-screen p-2">
      <h1 className=" text-5xl font-bold">Verify Email</h1>
      <h2 className=" p-2 bg-orange-500 ">{token ? `${token}` : "no token"}</h2>
      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href={"/login"}>Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}
    </div>
  );
}
