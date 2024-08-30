import mongoose, { Schema, Document, model, CallbackError } from "mongoose";
import { hashPassword } from "@/app/lib/auth";

interface User extends Document {
   username: string;
   password: string;
   songs: mongoose.Types.ObjectId[];
}

const userSchema: Schema<User> = new Schema({
   username: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
});

userSchema.pre("save", async function (next) {
   const user = this as User;

   if (!user.isModified("password")) {
      return next();
   }

   try {
      user.password = await hashPassword(user.password);
      next();
   } catch (err) {
      next(err as CallbackError);
   }
});

const User = mongoose.models.User || model<User>("User", userSchema);
export default User;
