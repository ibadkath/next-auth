"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

interface IUser {
  slug: string;
  username: string;
}
function Profile({ params }: { params: IUser }) {
  const router = useRouter();
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
      <div className=" flex md:flex-row flex-col justify-between items-center mt-12 gap-y-6">
        <span></span>
        <h3 className="text-5xl text-cyan-500 font-bold">
          {params.slug} Profile{" "}
        </h3>
        <Button
          onClick={logout}
          className=" bg-green-500 hover:bg-green-700 mr-8 "
        >
          Logout
        </Button>
      </div>
      <div className=" flex flex-col justify-center items-center min-h-[50vh] ml-28 mr-28 mt-5">
        <p className=" font-medium  leading-loose tracking-wide">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, illum
          molestias! Dicta nesciunt optio reiciendis ea suscipit, vero
          necessitatibus tempora ducimus rerum amet temporibus iusto molestias
          fugit aut quisquam libero laboriosam vitae qui sit non sapiente
          exercitationem. Cumque corrupti perferendis iste, tempore blanditiis
          esse ea temporibus delectus labore architecto a doloribus beatae
          eveniet consequuntur, hic fugiat perspiciatis molestias sint mollitia
          dolores! Numquam distinctio nisi saepe expedita deleniti minima,
          sapiente non optio! Id consequatur ad libero earum recusandae
          voluptatibus, nobis reprehenderit dolorem numquam nulla quasi dicta
          consectetur modi iure! At doloribus ea nobis tenetur nisi eveniet
          quasi inventore quaerat, voluptas ad?
        </p>
      </div>
    </>
  );
}

export default Profile;
