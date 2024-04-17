import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = (JSON.parse(process.env.ALLOWED_ORIGINS!) as string[]) || [];

export function middleware(req: NextRequest) {
    const origin = req.nextUrl.origin ?? "";
    const pathname = req.nextUrl.pathname;
    const token = req.cookies.get("jwt");

    if (pathname.startsWith("/auth/sign-in") && token) {
        console.log(token);
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (!allowedOrigins.includes(origin)) {
        return NextResponse.json(
            { message: "This domain is not allowed to access." },
            { status: 400 },
        );
    }

    return NextResponse.next();
}

// export const config = {
//     matcher: ["/api/:path*"],
// };
