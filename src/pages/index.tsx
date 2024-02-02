import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
//import { Post } from "@prisma/client";
import Head from "next/head";
//import Link from "next/link";
import { api } from "~/utils/api";

interface Post {
  id: string;
  createdAt: Date; // Adjusted to Date type based on DateTime in your schema
  content: string;
  authorId: string;
}


export default function Home() {
  //const hello = api.post.hello.useQuery({ text: "from tRPC" });

  const user = useUser();

  const {data} = api.posts.getAll.useQuery();
 

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div>{!user && <SignInButton/>}{!!user && <SignOutButton/>}</div>
        </div>
        <div>
        {(data as Post[] | undefined)?.map((post) => (
        <div key={post.id}>{post.content}</div>
      ))}
        </div>
      </main>
    </>
  );
}
