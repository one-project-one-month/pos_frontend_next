import { getSession } from "next-auth/react";
import { NextResponse, type NextRequest } from "next/server";
import { handler } from "./services/auth";

/*

------------- custom middleware if you want to --------------

// const protectedRoutes = ["/dashboard", "/profile"];
// const unprotectedRoutes = ["/auth/sign-in", "/auth/sign-out"];

// export default async function middleware(request: NextRequest) {
//     const isProtectedRoute = protectedRoutes.some((prefix) =>
//         request.nextUrl.pathname.startsWith(prefix),
//     );
//     if (isProtectedRoute) {
//         const absoluteURL = new URL("/", request.nextUrl.origin);
//         return NextResponse.redirect(absoluteURL.toString());
//     }
//     if (unprotectedRoutes.includes(request.nextUrl.pathname)) {
//         const absoluteURL = new URL("/dashboard", request.nextUrl.origin);
//         return NextResponse.redirect(absoluteURL.toString());
//     }
//     const absoluteURL = new URL("/auth/sign-in", request.nextUrl.origin);

//     return NextResponse.redirect(absoluteURL.toString());
// }

*/

export { default } from "next-auth/middleware";

// define the protected route here

export const config = {
    matcher: ["/products/:path*", "/dashboard/:path*", "/product-categories/:path*"],
};
