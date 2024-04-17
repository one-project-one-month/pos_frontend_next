import { NextResponse } from "next/server";

function handlerError(error: any) {
    // other error handling logic here
    if (error.code === "P2002")
        return NextResponse.json(
            { message: `The following field(s) must be unique. ${error.meta.target.join(" ,")}` },
            { status: 400 },
        );

    if (error.code === "P2025")
        return NextResponse.json(
            {
                message: `No item found with provided related code. Please make sure your related item's code is valid  `,
            },
            { status: 400 },
        );

    // this is default error response, if nothing above match
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
}

export async function catchAsyncError(fnName: string, asyncFn: () => Promise<NextResponse>) {
    try {
        return await asyncFn();
    } catch (error) {
        console.log(fnName, error);
        return handlerError(error);
    }
}
