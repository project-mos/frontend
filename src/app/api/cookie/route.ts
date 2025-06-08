import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access-token");
  return NextResponse.json({ accessToken: accessToken?.value || null });
}

export async function DELETE() {
  const response = NextResponse.json({ message: "쿠키가 삭제되었습니다." });

  // 쿠키 삭제
  response.cookies.set("access-token", "", {
    expires: new Date(0),
    path: "/",
  });
  response.cookies.set("refresh-token", "", {
    expires: new Date(0),
    path: "/", 
  });

  return response;
}