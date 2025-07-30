import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const res = await fetch(
      "https://sandbox.custodia-tech.com/md/api/User/login?include=user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    if (!res.ok) {
      try {
        const errorData = await res.json();
        return NextResponse.json(errorData, { status: res.status });
      } catch (e) {
        return NextResponse.json(
          { error: "Login failed" },
          { status: res.status },
        );
      }
    }

    const data = await res.json();
    const responseData = { ...data, jwtToken: data.id };
    return NextResponse.json(responseData);
  } catch (err) {
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
