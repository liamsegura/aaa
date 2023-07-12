import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/users(.*)",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next|favicon.ico).*)", "/", "/(api|trpc)(.*)"],
};
