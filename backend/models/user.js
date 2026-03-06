import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: Number, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    company: { type: String },

    isAgency: { type: Boolean, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
