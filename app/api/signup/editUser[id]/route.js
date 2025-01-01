import { connectDB } from "@/app/utils/connectDB";
import Product from "../../../models/productModel";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
let router = useRouter();
export async function PUT(request, { params }) {
  const { id } = params;
  console.log("id...................");
  console.log(id);
  connectDB();
  const { password, num, email, name } = await request.json();
  await Product.findByIdAndUpdate(id, {
    password,
    num,
    email,
    name,
  });
  return NextResponse.json(
    {
      success: true,
      message: "record has been updated!",
    },
    {
      status: 200,
    }
  );
}

export async function GET(_, { params }) {
  const { id } = params;
  connectDB();
  const user = await Product.findById(id);
  if (user) {
    router.push(`/update/${id}`);
  }
  return NextResponse.json(
    {
      success: true,
      user,
    },
    {
      status: 200,
    }
  );
}
