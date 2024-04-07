import { NextResponse } from "next/server";

export async function catchAsyncError(fnName: string, asyncFn: () => Promise<NextResponse>) {
    try {
        return await asyncFn();
    } catch (error) {
        console.log(fnName, error);
        // other error handling logic here

        // this is default error response, if nothing above match
        return new NextResponse("Internal error", { status: 500 });
    }
}
