import mongoose, { Schema, Document, model } from "mongoose";

interface ISong extends Document {
   title: string;
   artist: string;
   status: "not learned yet" | "learned";
   progress: number; // percentage or a rating
}

const songSchema: Schema<ISong> = new Schema({
   title: { type: String, required: true },
   artist: { type: String, required: true },
   status: {
      type: String,
      required: true,
      enum: ["not learned yet", "learned"],
   },
   progress: { type: Number, required: true, default: 0 },
});

const Song = mongoose.models.Song || model<ISong>("Song", songSchema);
export default Song;
