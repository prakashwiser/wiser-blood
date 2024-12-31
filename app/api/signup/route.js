import { connectDB } from "@/app/utils/connectDB";
import Product from "../../../models/productModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { password, num, email } = await request.json();
    console.log("Received data:", { email, password, num });
    await connectDB();
    await Product.create({ password, num, email });
    return NextResponse.json({ message: "Product Created" }, { status: 201 });
  } catch (error) {
    console.error("Error during POST request:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}


