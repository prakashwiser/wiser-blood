import mongoose, { Schema } from "mongoose";
const topicSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    num: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel =
  mongoose.models.Product || mongoose.model("Product", topicSchema);
export default ProductModel;
