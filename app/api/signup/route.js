import { connectDB } from "@/app/utils/connectDB";
import Product from "../../../models/productModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { password, num, email,name } = await request.json();
    await connectDB();
    await Product.create({ password, num, email,name });
    return NextResponse.json({ message: "Product Created" }, { status: 201 });
  } catch (error) {
    console.error("Error during POST request:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    console.log("GET request received");
    await connectDB();
    console.log("Database connected");

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    console.log("Query parameter email:", email);

    let products;
    if (email) {
      products = await Product.find({ email });
    } else {
      products = await Product.find();
    }

    console.log("Products retrieved:", products);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error during GET request:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
