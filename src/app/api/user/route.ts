export async function GET(request: Request) {
  return Response.json({ message: "hello", data: request });
}
