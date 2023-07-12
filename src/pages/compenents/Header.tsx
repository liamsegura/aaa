"use client"

import { SignInButton, SignOutButton, UserButton, useUser} from "@clerk/nextjs";


export default function Header() {

  const user = useUser();

  return (
    <>
    <nav className="p-4 flex justify-end gap-2 items-center">
      {user.user?.fullName}
      <UserButton />
      {!user.isSignedIn && <SignInButton />}
    </nav>
    </>
  );
};