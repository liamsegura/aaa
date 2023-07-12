"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const user = useUser();

  return (
    <>
      <nav className="flex items-center justify-end gap-2 p-4">
        <UserButton />
        {!user.isSignedIn && <SignInButton />}
      </nav>
    </>
  );
}
