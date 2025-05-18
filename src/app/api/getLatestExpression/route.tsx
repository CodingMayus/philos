
let myConstant = "Neutral";

export async function GET(request: Request) {
    return new Response(myConstant);
}

export async function POST(request: Request) {
    const body = await request.json();
    if (typeof body.value === "string") {
        myConstant = body.value;
        return new Response("Value updated", { status: 200 });
    }
    return new Response("Invalid value", { status: 400 });
}