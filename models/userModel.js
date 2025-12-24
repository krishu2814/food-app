import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
    },
    usertype: {
      type: String,
      required: [true, "user type is required."],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3Duser&psig=AOvVaw3ucNoQu-cJkGbTVP0nrkg2&ust=1763560267106000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNj-05ns-5ADFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
