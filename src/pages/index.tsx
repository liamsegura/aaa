import Head from "next/head";
import { SignInButton, SignOutButton, UserButton, useUser} from "@clerk/nextjs";



export default function Home() {

  const user = useUser()

  console.log(user)

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="p-4 flex justify-between gap-2 bg-black text-slate-400"> 
      <UserButton />
      <div>
        {!user.isSignedIn && <SignInButton />}
        {!!user.isSignedIn && <SignOutButton />} 
      </div>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black">
    
          <div className="flex gap-3 text-slate-400">
        
          </div>
         
      </main>
    </>
  );
}
